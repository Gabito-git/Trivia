const { Router } = require('express');
const { addUserToHistory } = require('../controllers/historyController');

const router = Router()

router.post('/', addUserToHistory)

module.exports = router