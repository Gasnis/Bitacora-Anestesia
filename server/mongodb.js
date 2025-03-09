const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MongoUrl = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MongoUrl);
        console.log("Conectado a MongoDB");
    } catch (err) {
        console.error("Error al conectar a MongoDB:", err);
    }
};

module.exports = connectDB;