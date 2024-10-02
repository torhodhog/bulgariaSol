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
      <div className=''>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center p-24">
        {suggestions.map((suggestion) => (
          <li key={suggestion.id} className="border rounded-lg p-4 bg-gray-200">
            <p><strong>{suggestion.name}</strong> ({suggestion.email})</p>
            <p>Startdato: {suggestion.start_date}</p>
            <p>Sluttdato: {suggestion.end_date}</p>
            <p>{suggestion.suggestion}</p>
            <p>Status: {suggestion.status}</p>
            <button className="bg-green-600 text-white mr-4 p-2 rounded-md" onClick={() => handleApprove(suggestion.id)}>Godkjenn</button>
            <button className="bg-red-600 text-white p-2 rounded-md" onClick={() => handleReject(suggestion.id)}>Avvis</button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
