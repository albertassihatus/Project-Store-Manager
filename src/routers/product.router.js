const express = require('express');
const { productController } = require('../controllers');
const { nameValidate } = require('../middlewares/productsValidations');

const router = express.Router();

router.get('/', productController.getProduct);

router.get('/:id', productController.getProductById);

router.post('/', nameValidate, productController.createProduct);

router.put('/:id', nameValidate, productController.updateProduct);

router.delete('/:id', productController.delProduct);

module.exports = router;
