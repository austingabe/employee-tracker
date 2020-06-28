require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: process.env.PASSWORD,
    database: "company"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

const start = () => {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View departments, roles, and employees",
                "Add departments, roles, or employees",
                "Update employee roles",
                "Exit"
            ]
        })
        .then(answer => {
            console.log(answer.action);
            switch (answer.action) {
                case "View departments, roles, and employees":
                    viewDRE();
                    break;

                case "Add departments, roles, or employees":
                    addDRE();
                    //use insert into using code into hte right table
                    break;

                case "Update employee roles":
                    updateEmp();
                    //use update using code into the right table
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
}

const viewDRE = () => {
    inquirer
        .prompt({
            name: "viewDRE",
            type: "list",
            message: "What would you like to view?",
            choices: [
                "Departments",
                "Roles",
                "Employees",
                "Exit"
            ]
        })
        .then(answer => {
            switch (answer.viewDRE) {
                case "Departments":
                    const deptQuery = "SELECT * FROM department";
                    connection.query(deptQuery, (err, res) => {
                        if (err) throw err;
                        for (let i = 0; i < res.length; i++) {
                            console.log("ID: " + res[i].id + " || Department Name: " + res[i].name);
                        }
                    });
                    break;

                case "Roles":
                    const roleQuery = "SELECT * FROM role";
                    connection.query(roleQuery, (err, res) => {
                        if (err) throw err;
                        for (let i = 0; i < res.length; i++) {
                            console.log("ID: " + res[i].id + " || Title: " + res[i].title + " || Salary: " + res[i].salary + " || Department ID: " + res[i].department_id);
                        }
                    });
                    break;

                case "Employees":
                    const empQuery = "SELECT * FROM employee";
                    connection.query(empQuery, (err, res) => {
                        if (err) throw err;
                        for (let i = 0; i < res.length; i++) {
                            console.log("ID: " + res[i].id + " || Name: " + res[i].first_name + " " + res[i].last_name + " || Role ID: " + res[i].role_id + " || Manager ID: " + res[i].manager_id);
                        }
                    });
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
            // const query = "SELECT position, song, year FROM top5000 WHERE ?";
            // connection.query(query, { artist: answer.artist }, function (err, res) {
            //     if (err) throw err;
            //     for (var i = 0; i < res.length; i++) {
            //         console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
            //     }
            //     start();
            // });
        });
}

const viewDRE = () => {
    inquirer
        .prompt({
            name: "viewDRE",
            type: "list",
            message: "What would you like to view?",
            choices: [
                "Departments",
                "Roles",
                "Employees",
                "Exit"
            ]
        })
        .then(answer => {
            switch (answer.viewDRE) {
                case "Departments":
                    const deptQuery = "SELECT * FROM department";
                    connection.query(deptQuery, (err, res) => {
                        if (err) throw err;
                        for (let i = 0; i < res.length; i++) {
                            console.log("ID: " + res[i].id + " || Department Name: " + res[i].name);
                        }
                    });
                    break;

                case "Roles":
                    const roleQuery = "SELECT * FROM role";
                    connection.query(roleQuery, (err, res) => {
                        if (err) throw err;
                        for (let i = 0; i < res.length; i++) {
                            console.log("ID: " + res[i].id + " || Title: " + res[i].title + " || Salary: " + res[i].salary + " || Department ID: " + res[i].department_id);
                        }
                    });
                    break;

                case "Employees":
                    const empQuery = "SELECT * FROM employee";
                    connection.query(empQuery, (err, res) => {
                        if (err) throw err;
                        for (let i = 0; i < res.length; i++) {
                            console.log("ID: " + res[i].id + " || Name: " + res[i].first_name + " " + res[i].last_name + " || Role ID: " + res[i].role_id + " || Manager ID: " + res[i].manager_id);
                        }
                    });
                    break;

                case "Exit":
                    connection.end();
                    break;
            }

// const multiSearch = () => {
//     var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
//     connection.query(query, function (err, res) {
//         if (err) throw err;
//         for (var i = 0; i < res.length; i++) {
//             console.log(res[i].artist);
//         }
//         start();
//     });
// }

// const rangeSearch() {
//     inquirer
//         .prompt([
//             {
//                 name: "start",
//                 type: "input",
//                 message: "Enter starting position: ",
//                 validate: function (value) {
//                     if (isNaN(value) === false) {
//                         return true;
//                     }
//                     return false;
//                 }
//             },
//             {
//                 name: "end",
//                 type: "input",
//                 message: "Enter ending position: ",
//                 validate: function (value) {
//                     if (isNaN(value) === false) {
//                         return true;
//                     }
//                     return false;
//                 }
//             }
//         ])
//         .then(function (answer) {
//             var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
//             connection.query(query, [answer.start, answer.end], function (err, res) {
//                 if (err) throw err;
//                 for (var i = 0; i < res.length; i++) {
//                     console.log(
//                         "Position: " +
//                         res[i].position +
//                         " || Song: " +
//                         res[i].song +
//                         " || Artist: " +
//                         res[i].artist +
//                         " || Year: " +
//                         res[i].year
//                     );
//                 }
//                 start();
//             });
//         });
// }

// const songSearch() {
//     inquirer
//         .prompt({
//             name: "song",
//             type: "input",
//             message: "What song would you like to look for?"
//         })
//         .then(function (answer) {
//             console.log(answer.song);
//             connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function (err, res) {
//                 if (err) throw err;
//                 console.log(
//                     "Position: " +
//                     res[0].position +
//                     " || Song: " +
//                     res[0].song +
//                     " || Artist: " +
//                     res[0].artist +
//                     " || Year: " +
//                     res[0].year
//                 );
//                 start();
//             });
//         });
// }