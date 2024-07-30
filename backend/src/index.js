// src/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { connectToDb } = require('./services/connectToMongo');
const { sendEmail } = require('./services/emailService');

const app = express();
app.use(cors());
app.use(express.json());

connectToDb();

app.use(cors({
  origin: 'http://localhost:3000',
}));

const flightSchema = new mongoose.Schema({
  logo: String,
  code: String,
  arrivalDestination: String,
  status: String,
  aircraftType: String,
});

const Flight = mongoose.model('Flight', flightSchema);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/flights', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.send(flights);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Endpoint to handle email sending
app.post('/notify', async (req, res) => {
  const { email, flightDetails } = req.body;
  
  const subject = 'Flight Status Notification';
  const text = `Details of the flight:\n\n${flightDetails}`;
  
  try {
    await sendEmail(email, subject, text);
    res.status(200).send('Notification sent successfully');
  } catch (error) {
    res.status(500).send('Failed to send notification');
  }
});

const PORT = 5002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
