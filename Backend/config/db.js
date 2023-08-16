const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.MONGODB_URL;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

module.exports = connection;
