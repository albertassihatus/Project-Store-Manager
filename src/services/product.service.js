const { productModel } = require('../models');
const addProductSchema = require('./validations/schemas');
// const addProductSchema = require('./validations/schemas');

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
  const { error } = addProductSchema.validate(name);
  if (error.type) return error;

  const newProductId = await productModel.newProduct(name);
  const newProduct = await productModel.getById(newProductId);

  return { type: null, message: newProduct };
};

const updateProduct = async (id, name) => {
  const product = await productModel.getById(id);

  if (!product) return { type: 'not found', message: 'Product not found' };

  await productModel.updateModel(id, name);

  const updatedProduct = await productModel.getById(id);

  return { type: null, message: updatedProduct };
};

const deleteProduct = async (id) => {
  const product = await productModel.getById(id);

  if (!product) return { type: 'not found', message: 'Product not found' };

  await productModel.deleteModel(id);

  return { type: null, message: [] };
};

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
