import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, isValid } from 'date-fns';
import { nb } from 'date-fns/locale';  // Norsk lokalisering

const AvailabilityCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);

  useEffect(() => {
    // Hent opptatte datoer fra API
    fetch('/api/booked-dates')
      .then(response => response.json())
      .then(data => {
        const dates = data.flatMap((range: { start_date: string, end_date: string }) => {
          const startDate = new Date(range.start_date);
          const endDate = new Date(range.end_date);
          const daysBetween = [];

          let currentDate = startDate;
          while (currentDate <= endDate) {
            daysBetween.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }
          return daysBetween;
        });
        setBookedDates(dates);
      });
  }, []);

  const tileClassName = ({ date, view }: { date: Date, view: string }) => {
    if (view === 'month') {
      if (bookedDates.find(d => d.toDateString() === date.toDateString())) {
        return 'booked';
      }
    }
    return null;
  };

  const formatDate = (locale: string | undefined, date: Date) => {
    // Sjekk om `date` er gyldig før du prøver å formatere
    if (!isValid(date)) {
      return '';  // Returner en tom streng eller en standardverdi hvis datoen er ugyldig
    }
    return format(date, 'MMMM yyyy', { locale: nb });
  };
  return (
    <div className="calendar-container">
      <h2>Send inn og se om det er mulighet når du ønsker</h2>
      <Calendar
        onChange={(value) => {
          if (Array.isArray(value)) {
            setSelectedDate(value[0]); // Handle range by selecting the start date
          } else {
            setSelectedDate(value);
          }
        }}
        value={selectedDate}
        tileClassName={tileClassName}
        formatMonthYear={formatDate}  // Formatér måned og år på norsk
        locale="nb"  // Sett norsk som språk
        
      />
      {selectedDate && (
        <p className='pt-8'>Valgt dato: {selectedDate.toDateString()}</p>
      )}
    </div>
  );
};

export default AvailabilityCalendar;

