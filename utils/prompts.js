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
                'View all Employees',
                'View all Departments',
                'View all Roles',
                'Add an Employee',
                'Add a Department',
                'Add a Role',
                'Update an Employee Role',
                'Exit'
            ]
        }
    ])
    .then((name) => {
        const val = Object.values(name).toString();
        // Switch statement to handle the user's choice
        switch (val) {
            case "View all Departments":
                let departments = `SELECT * FROM departments`;
                connection.query(departments, (err, res, fields) => {
                    if (err) throw err;
                    console.table = cTable.getTable(res);
                    console.log(cTable);
                    initialPrompts();
                });
                break;
            case "View all Roles":
                let roles = `SELECT * FROM roles`;
                connection.query(roles, (err, res, fields) => {
                    if (err) throw err;
                    console.table = cTable.getTable(res);
                    console.log(cTable);
                    initialPrompts();
                });
                break;
            case "View all Employees":
                let employees = `SELECT * FROM employees`;
                connection.query(employees, (err, res, fields) => {
                    if (err) throw err;
                    console.table = cTable.getTable(res);
                    console.log(cTable);
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
                insert.updateEmployee().then(async () => {
                    await initialPrompts();
                });
                break;
            case "Exit":
                console.log('Goodbye!');
                break;
            
            default:
                console.log('Please select a valid option.');
                break;
        }
    });
}

module.exports = initialPrompts;