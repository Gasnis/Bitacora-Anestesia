const express = require("express");

const api = express.Router();

const { getOps, addOp, deleteOp } = require("../controllers/opsController");


api.get("/ops", getOps);
api.post("/ops", addOp);
api.delete("/ops/:id", deleteOp);

module.exports = api;
