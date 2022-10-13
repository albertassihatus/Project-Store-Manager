const { productModel } = require('../models');

const getAllProduct = async () => {
  const result = await productModel.getAll();

  return { type: null, message: result };
};

const getProductById = async (id) => {
  const result = await productModel.getById(Number(id));

  if (!result) return { type: 'error', message: 'Product not found' };
  console.log(result);

  return { type: null, message: result };
};

module.exports = {
  getAllProduct,
  getProductById,
};
