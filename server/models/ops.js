const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OpsSchema = new Schema({
	hospital: {
		type: String,
		required: true,
	},
	areaDeTrabajo: {
		type: String,
		required: true,
	},
	nombre: {
		type: String,
		required: true,
	},
	fecha: {
		type: String,
		required: true,
	},
	cirugia: {
		type: String,
		required: true,
	},
	anestesia: {
		type: String,
		required: true,
	},
	rol: {
		type: String,
		required: true,
	},

	nombrePaciente: {
		type: String,
		required: true,
	},
	edadPaciente: {
		type: Number,
		required: true,
	},
	dniPaciente: {
		type: String,
		required: true,
	},

    nombreCirujano:{
        type: String,
        required: true,
    },
    obraSocial:{
        type: String,
        required: true,
    },

});

module.exports = mongoose.model("Ops", OpsSchema);
