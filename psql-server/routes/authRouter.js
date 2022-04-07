//requiring libraries/packages
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

//defining routes
router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.get('/user', authController.getUser);

module.exports = router;
