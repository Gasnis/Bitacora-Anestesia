const express = require('express');
const app = express();
const opsRoutes = require('./routes/ops'); 
const bodyParser = require('body-parser');
const cors = require('cors');

// Configurar CORS para permitir solo el origen específico
app.use(cors({
    origin: 'https://bitacora-anestesia-xzbd.vercel.app'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", opsRoutes);

module.exports = app;