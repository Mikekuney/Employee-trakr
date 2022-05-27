const express = require('express');
const cTable = require('console.table');
const connection = require('./connection');
const userPrompts = require('./utils/prompts');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req,res) => {
    res.status(404).end();;
});

connection.connect(async (err) => {
    if (err) throw err;
    console.log('Database connected');
    startApp();
});

const startApp = async () => {
    await userPrompts()
};