const pool = require('../config/db');
const { parseCSV } = require('../utils/csvParser');

async function importUsers() {
  const records = parseCSV();

  for (const record of records) {
    const firstName = record?.name?.firstName || '';
    const lastName = record?.name?.lastName || '';
    const fullName = `${firstName} ${lastName}`.trim();
    const age = parseInt(record?.age) || null;

   
    const address = record.address || null;

  
    delete record.name;
    delete record.age;
    delete record.address;

    const additionalInfo = Object.keys(record).length > 0 ? record : null;

    const query = `
      INSERT INTO users (name, age, address, additional_info)
      VALUES ($1, $2, $3, $4)
    `;

    try {
      await pool.query(query, [fullName, age, address, additionalInfo]);
      console.log(`Inserted: ${fullName}`);
    } catch (err) {
      console.error('Error inserting record:', err);
    }
  }

  console.log('All records processed.');
}

module.exports = { importUsers };
