// backend/src/services/firebaseAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('./flight-status-notify-firebase-adminsdk-mfl38-dc4bb1d815.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const messaging = admin.messaging();

module.exports = messaging;
