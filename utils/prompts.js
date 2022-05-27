const inquirer = require('inquirer');
const express = require('express');
const cTable = require('console.table');
const insert = require('./query');

const connection = require('../connection');

async function initialPrompts() {
    await inquirer.prompt([
        {
            type: 'list',
            name: 'firstChoice',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all departments',
                'View all roles',
                'Add an employee',
                'Add a department',
                'Add a role',
                'Update an employee role',
                'Exit'
            ]
        }
    ])
    .then((name) => {
        const val = Obj.values(name).toString();
        // Switch statement to handle the user's choice
        switch (val) {
            case "View all Departments":
                let departments = `SELECT * FROM departments`;
                connection.query(departments, (err, res, fields) => {
                    if (err) throw err;
                    console.table = cTable.getTable(res);
                    console.log(table);
                    initialPrompts();
                });
                break;
            case "View all Roles":
                let roles = `SELECT * FROM roles`;
                connection.query(roles, (err, res, fields) => {
                    if (err) throw err;
                    console.table = cTable.getTable(res);
                    console.log(table);
                    initialPrompts();
                });
                break;
            case "View all Employees":
                let employees = `SELECT * FROM employees`;
                connection.query(employees, (err, res, fields) => {
                    if (err) throw err;
                    console.table = cTable.getTable(res);
                    console.log(table);
                    initialPrompts();
                });
                break;
            case "Add a Department":
                insert.addDepartments().then(async () => {
                    await initialPrompts();
                });
                break;
            case "Add a Role":
                insert.addRoles().then(async () => {
                    await initialPrompts();
                });
                break;
            case "Add an Employee":
                insert.addEmployees().then(async () => {
                    await initialPrompts();
                });
                break;
            case "Update an Employee Role":
                insert.updateEmployees().then(async () => {
                    await initialPrompts();
                });
                break;
            case "Exit":
                console.log('Goodbye!');
                connection.end();
                break;
            default:
                console.log('Please select a valid option.');
        }
    });
}

module.exports = initialPrompts;