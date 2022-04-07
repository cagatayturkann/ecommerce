//requiring necessary modules, files etc. 
const db = require('../models');
const User = db.users;
const Op = db.sequelize.Op;
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../logger');

//register service 
const signUp = async (req, res, next) => {
	const newUser = {
		name: req.body.name,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 10),
	};
	await User.create(newUser)
		.then(() => {
			res.status(201).json({ message: 'User registered' });
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
			logger.log('error', 'Error Detail: ' + err.message);
		});
};

//login service
const signIn = async (req, res) => {
	try {
		await User.findOne({
			where: { email: req.body.email },
		})
			.then((user) => {
				if (!user) {
					logger.log('error', 'Error Detail: ' + err.message);
					return res.status(401).json({
						title: 'User does not exist!',
						error: 'Invalid credentials',
					});
				}
				if (!bcrypt.compareSync(req.body.password, user.password)) { //encrypting password for database
					logger.log(
						'error',
						'Error Detail: Password incorrect! Please try again.'
					);
					return res.status(404).json({
						title: 'Password incorrect! Please try again.',
						error: 'Invalid credentials',
					});
				}
				let token = jwt.sign({ userId: user.id }, 'secretkey');
				return res.status(200).json({
					title: 'login success',
					token: token,
					user: {
						id: user.id,
						name: user.name,
						email: user.email,
						role: user.role,
					},
				});
			})
			.catch((err) => {
				logger.log('error', 'Error Detail: ' + err.message);
				return res.status(500).json({
					title: 'server error',
					error: err,
				});
			});
	} catch (err) {
		logger.log('error', 'Error Detail: ' + err.message);
	}
};

//sample data and service for tokenize data
const getUser = async (req, res) => {
	let token = req.headers.token;
	jwt.verify(token, 'secretkey', (err, decoded) => {
		if (err) {
			logger.log('error', 'Error Detail: UnAuthorized' + err.message);
			return res.status(401).json({
				title: 'unauthorized',
			});
		}
		// token is valid
		User.findOne({
			where: { id: decoded.userId },
		})
			.then((user) => {
				return res.status(200).json({
					title: 'user grabbed',
					user: {
						id: user.id,
						email: user.email,
						name: user.name,
						role: user.role,
					},
				});
			})
			.catch((err) => {
				logger.log('error', 'Error Detail: ' + err.message);
			});
	});
};

module.exports = {
	signUp,
	signIn,
	getUser,
};
