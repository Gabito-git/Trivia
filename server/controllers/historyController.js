const User = require("../models/users");

const addUserToHistory = async(req, res) => {
    const { username, score } = req.body;

    try {
        const user = new User({
            username, score
        })
    
        const newUser = await user.save();
    
        res.status(201).json( {
            ok: true,
            user: newUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Please contact your administrator'
        })
    }
    
}

const getHistory = async(req, res) => {

    try {
        const history = await User.find();
        res.status(200).json({
            ok: true,
            history
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Please contact your administrator'
        })
    }
    
}

module.exports ={
    addUserToHistory,
    getHistory
}