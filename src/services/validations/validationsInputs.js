const addProductSchema = require('./schemas');

const validateNewProduct = (name) => {
  const { error } = addProductSchema.validate({ name });
  if (error) return { message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validateNewProduct,
};