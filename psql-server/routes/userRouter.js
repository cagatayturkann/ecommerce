//requiring necessary modules
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();


//routes
router.get('/', userController.getAllUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
