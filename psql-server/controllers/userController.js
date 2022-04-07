const db = require('../models');
const User = db.users;
const Op = db.sequelize.Op;
const bcrypt = require('bcrypt');
const logger = require('../logger');



//get all users from database
const getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll({});
		res.status(200).json(users);
	} catch (error) {
		logger.log('error', 'Error Detail: ' + error.message);
		res.status(404).json({ message: error.message });
	}
};
//update user
const updateUser = async (req, res) => {
	try {
		const userId = req.params.id;
    const newUserInfo = {
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    };
		const user = await User.update(newUserInfo, {
			where: { id: userId },
		});
		res.status(200).json({ message: 'User updated successfully!', newUserInfo });
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
		logger.log('error', 'Error Detail: ' + error.message);
	}
};

//delete user
const deleteUser = async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await User.findByPk(userId);
		await User.destroy({
			where: { id: userId },
		});
		res.status(200).json({ message: 'User deleted successfully!' });
	} catch (error) {
		res.status(404).json({ message: error.message });
		logger.log('error', 'Error Detail: ' + error.message);
	}
};



module.exports = {
  getAllUsers,
  updateUser,
  deleteUser
};
