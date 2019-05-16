const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

router.post('/', authController.loginUser);

module.exports = router;
