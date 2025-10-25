require('dotenv').config();
require('./config/db'); 

const express = require('express');
const app = express();

// Middleware 
app.use(express.json());

// Default Route
app.get('/', (req, res) => {
  res.send('CSV to JSON API is running...');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const { parseCSV } = require('./utils/csvParser');

const records = parseCSV();
//console.log('Parsed Records Preview:', records.slice(0, 5)); 
const { importUsers, printAgeDistributionFromDB } = require('./services/userService');

importUsers();
//printAgeDistributionFromDB();




