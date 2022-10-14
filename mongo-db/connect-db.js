const mongoose = require('mongoose');

const connectDB = () => {
  const { MONGODB_URL } = process.env;

  mongoose.connect(MONGODB_URL, { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on('error', (error) => console.error(error));
  db.once('open', () => console.log('Connected to Database'));
};

module.exports = connectDB;