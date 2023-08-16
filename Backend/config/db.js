const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.MONGODB_URL;

mongoose.connect(`mongodb+srv://shubhambhargav10:Shubham10091995@cluster0.tcuh0z6.mongodb.net/crm?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

module.exports = connection;
