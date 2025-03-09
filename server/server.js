const express = require('express');

const app = require("./app");
require('dotenv').config();
const port = process.env.PORT;
const connectDB = require('./mongodb');



connectDB();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});