//requiring necessary modules
const express = require('express');
const productController = require('../controllers/productController');
const multer = require('multer');

const router = express.Router();

//multer middleware for image upload
let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads');
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
	},
});

let upload = multer({
	storage: storage,
}).single('image');

//routes
router.get('/', productController.getAllProduct);
router.get('/search', productController.getAllProductFromElastic);
router.get('/:id', productController.getProduct);
router.post('/', upload, productController.addProduct);
router.put('/:id', upload, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.delete('/', productController.deleteAllProduct);

module.exports = router;
