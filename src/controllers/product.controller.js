const { productService } = require('../services');

const getProduct = async (_req, res) => {
  const { type, message } = await productService.getAllProduct();

  if (type) return res.status(404).json(message);

  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.getProductById(id);

  if (type) return res.status(404).json({ message });

  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await productService.createProduct(name);

  if (type) return res.status(201).json({ message });

  res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productService.updateProduct(id, name);

  if (type === 'error') return res.status(422).json({ message });
  if (type === 'not found') return res.status(404).json({ message });

  res.status(200).json(message);
};

const delProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.deleteProduct(id);

  if (type) return res.status(404).json({ message });

  res.status(204).json(message);
};

module.exports = {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  delProduct,
};
