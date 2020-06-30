# employee-tracker
A solution for managing a company's employees using Node.js, InquirerJs, and MySQL.

## Description
This application can be used by anyone with supervisor access within a company to view a company's departments, roles, and employees, add departments, roles, and employees, and update employee role IDs and manager's IDs.

## Installation
In order to install the necessary packages, run `npm install` from the command line while inside the root directory.
Documentation for [MySQL]: (https://www.npmjs.com/package/mysql) - NPM package to connect to your MySQL database and perform queries.
Documentation for [InquirerJs]: (https://www.npmjs.com/package/inquirer/v/0.2.3) - NPM package to interact with the user via the command-line.
Documentation for [console.table]: (https://www.npmjs.com/package/console.table) -  Print MySQL rows to the console.

## Usage
Once the user has MySQL installed and set up on their device, the `schema.sql` file can be executed within MySQL to create the database and its corresponding tables. The `seed.sql` file can be executed as well if the user would like to pre-populate the database.
Once the user's MySQL password is entered into its corresponding section within `server.js`, run `node server.js` on the command line from the root directory, and using [InquirerJs], the user can follow the prompts to view, add, or update the database. Once an action is completed, the user can run `^C` in order to exit the application and run `node server.js` again to perform another action.

## Support
For any questions, please contact austinlee721@gmail.com