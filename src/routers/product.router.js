const express = require('express');
const { productController } = require('../controllers');
const { nameValidate } = require('../middlewares/productsValidations');

const router = express.Router();

router.get('/', productController.getProduct);

router.get('/:id', productController.getProductById);

router.post(
  '/', nameValidate,
  productController.createPassenger,
);

module.exports = router;
