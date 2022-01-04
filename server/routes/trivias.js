const { Router } = require('express');
const { getTrivia } = require('../controllers/triviaController');

const router = Router();

router.get('/:level', getTrivia);


module.exports = router;