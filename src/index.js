// Load environment variables
require('dotenv').config();
const express = require('express');
const app = express();

// Middleware (helps to read JSON data in requests)
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
