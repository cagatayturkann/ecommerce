const bcrypt = require('bcrypt');

//creating user model
module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('users', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				customValidator(value) {
					if (value === '') {
						throw new Error('Name is required');
					}
				},
			},
		},
		email: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
			validate: {
				customValidator(value) {
					if (value === '') {
						throw new Error('Email is required');
					}
				},
			},
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				customValidator(value) {
					if (value === '') {
						throw new Error('Password is required');
					}
				},
			},
		},
		role: {
			type: Sequelize.ENUM,
			values: ['admin', 'user'],
			defaultValue: 'user',
		},
		dateCreated: {
			type: Sequelize.DATEONLY,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},
	});

	// User.beforeCreate((user, next) => {
	// 	if (!user.changed('password')) return next();
	// 	bcrypt.genSalt(10, function (err, salt) {
	// 		if (err) return next(err);
	// 		bcrypt.hash(user.password, salt, function (err, hash) {
	// 			if (err) return next(err);
	// 			user.password = hash;
	// 			next();
	// 		});
	// 	});
	// });
	return User;
};
