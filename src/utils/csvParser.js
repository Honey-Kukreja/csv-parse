const fs = require('fs');
const path = require('path');
require('dotenv').config();


function setNestedValue(obj, keys, value) {
  let current = obj;
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
    } else {
      current[key] = current[key] || {};
      current = current[key];
    }
  });
}

function parseCSV() {
  const csvPath = path.resolve(process.env.CSV_PATH);
  
  if (!fs.existsSync(csvPath)) {
    console.error(`CSV file not found at: ${csvPath}`);
    return [];
  }

  const data = fs.readFileSync(csvPath, 'utf-8');
  const lines = data.split('\n').filter(line => line.trim() !== '');
  
  const headers = lines[0].split(',').map(h => h.trim());
  const records = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const record = {};

    headers.forEach((header, index) => {
      const value = values[index] || '';
      const keyParts = header.split('.');
      setNestedValue(record, keyParts, value);
    });

    records.push(record);
  }

  return records;
}

module.exports = { parseCSV };
