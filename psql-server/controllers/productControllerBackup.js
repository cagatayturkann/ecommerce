const db = require('../models');
const fs = require('fs');
const fsExtra = require('fs-extra');
const Product = db.products;
const Op = db.sequelize.Op;
const elastic = require('elasticsearch');

const elasticClient = elastic.Client({
	host: 'localhost:9200',
});
//get all product
const getAllProduct = async (req, res) => {
	try {
		// const products = await Product.findAll({}).then((data)=>{
		// 	res.send(data)
		// }).catch(error=>{
		// 	console.log(error);
		// });
		const products = await Product.findAll({});
		let query = {
			index: 'products',
		};
		if (req.query.product) {
			query.q = `*${req.query.product}*`;
		}
		await elasticClient
			.search(query)
			.then((response) => {
				return res
					.status(200)
					.send({ productsElastic: response.hits.hits, products });
			})
			.catch((err) => {
				console.log(err);
				return res.status(500).json({
					message: `Error! Indexes couldn't get from server`,
					err,
				});
			});
		// res.status(200).json(products);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

//get product
const getProduct = async (req, res) => {
	try {
		const productID = req.params.id;
		const productResult = await Product.findByPk(productID);
		let query = {
			index: 'products',
			id: productID,
		};
		await elasticClient
			.get(query)
			.then((response) => {
				if (!res) {
					return res.status(404).json({
						product: response,
					});
				} else {
					return res.status(200).json({
						product: response,
						productResult,
					});
				}
			})
			.catch((err) => {
				return res.status(500).json({
					message: 'Product could not found',
					err,
				});
			});
		// res.status(200).json(product);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

//add product
const addProduct = async (req, res) => {
	const product = req.body;
	const imageName = req.file.filename;
	product.image = imageName;
	let id = '';
	try {
		await Product.create(product).then((response) => {
			id = response.id;
		});
		res.status(201).json({ message: 'Product created successfully!', product });
		console.log(`id değeri: ${id}`);
		await elasticClient.index({
			index: 'products',
			id: id,
			body: product,
		});
	} catch (error) {
		res.status(404).json({ error: error, message: error.message });
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
				console.log(error);
			}
		} else {
			newImage = req.body.oldImage;
		}
		const productInfo = req.body;
		productInfo.image = newImage;
		const product = await Product.update(productInfo, {
			where: { id: productID },
		});
		await elasticClient.update({
			index: 'products',
			id: productID,
			body: {
				doc: productInfo,
			},
		});
		res
			.status(200)
			.json({ message: 'Product updated successfully!', productInfo });
	} catch (error) {
		res.status(404).json({ message: error.message });
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
				console.log(error);
			}
		}
		await Product.destroy({
			where: { id: productID },
		}).then(() => {
			res.status(200).json({ message: 'Product deleted successfully!' });
		});
		await elasticClient
			.delete({
				index: 'products',
				id: productID,
			})
			.then((response) => {
				return res.status(200).json({
					message: 'Product deleted successfully from elastic server!',
				});
			})
			.catch((err) => {
				return res.status(404).json({
					message: 'Product could not delete!',
					err,
				});
			});
		// res.status(200).json({ message: 'Product deleted successfully!' });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

//delete all product
const deleteAllProduct = async (req, res) => {
	try {
		const product = await Product.destroy({
			truncate: true,
		}).then(() => {
			fsExtra
				.emptyDir('./uploads')
				.then(() => {
					console.log('success');
				})
				.catch((err) => {
					console.log(err);
				});
		});
		res.status(200).json({ message: 'All the products deleted succesfully!' });
	} catch (error) {
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
};
