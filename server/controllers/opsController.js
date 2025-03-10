const Ops = require("../models/ops");

const mongoose = require("mongoose");

async function addOp(req, res) {
	try {
		const {
			hospital,
			areaDeTrabajo,
			nombre,
			fecha,
			cirugia,
			anestesia,
			rol,
			nombrePaciente,
			edadPaciente,
			dniPaciente,
			nombreCirujano,
			obraSocial,
		} = req.body;

		// Crear una nueva instancia correctamente con 'new'
		const newOp = new Ops({
			hospital,
			areaDeTrabajo,
			nombre,
			fecha,
			cirugia,
			anestesia,
			rol,
			nombrePaciente,
			edadPaciente,
			dniPaciente,
			nombreCirujano,
			obraSocial,
		});

		// Guardar en la base de datos con 'await'
		const OpStored = await newOp.save();

		// Enviar el objeto guardado como respuesta
		res.status(201).send(OpStored);
	} catch (error) {
		res.status(400).send(error.message);
	}
}

async function getOps(req, res) {
	try {
		const ops = await Ops.find();
		res.status(200).send(ops);
	} catch (error) {
		res.status(400).send(error.message);
	}
}

async function deleteOp(req, res) {
	try {
		const { id } = req.params;

		if (!id || !mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).send("ID no proporcionado o no válido");
		}

		const deletedOp = await Ops.findByIdAndDelete(id);
		if (!deletedOp) {
			return res.status(404).send("Operación no encontrada");
		}

		res.status(200).send(deletedOp);
	} catch (error) {
		res.status(500).send(error.message);
	}
}


module.exports = {
	addOp,
	getOps,
	deleteOp,
};
