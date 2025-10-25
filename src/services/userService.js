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
     // console.log(`Inserted: ${fullName}`);
    } catch (err) {
      console.error('Error inserting record:', err);
    }
  }
  await printAgeDistributionFromDB();
  console.log('All records processed.');
  
}



const p = require('../config/db');

async function  printAgeDistributionFromDB() {
  try {
   
    const result = await p.query('SELECT age FROM users WHERE age IS NOT NULL');
    const ages = result.rows.map(row => row.age);

    if (ages.length === 0) {
      console.log('No records found.');
      return;
    }

    
    let groups = {
      '< 20': 0,
      '20 to 40': 0,
      '40 to 60': 0,
      '> 60': 0
    };

    for (const age of ages) {
      if (age < 20) groups['< 20'] += 1;
      else if (age <= 40) groups['20 to 40'] += 1;
      else if (age <= 60) groups['40 to 60'] += 1;
      else groups['> 60'] += 1;
    }

    
    console.log('Age-Group       Count');
    for (const [label, count] of Object.entries(groups)) {
      console.log(`${label.padEnd(15)} ${count}`);
    }
  } catch (err) {
    console.error('Error calculating grouped age counts:', err);
  }
}

module.exports = {importUsers, printAgeDistributionFromDB };

