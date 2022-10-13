const { productModel } = require('../models');

const getAllProduct = async () => {
  const result = await productModel.getAll();

  return { type: null, message: result };
};

const getProductById = async (id) => {
  const result = await productModel.getById(Number(id));

  if (!result) return { type: 'error', message: 'Product not found' };

  return { type: null, message: result };
};

const createProduct = async (name) => {
  const newProductId = await productModel.newProduct(name);
  const newProduct = await productModel.getById(newProductId);

  return { type: null, message: newProduct };
};

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
};
