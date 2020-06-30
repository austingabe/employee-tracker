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
            switch (answer.action) {
                case "View departments, roles, and employees":
                    viewDRE();
                    break;

                case "Add departments, roles, or employees":
                    addDRE();
                    break;

                case "Update employee roles":
                    updateEmp();
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
                        let departmentArray = [];
                        for (let i = 0; i < res.length; i++) {
                            departmentArray.push(
                                {
                                    "ID": res[i].id,
                                    "Department Name": res[i].name
                                }
                            )
                        }
                        console.table(departmentArray);
                    });
                    break;

                case "Roles":
                    const roleQuery = "SELECT * FROM role";
                    connection.query(roleQuery, (err, res) => {
                        if (err) throw err;
                        let roleArray = [];
                        for (let i = 0; i < res.length; i++) {
                            roleArray.push(
                                {
                                    "ID": res[i].id,
                                    "Title": res[i].title,
                                    "Salary": res[i].salary,
                                    "Department ID": res[i].department_id
                                }
                            )
                        }
                        console.table(roleArray);
                    });
                    break;

                case "Employees":
                    const empQuery = "SELECT * FROM employee";
                    connection.query(empQuery, (err, res) => {
                        if (err) throw err;
                        let empArray = [];
                        for (let i = 0; i < res.length; i++) {
                            empArray.push(
                                {
                                    "ID": res[i].id,
                                    "Name": `${res[i].first_name} ${res[i].last_name}`,
                                    "Role ID": res[i].role_id,
                                    "Manager ID": res[i].manager_id
                                }
                            )
                        }
                        console.table(empArray);
                    });
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
}

const addDRE = () => {
    inquirer
        .prompt({
            name: "addDRE",
            type: "list",
            message: "What would you like to add?",
            choices: [
                "Departments",
                "Roles",
                "Employees",
                "Exit"
            ]
        })
        .then(answer => {
            switch (answer.addDRE) {
                case "Departments":
                    inquirer
                        .prompt({
                            name: "deptname",
                            type: "input",
                            message: "Enter Department Name:",
                            validate: function (deptname) {
                                return deptname !== "";
                            }
                        })
                        .then(response => {
                            const deptName = response.deptname;
                            const deptQuery = `INSERT INTO department (name) VALUES ('${deptName}');`;
                            connection.query(deptQuery, (err, res) => {
                                if (err) throw err;
                                console.log(`${deptName} added!`);
                            });
                        });
                    break;

                case "Roles":
                    inquirer
                        .prompt([
                            {
                                name: "roletitle",
                                type: "input",
                                message: "Enter Role Title:",
                                validate: function (roletitle) {
                                    return roletitle !== "";
                                }
                            },

                            {
                                name: "rolesalary",
                                type: "number",
                                message: "Enter Salary:",
                            },

                            {
                                name: "deptid",
                                type: "number",
                                message: "Enter Department ID:",
                            }
                        ])
                        .then(response => {
                            const roleTitle = response.roletitle;
                            const roleSalary = response.rolesalary;
                            const deptID = response.deptid;
                            const roleQuery = `INSERT INTO role (title, salary, department_id) VALUES ('${roleTitle}', ${roleSalary}, ${deptID});`;
                            connection.query(roleQuery, (err, res) => {
                                if (err) throw err;
                                console.log(`${roleTitle} added!`);
                            });
                        })
                    break;

                case "Employees":
                    inquirer
                        .prompt([
                            {
                                name: "firstname",
                                type: "input",
                                message: "Enter First Name:",
                                validate: function (firstname) {
                                    return firstname !== "";
                                }
                            },

                            {
                                name: "lastname",
                                type: "input",
                                message: "Enter Last Name:",
                                validate: function (lastname) {
                                    return lastname !== "";
                                }
                            },

                            {
                                name: "roleid",
                                type: "number",
                                message: "Enter Role ID:",
                            },

                            {
                                name: "managerid",
                                type: "number",
                                message: "Enter Manager ID:",
                            }
                        ])
                        .then(function (response) {
                            const firstName = response.firstname;
                            const lastName = response.lastname;
                            const roleID = response.roleid;
                            const managerID = response.managerid;
                            const deptQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${roleID}, ${managerID});`;
                            connection.query(deptQuery, (err, res) => {
                                if (err) throw err;
                                console.log(`${firstName} ${lastName} added!`);
                            });
                        })
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
}

const updateEmp = () => {
    inquirer
        .prompt([
            {
                name: "updatefirst",
                type: "input",
                message: "Enter First Name of Employee to Update",
                validate: function (updatefirst) {
                    return updatefirst !== "";
                }
            },

            {
                name: "updatelast",
                type: "input",
                message: "Enter Last Name of Employee to Update",
                validate: function (updatelast) {
                    return updatelast !== "";
                }
            },

            {
                name: "updaterole",
                type: "number",
                message: "Enter New Role ID"
            },

            {
                name: "updatemanager",
                type: "number",
                message: "Enter New Manager ID"
            }
        ])
        .then(answer => {
            let updateFirst = answer.updatefirst;
            let updateLast = answer.updatelast;
            let updateRole = answer.updaterole;
            let updateManager = answer.updatemanager;
            const updateQuery = `UPDATE employee SET role_id = ${updateRole}, manager_id = ${updateManager} WHERE first_name = '${updateFirst}' AND last_name = '${updateLast}';`;
            connection.query(updateQuery, (err, res) => {
                if (err) throw err;
                console.log(`${updateFirst} ${updateLast} updated!`);
            });
        });
}