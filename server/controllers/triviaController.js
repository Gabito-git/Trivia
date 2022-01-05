const Trivia = require('../models/trivias');

const getTrivia = async( req, res ) => {
    const { level } = req.params;

    try {
        const trivias = await Trivia.find({ level });
        const triviaToReturn = trivias[Math.floor(Math.random()*5)]

        res.status(200).json( {
            ok: true,
            trivia: triviaToReturn
        } );   
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            message: 'Please contact your administrator'
        })
    }
     
}

module.exports = {
    getTrivia
}