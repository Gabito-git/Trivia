const Trivia = require('../models/trivias');

const getTrivia = async( req, res ) => {
    const { level } = req.params;

    const trivias = await Trivia.find({ level });
    res.status(200).json( trivias );    
}

module.exports = {
    getTrivia
}