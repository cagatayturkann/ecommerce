require('dotenv').config();

module.exports = {
	HOST: 'localhost',
	USER: process.env.DB_USER,
	PASSWORD: process.env.DB_PASS,
	DB: 'ecommercedb',
	dialect: 'postgres',
	pool: {
		max: 5, //maximum number of connection in pool
		min: 0, //minimum number of connection in pool
		acquire: 30000, //maximum time, in milliseconds, that pool will try to get connection before throwing error
		idle: 10000, //maximum time, in milliseconds, that a connection can be idle before being released
	},
};
