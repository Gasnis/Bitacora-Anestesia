const express = require("express");

const api = express.Router();

const { getOps, addOp, deleteOp} = require("../controllers/opsController");
const { addUser, getUsers } = require("../controllers/usersController");


api.get("/ops", getOps);
api.post("/ops", addOp);
api.delete("/ops/:id", deleteOp);
api.post("/users", addUser);
api.get("/users", getUsers);

module.exports = api;
