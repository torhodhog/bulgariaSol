const express = require('express');
const next = require('next');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const session = require('express-session');
require('dotenv').config();
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: process.env.DB_PASSWORD,
   database: 'bulgariasol',
});

app.prepare().then(() => {
   const server = express();

   // Middleware for JSON og session-håndtering
   server.use(express.json());
   server.use(session({
      secret: 'hemmelig_nøkkel', // Bruk en sterk nøkkel i produksjon
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false } // Sett til true med HTTPS i produksjon
   }));

   // Midlertidig brukernavn og passord-hash
   const adminUser = {
      username: 'admin',
      passwordHash: '$2b$12$4.yv3ECS07yrUP8yZR9ruOLoyAZY1YCGA6VMUsyCSSiZ41XsFqPWC' // Passord: Stiansverden
    };
    

   // Hjelpefunksjon for å beskytte admin-ruter
   function requireAuth(req, res, next) {
      if (req.session && req.session.loggedIn) {
         next();
      } else {
         res.status(401).send('Unauthorized: Please log in first');
      }
   }

   // Logg inn-rute
   server.post('/login', (req, res) => {
      const { username, password } = req.body;

      if (username === adminUser.username) {
         bcrypt.compare(password, adminUser.passwordHash, (err, result) => {
            if (result) {
               req.session.loggedIn = true;
               res.status(200).send('Logged in successfully');
            } else {
               res.status(401).send('Incorrect password');
            }
         });
      } else {
         res.status(401).send('Incorrect username');
      }
   });

   // Logg ut-rute
   server.post('/logout', (req, res) => {
      req.session.destroy();
      res.status(200).send('Logged out successfully');
   });

   // // Beskyttet admin-rute
   // server.get('/admin', requireAuth, (req, res) => {
   //    res.send('Welcome to the admin panel');
   // });

   // Dine eksisterende API-ruter (forslag osv.) kommer her
   server.post('/api/suggestions', (req, res) => {
      const { name, email, suggestion, startDate, endDate } = req.body;

      if (!startDate || !endDate) {
         return res.status(400).json({ message: 'Startdato og sluttdato er påkrevd' });
      }

      const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
      const formattedEndDate = new Date(endDate).toISOString().split('T')[0];

      const sql = 'INSERT INTO suggestions (name, email, suggestion, start_date, end_date) VALUES (?, ?, ?, ?, ?)';
      db.query(sql, [name, email, suggestion, formattedStartDate, formattedEndDate], (err, result) => {
         if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Noe gikk galt' });
         }
         res.status(200).json({ message: 'Forslag mottatt' });
      });
   });

   // Andre eksisterende API-ruter som henter data osv.
   server.get('/api/suggestions', (req, res) => {
      const sql = 'SELECT * FROM suggestions';
      db.query(sql, (err, result) => {
         if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Noe gikk galt' });
         }
         res.status(200).json(result);
      });
   });

   server.put('/api/suggestions/:id', (req, res) => {
      const { status } = req.body;
      const { id } = req.params;

      const sql = 'UPDATE suggestions SET status = ? WHERE id = ?';
      db.query(sql, [status, id], (err, result) => {
         if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Noe gikk galt' });
         }
         res.status(200).json({ message: 'Status oppdatert' });
      });
   });

   server.get('/api/booked-dates', (req, res) => {
      const sql = 'SELECT start_date, end_date FROM suggestions WHERE status = "approved"';
      db.query(sql, (err, results) => {
         if (err) {
            return res.status(500).json({ message: 'Feil ved henting av opptatte datoer' });
         }
         res.status(200).json(results);
      });
   });

   // Next.js sin standard request handler
   server.all('*', (req, res) => {
      return handle(req, res);
   });

   // Start serveren
   server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`Serveren kjører på http://localhost:${PORT}`);
   });
});
