'use client';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { useState } from 'react';
import Calendar from 'react-calendar'; // Sørg for at du har installert react-calendar

const SuggestionForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Sjekk at datoene er i riktig format
    const formattedStartDate = new Date(startDate).toISOString();
    const formattedEndDate = new Date(endDate).toISOString();

    // Logg de formaterte datoene for å sjekke at de er riktige
    console.log({
      name,
      email,
      suggestion,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });

    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          suggestion,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        }),
      });

      const data = await response.json();
      setResponseMessage(data.message);
      setName('');
      setEmail('');
      setSuggestion('');
      setStartDate('');
      setEndDate('');
    } catch (error) {
      console.error('Feil ved innsending av forslag:', error);
      setResponseMessage('Noe gikk galt. Prøv igjen senere.');
    }
  };

  return (
   <MaxWidthWrapper>
    <div className="form-calendar-container mt-12">
      <div className="form-container">
        <h1 className='p-12 text-center font-extrabold'>Informasjon</h1>
        <form onSubmit={handleSubmit} className="suggestion-form">
          <div className="form-group">
            <label>Navn:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Skriv ditt navn"
              required
            />
          </div>
          <div className="form-group">
            <label>E-post:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Skriv din e-postadresse"
              required
            />
          </div>
          <div className="form-group">
            <label>Startdato:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Sluttdato:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Forslag:</label>
            <textarea
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder="Skriv ditt forslag"
              required
            />
          </div>
          <button type="submit" className="submit-btn">Send inn</button>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </div>
      <div className="calendar-container">
        <h2 className='text-center p-12 font-extrabold'>Kalender for tilgjengelighet</h2>
        <Calendar
        className="p-12 mt-12"
          onChange={(value) => {
            if (Array.isArray(value)) {
              if (value[0] !== null) {
                setSelectedDate(value[0]); // Handle range by selecting the start date
              }
            } else {
              setSelectedDate(value as Date);
            }
          }}
          value={selectedDate}
          locale="nb"  // Sett norsk som språk
        />
        {selectedDate && (
          <p>Valgt dato: {selectedDate.toDateString()}</p>
        )}
      </div>
    </div>
  
  </MaxWidthWrapper>
)};

export default SuggestionForm;