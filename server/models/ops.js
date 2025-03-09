const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OpsSchema = new Schema({
    hospital: {
        type: String,
        required: true
    },
    areaDeTrabajo: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        default: 'Ana Lia Saravia'
    },
    fecha: {
        type: String,
        required: true,
    },
    cirugia: {
        type: String,
        required: true
    },
    anestesia: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Ops', OpsSchema);