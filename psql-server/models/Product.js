const { v4: uuid } = require('uuid'); //For generating ID's

//creating product model
module.exports = (sequelize, Sequelize) => {
	const Product = sequelize.define('product', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: Sequelize.STRING,
			unique: true
		},
		description: {
			type: Sequelize.STRING,
		},
		price: {
			type: Sequelize.FLOAT,
			min: 1,
			max: 9999
		},
		image: {
		  type: Sequelize.STRING,
		},
		category: {
			type: Sequelize.ENUM,
			values: [
				'shoe',
				'hoodie',
				'computer',
				'book',
				'kitchen',
				'mobile',
				'car',
				'television',
				'movie',
				'game',
			],
		},
		dateCreated: {
			type: Sequelize.DATEONLY,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},
	});
	// Product.beforeCreate((product) => {
	// 	return (product.id = uuid());
	// });
	return Product;
};
