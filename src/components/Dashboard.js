import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import bgImage from '../assets/bg.jpg'; // Import your background image
import logo from '../assets/Logo.png'; // Assuming the logo is available

const Dashboard = () => {
  const location = useLocation();
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState({ title: '', body: '' });
  const [loading, setLoading] = useState(true);
  const loggedInUserEmail = location.state?.email || 'unknown@example.com';

  const getFlightData = useCallback(async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch('http://localhost:5002/flights');
      const data = await response.json();
      
      // Assuming the time format is HH:mm or similar. Adjust parsing if necessary.
      const sortedData = data.sort((a, b) => {
        const timeA = new Date(`1970-01-01T${a.time || '00:00:00'}Z`).getTime();
        const timeB = new Date(`1970-01-01T${b.time || '00:00:00'}Z`).getTime();
        return timeA - timeB;
      });

      setFlights(sortedData);
      setFilteredFlights(sortedData);
    } catch (error) {
      console.error('Error fetching flight data:', error);
      setNotification({ title: 'Error', body: 'Failed to fetch flight data. Please try again later.' });
    } finally {
      setTimeout(() => setLoading(false), 1500); // Add delay before stopping loading
    }
  }, []);

  useEffect(() => {
    getFlightData();
  }, [getFlightData]);

  useEffect(() => {
    const results = flights.filter(flight =>
      (flight.code?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (flight.time?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (flight.arrivalDestination?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );
    setFilteredFlights(results);
  }, [searchTerm, flights]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

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
    <div className="relative min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <img
        src={bgImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"
      />
      <div className="relative w-full max-w-screen-lg p-4 sm:p-6 bg-white bg-opacity-80 rounded-2xl shadow-lg shadow-gray-400/50 z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-primary">Flight Status Dashboard</h2>
          <img src={logo} alt="Company Logo" className="w-20 h-20" />
        </div>
        {notification.title && (
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 rounded-lg shadow-lg shadow-gray-400/50" role="alert">
            <h4 className="font-bold">{notification.title}</h4>
            <p>{notification.body}</p>
          </div>
        )}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by flight code, time, or arrival/destination"
            value={searchTerm}
            onChange={handleSearch}
            className="shadow-lg appearance-none border rounded w-full py-1 px-2 sm:py-2 sm:px-3 text-gray-700 leading-tight focus:outline-none bg-white bg-opacity-80 shadow-inset-neomorphic"
          />
        </div>
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="loading-dots">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white bg-opacity-70 shadow-lg rounded-2xl shadow-gray-400/50">
            <table className="min-w-full bg-transparent shadow-lg rounded-lg overflow-hidden mx-auto">
              <thead className="bg-gray-100 bg-opacity-90">
                <tr>
                  <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Sl. No.</th>
                  <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Time</th>
                  <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Flight Logo</th>
                  <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Flight Code</th>
                  <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Arrival-Destination</th>
                  <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Status</th>
                  <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Aircraft Type</th>
                  <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-center sticky right-0 bg-gray-100 bg-opacity-90">Notify Me</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredFlights.map((flight, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-xs text-center whitespace-nowrap">{index + 1}</td>
                    <td className="px-4 py-2 text-xs text-center whitespace-nowrap">{flight.time || 'N/A'}</td>
                    <td className="px-4 py-2 text-xs text-center whitespace-nowrap">
                      {flight.logo ? (
                        <img src={flight.logo} alt="Flight Logo" className="h-8 w-8 mx-auto rounded-full" />
                      ) : (
                        <span className="text-xs">No logo</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-xs text-center whitespace-nowrap">{flight.code || 'N/A'}</td>
                    <td className="px-4 py-2 text-xs text-center whitespace-nowrap">{flight.arrivalDestination || 'N/A'}</td>
                    <td className="px-4 py-2 text-xs text-center whitespace-nowrap">
                      <span className={`px-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        flight.status === 'On Time' ? 'bg-green-100 text-green-800' : 
                        flight.status === 'Delayed' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {flight.status || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-xs text-center whitespace-nowrap">{flight.aircraftType || 'N/A'}</td>
                    <td className="px-4 py-2 text-xs text-center whitespace-nowrap">
                      <button
                        onClick={() => handleNotifyMe(`Flight Code: ${flight.code || 'N/A'}, Time: ${flight.time || 'N/A'}, Status: ${flight.status || 'Unknown'}`)}
                        className="bg-primary hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg shadow-lg shadow-gray-400"
                      >
                        Notify
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add CSS for loading animation */}
      <style jsx>{`
        .loading-dots {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .loading-dots div {
          width: 10px;
          height: 10px;
          margin: 3px;
          background-color: #3498db;
          border-radius: 50%;
          animation: bounce 1.5s infinite;
        }
        .loading-dots div:nth-child(2) {
          animation-delay: 0.3s;
        }
        .loading-dots div:nth-child(3) {
          animation-delay: 0.6s;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
