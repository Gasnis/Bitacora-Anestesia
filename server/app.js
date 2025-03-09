const express = require('express');
const app = express();
const opsRoutes = require('./routes/ops'); 
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", opsRoutes);

module.exports = app;