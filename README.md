This Assignment provides a Node.js/Express utility to parse deeply-nested CSV files, import users into a PostgreSQL database,
and compute age group distribution summaries
-Reads CSV files and converts each row to a Json object.
-Handles nested property names like address.line1, name.firstName.
-Imports records to a PostgreSQL database.
-Prints how many users fall in each age group after import.

The main logic is in the services/userService.js, utils/csvParser.js, and config/db.js.

The program runs once and stops (not a continuous server).

<img width="2202" height="1682" alt="image" src="https://github.com/user-attachments/assets/7e4e79c0-e904-4cc6-8693-bdd56b8848e5" />

<img width="1352" height="568" alt="image" src="https://github.com/user-attachments/assets/afe612ec-7b96-4d54-94aa-eddad158a1a4" />


