const { Router } = require('express');
const { addUserToHistory, getHistory } = require('../controllers/historyController');

const router = Router()

router.post('/', addUserToHistory),

router.get('/', getHistory);

module.exports = router