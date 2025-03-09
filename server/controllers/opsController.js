const Ops = require('../models/ops');
async function addOp(req, res) {
    try {
        const { hospital, areaDeTrabajo, nombre, fecha, cirugia, anestesia, rol } = req.body;

        // Crear una nueva instancia correctamente con 'new'
        const newOp = new Ops({
            hospital,
            areaDeTrabajo,
            nombre,
            fecha,
            cirugia,
            anestesia,
            rol
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

        // Eliminar el documento con el método 'deleteOne'
        await Ops.deleteOne({ _id: id });   
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addOp,
    getOps,
    deleteOp

};