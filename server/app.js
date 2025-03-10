const express = require('express');
const app = express();
const opsRoutes = require('./routes/ops'); 
const bodyParser = require('body-parser');
const cors = require('cors');

// Configurar CORS para permitir cualquier origen
app.use(cors({
    origin: '*'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", opsRoutes);

module.exports = app;