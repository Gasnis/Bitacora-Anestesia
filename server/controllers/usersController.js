
const User = require("../models/user");
const mongoose = require("mongoose");

async function getUsers(_, res) {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function addUser(req, res) {
    try {
        const { username, name, password } = req.body;

        const newUser = new User({ username, name, password });

        const userStored = await newUser.save();

        res.status(201).send(userStored);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
   
    addUser,
    getUsers,
};
