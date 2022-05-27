const inquirer = require("inquirer");
const express = require("express");
const cTable = require("console.table");

const connection = require("../connection");

const res = require("express/lib/response");

// Add new Departments
async function addDepartments() {
    await inquirer.prompt([
        {
            type: "input",
            name: "departments_name",
            message: "What is the name of the new department?",
            validate: (nameInput) => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the name of the new department.");
                    return false;
                }
            }
        }
    ])
    .then((answers) => {
        let departments = `INSERT INTO departments(departments_name) VALUES(?)`;
        connection.query(
            departments,
            [answers.departments_name],
            (err, results) => {
                if (err) throw err;
                console.log("New department (",answers.departments_name,") has been added to the database.");
            }
        );
    });
}

// Add a new role to the database
async function addRoles() {
    let getDepts = `SELECT * FROM departments`;
    return connection
        .promise()
        .query(getDepts)
        .then(async ([departments]) => {
            await inquirer
                .prompt([
                    {
                        type: "input",
                        name: "title",
                        message: "What is the name of the new role?",
                        validate: (nameInput) => {
                            if (nameInput) {
                                return true;
                            } else {
                                console.log("Please enter the name of the new role.");
                                return false;
                            }
                        },
                    },
                    {
                        type: "input",
                        name: "salary",
                        message: "What is the salary for the new role?",
                        validate: (nameInput) => {
                            if (nameInput) {
                                return true;
                            } else {
                                console.log("Please enter the salary for the new role.");
                                return false;
                            }
                        },
                    },
                    {
                        type: "list",
                        name: "department",
                        message: "Which department does the new role belong to?",
                        choices: departments,
                        validate: (nameInput) => {
                            if (nameInput) {
                                return true;
                            } else {
                                console.log("Which department does the new role belong to?");
                                return false;
                            }
                        },
                    },
                ])
                .then((answers) => {
                    let addNewRole = `INSERT INTO roles(title, salary, departmentsId) VALUES(?, ?, ?)`;
                    connection.query(
                        addNewRole,
                        [answers.title, answers.salary, answers.department],
                        (err, results) => {
                            if (err) throw err;
                        }
                    );
                });
        });
}
async function addEmployees() {
    let getRoles = `SELECT rolesId AS value, title AS name FROM roles`;
    let getManagers = `SELECT employeesId AS value, CONCAT(first_name, " ", last_name) AS name FROM employees 
    INNER JOIN roles ON employees.rolesId = roles.rolesId 
    WHERE roles.title = "Manager"`;

    return connection
        .promise()
        .query(getRoles)
        .then(async ([roleResults]) => {
            return connection
                .promise()
                .query(getManagers)
                .then(async ([managerResults]) => {
                    await inquirer
                        .prompt([
                            {
                                type: "input",
                                name: "first_name",
                                message: "What is the first name of the new employee?",
                                validate: (nameInput) => {
                                    if (nameInput) {
                                        return true;
                                    } else {
                                        console.log("Please enter the first name of the new employee.");
                                        return false;
                                    }
                                },
                            },
                            {
                                type: "input",
                                name: "last_name",
                                message: "What is the last name of the new employee?",
                                validate: (nameInput) => {
                                    if (nameInput) {
                                        return true;
                                    } else {
                                        console.log("Please enter the last name of the new employee.");
                                        return false;
                                    }
                                },
                            },
                            {
                                type: "list",
                                name: "roles",
                                message: "What is the role of the new employee?",
                                choices: roleResults,
                                validate: (nameInput) => {
                                    if (nameInput) {
                                        return true;
                                    } else {
                                        console.log("What is the role of the new employee?");
                                        return false;
                                    }
                                },
                            },
                            {
                                type: "list",
                                name: "manager",
                                message: "Who is the manager of the new employee?",
                                choices: managerResults,
                                validate: (nameInput) => {
                                    if (nameInput) {
                                        return true;
                                    } else {
                                        console.log("Who is the manager of the new employee?");
                                        return false;
                                    }
                                },
                            },
                        ])
                        .then((answers) => {
                            let addNewEmployee = `INSERT INTO employees(first_name, last_name, rolesId, managersId) VALUES(?, ?, ?, ?)`;
                            connection.query(
                                addNewEmployee,
                                [
                                    answers.first_name,
                                    answers.last_name,
                                    answers.roles,
                                    answers.manager
                                ],
                                (err, results) => {
                                    if (err) throw err;
                                }
                            );
                        });
                });
        });
}
async function updateEmployee() {
    let getEmployee = `SELECT employeesId AS value, CONCAT(first_name, " ", last_name) AS name FROM employees`;
    let getRoles = `SELECT rolesId AS value, title AS name FROM roles`;
    return connection
        .promise()
        .query(getEmployee)
        .then(async ([employeeResults]) => {
            return connection
                .promise()
                .query(getRoles)
                .then(async ([rolesResults]) => {
                    await inquirer
                        .prompt([
                            {
                                type: "list",
                                name: "employee",
                                message: "Which employee would you like to update?",
                                choices: employeeResults,
                                validate: (nameInput) => {
                                    if (nameInput) {
                                        return true;
                                    } else {
                                        console.log("Which employee would you like to update?");
                                        return false;
                                    }
                                },
                            },
                            {
                                type: "list",
                                name: "role",
                                message: "What is the new role for the employee?",
                                choices: rolesResults,
                                validate: (nameInput) => {
                                    if (nameInput) {
                                        return true;
                                    } else {
                                        console.log("What is the new role for the employee?");
                                        return false;
                                    }
                                },
                            },
                        ])
                        .then((answers) => {
                            let updateEmployee = `UPDATE employees SET rolesId = ? WHERE employeesId = ?`;
                            connection.query(
                                updateEmployeeRole,
                                [answers.role, answers.employee],
                                (err, results) => {
                                    if (err) throw err;
                                }
                            );
                        });
                });
        });
}

module.exports = {
    addDepartments,
    addRoles,
    addEmployees,
    updateEmployee,
};