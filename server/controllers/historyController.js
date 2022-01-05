const User = require("../models/users");

const addUserToHistory = async(req, res) => {
    const { username, score } = req.body;

    const user = new User({
        username, score
    })

    const newUser = await user.save();

    res.status(201).json( newUser );
}

const getHistory = async(req, res) => {
    const history = await User.find();

    res.status(200).json(history)
}

module.exports ={
    addUserToHistory,
    getHistory
}