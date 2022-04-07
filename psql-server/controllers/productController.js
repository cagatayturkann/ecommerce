//requiring necessary modules and files etc.
const db = require('../models');
const fs = require('fs');
const fsExtra = require('fs-extra');
const Product = db.products;
const Op = db.sequelize.Op;
const axios = require('axios');
const elastic = require('elasticsearch');
const logger = require('../logger');


const elasticClient = elastic.Client({
	host: 'localhost:9200',
});

//get all product from database
const getAllProduct = async (req, res) => {
	try {
		const products = await Product.findAll({});
		res.status(200).json(products);
		// const products = await Product.findAll({}).then((dbResults) => {
		// 	let query = {
		// 		index: 'products',
		// 	};
		// 	if (req.query.product) {
		// 		query.q = `*${req.query.product}*`;
		// 	}
		// 	elasticClient
		// 		.search(query)
		// 		.then((response) => {
		// 			return res
		// 				.status(200)
		// 				.send({ productsElastic: response.hits.hits, dbResults });
		// 		})
		// 		.catch((err) => {
		// 			console.log(err);
		// 			return res.status(500).json({
		// 				message: `Error! Indexes couldn't get from server`,
		// 				err,
		// 			});
		// 		});
		// });
	} catch (error) {
		res.status(404).json({ message: error.message });
		logger.log('error', 'Error Detail: ' + error.message);
	}
};

//get all data from elastic server
const getAllProductFromElastic = async (req, res) => {
	let query = {
		index: 'products',
	};
	if (req.query.product) {
		query.q = `*${req.query.product}*`;
	}
	await elasticClient
		.search(query)
		.then((response) => {
			return res.status(200).send(response.hits.hits);
		})
		.catch((err) => {
			logger.log('error', 'Error Detail: ' + err.message);
			return res.status(500).json({
				message: `Error! Indexes couldn't get from server`,
				err,
			});
		});
};

//get product
const getProduct = async (req, res) => {
	try {
		const productID = req.params.id;
		const product = await Product.findByPk(productID).then((productResult) => {
			// let query = {
			// 	index: 'products',
			// 	id: productID,
			// };
			// elasticClient
			// 	.get(query)
			// 	.then((response) => {
			// 		if (!res) {
			// 			return res.status(404).json({
			// 				product: response,
			// 			});
			// 		} else {
			// 			return res.status(200).json({
			// 				product: response,
			// 				productResult,
			// 			});
			// 		}
			// 	})
			// 	.catch((err) => {
			// 		return res.status(500).json({
			// 			message: 'Product could not found',
			// 			err,
			// 		});
			// 	});
			res.status(200).json(productResult);
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
		logger.log('error', 'Error Detail: ' + error.message);
	}
};

//add product to database and elastic
const addProduct = async (req, res) => {
	const product = req.body;
	const imageName = req.file.filename;
	product.image = imageName;
	let id = '';
	try {
		await Product.create(product).then((response) => { //adding product to db and elastic server at the same time
			id = response.id;
			elasticClient
				.index({
					index: 'products',
					id: id,
					body: product,
				})
				.then(() => {
					console.log(`${id} product indexed to elastic server`);
				})
				.catch((err) => {
					logger.log(
						'error',
						`Error Detail: ${id} product could not added to elastic server!` +
							err.message
					);
				});
			res.status(201).json({
				message: `${id} product added to database and indexed to elastic server successfully!`,
				product,
			});
		});
	} catch (error) {
		logger.log(
			'error',
			`${id} product could not added to database and indexed to elastic server successfully!` +
				error.message
		);
		res.status(404).json({
			error: ``,
			message: error.message,
		});
	}
};

//update product
const updateProduct = async (req, res) => {
	try {
		const productID = req.params.id;
		let newImage = '';
		if (req.file) {
			newImage = req.file.filename;
			try {
				fs.unlinkSync('./uploads/' + req.body.oldImage);
			} catch (error) {
				logger.log('error', 'Error Detail: ' + error.message);
			}
		} else {
			newImage = req.body.oldImage;
		}
		const productInfo = req.body;
		productInfo.image = newImage;
		const product = await Product.update(productInfo, {
			where: { id: productID },
		}).then(() => { //updating product to db and elastic server at the same time
			elasticClient
				.update({
					index: 'products',
					id: productID,
					body: {
						doc: productInfo,
					},
				})
				.then(() => {
					console.log(
						`${productID} product updated from elastic server successfully!`
					);
				})
				.catch((err) => {
					logger.log(
						'error',
						`${productID} product could not updated from elastic server!` +
							err.message
					);
				});
			res
				.status(200)
				.json({ message: 'Product updated successfully!', productInfo });
		});
	} catch (error) {
		logger.log(
			'error',
			`${id} product could not updated to database and elastic server successfully!` +
				err.message
		);
		res.status(404).json({
			error: `${id} product could not updated to database and elastic server successfully!`,
			message: error.message,
		});
	}
};

//delete product
const deleteProduct = async (req, res) => {
	try {
		const productID = req.params.id;
		const product = await Product.findByPk(productID);
		if (product.image !== '') {
			try {
				fs.unlinkSync('./uploads/' + product.image);
			} catch (error) {
				logger.log('error', 'Error Detail: ' + error.message);
			}
		}
		await Product.destroy({
			where: { id: productID },
		}).then(() => {
			elasticClient
				.delete({ //deleting product from db and elastic server at the same time
					index: 'products',
					id: productID,
				})
				.then((response) => {
					console.log(
						`${productID} product deleted successfully from elastic server!`
					);
				})
				.catch((err) => {
					logger.log('error',`${productID} product coult not deleted from elastic server!` +err.message);
				});
			res.status(200).json({ message: 'Product deleted successfully!' });
		});
	} catch (error) {
		logger.log('error', 'Error Detail: ' + error.message);
		res.status(404).json({ message: error.message });
	}
};

//delete all product
const deleteAllProduct = async (req, res) => {
	try {
		const product = await Product.destroy({
			truncate: true,
		}).then(() => {
			axios.delete('http://localhost:9200/products'); //deleting all product from db and elastic server at the same time and clearing uploads file
			fsExtra
				.emptyDir('./uploads')
				.then(() => {
					console.log('success');
				})
				.catch((err) => {
					logger.log('error', 'Error Detail: ' + err.message);
				});
		});
		res.status(200).json({ message: 'All the products deleted succesfully!' });
	} catch (error) {
		logger.log('error', 'Error Detail: ' + error.message);
		res.status(404).json({ message: error.message });
	}
};

module.exports = {
	getAllProduct,
	getProduct,
	addProduct,
	updateProduct,
	deleteProduct,
	deleteAllProduct,
	getAllProductFromElastic,
};
