const User = require("../models/users");

const addUserToHistory = async(req, res) => {
    const { username, score } = req.body;

    const user = new User({
        username, score
    })

    const newUser = await user.save();

    res.status(201).json( newUser );
}

module.exports ={
    addUserToHistory
}