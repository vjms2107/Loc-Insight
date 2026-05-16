const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// GET /users/points?email=...
router.get('/points', UserController.getPoints);

// POST /users/redeem - Resgatar pontos (PB14)
router.post('/redeem', UserController.redeem);

// POST /users/login
router.post('/login', UserController.login);

module.exports = router;
