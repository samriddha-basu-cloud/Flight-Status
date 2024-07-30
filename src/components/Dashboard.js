import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';


const Dashboard = () => {
  const location = useLocation();
  const [flights, setFlights] = useState([]);
  const [notification, setNotification] = useState({ title: '', body: '' });
  const loggedInUserEmail = location.state?.email || 'unknown@example.com'; // Default value if no email is passed

  const getFlightData = useCallback(async () => {
    const response = await fetch('http://localhost:5002/flights');
    const data = await response.json();
    setFlights(data);
  }, []);

  useEffect(() => {
    getFlightData();
  }, [getFlightData]);

  const handleNotifyMe = async (flightDetails) => {
    try {
      await fetch('http://localhost:5002/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loggedInUserEmail, flightDetails })
      });
      alert('Notification sent!');
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Flight Status Dashboard</h2>
      {notification.title && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6" role="alert">
          <h4 className="font-bold">{notification.title}</h4>
          <p>{notification.body}</p>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sl. No.</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight Logo</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight Code</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrival-Destination</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aircraft Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notify Me</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {flights.map((flight, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <img src={flight.logo} alt="Flight Logo" className="h-10 w-10 rounded-full" />
                </td>
                <td className="px-4 py-4 whitespace-nowrap">{flight.code}</td>
                <td className="px-4 py-4 whitespace-nowrap">{flight.arrivalDestination}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    flight.status === 'On Time' ? 'bg-green-100 text-green-800' : 
                    flight.status === 'Delayed' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {flight.status}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">{flight.aircraftType}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleNotifyMe(`Flight Code: ${flight.code}, Status: ${flight.status}`)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Notify Me
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
