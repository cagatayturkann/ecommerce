//requiering necessary modules
const dbConfig = require('../config/postgre.config.js');
const Sequelize = require('sequelize');
//connection and configuration for database
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operatorsAliases: false,
	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
	logging: false,
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
//exporting database models
db.products = require('./Product.js')(sequelize, Sequelize);
db.users = require('./User.js')(sequelize, Sequelize);
module.exports = db;
