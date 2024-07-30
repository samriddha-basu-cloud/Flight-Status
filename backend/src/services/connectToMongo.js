//connection to mongodb
const mongoose  = require('mongoose');
const uri = 'mongodb+srv://anandsupragya:kP0o54apdtyn3q0s@cluster0.auel5js.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const connectToDb = async () => {
    mongoose.connect(uri);

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
        console.log('Error connecting to MongoDB', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Disconnected from MongoDB');
    });

    process.on('SIGINT', async () => {
        await mongoose.connection.close();
        process.exit(0);
    });


}

module.exports = {connectToDb};