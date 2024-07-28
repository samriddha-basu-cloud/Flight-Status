// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('/api/flights');
        setFlights(response.data);
      } catch (error) {
        console.error('Error fetching flight data:', error);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Flight Status</h1>
      <ul>
        {flights.map(flight => (
          <li key={flight.id} className="my-2 p-4 border rounded shadow">
            <p>Flight: {flight.number}</p>
            <p>Status: {flight.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
