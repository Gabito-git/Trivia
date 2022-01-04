const Trivia = require('../models/trivias');

const getTrivia = async( req, res ) => {
    const { level } = req.params;

    const trivias = await Trivia.find({ level });
    const triviaToReturn = trivias[Math.floor(Math.random()*5)]

    res.status(200).json( triviaToReturn );    
}

module.exports = {
    getTrivia
}