'use client';

import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hent forslagene fra backend
    fetch('/api/suggestions')
      .then(response => response.json())
      .then(data => {
        setSuggestions(data);
        setLoading(false);
      });
  }, []);

  const handleApprove = (id: number) => {
    fetch(`/api/suggestions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'approved' }),
    }).then(() => {
      setSuggestions(suggestions.filter(suggestion => suggestion.id !== id));
    });
  };

  const handleReject = (id: number) => {
    fetch(`/api/suggestions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'rejected' }),
    }).then(() => {
      setSuggestions(suggestions.filter(suggestion => suggestion.id !== id));
    });
  };

  if (loading) {
    return <p>Laster forslag...</p>;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.id}>
            <p><strong>{suggestion.name}</strong> ({suggestion.email})</p>
            <p>Startdato: {suggestion.start_date}</p>
            <p>Sluttdato: {suggestion.end_date}</p>
            <p>{suggestion.suggestion}</p>
            <p>Status: {suggestion.status}</p>
            <button onClick={() => handleApprove(suggestion.id)}>Godkjenn</button>
            <button onClick={() => handleReject(suggestion.id)}>Avvis</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
