const { nameSchema, saleSchema } = require('./schemas');

const validateName = (name) => {
  if (!name) {
    return {
      type: 'REQUIRED_FIELD',
      message: '"name" is required',
    };
  }

  const { error } = nameSchema.validate(name);  
  if (error) {
    return {
      type: 'INVALIDE_SIZE',
      message: '"name" length must be at least 5 characters long',
    };
  }

  return { type: null, message: '' };
};

const validateNewSale = (object) => {
  const { error } = saleSchema.validate(object);
  if (error) {
    return {
      type: error.message.includes('is required') ? 'REQUIRED_FIELD' : 'INVALIDE_SIZE',
      message: error.message,
    };
  }
  return { type: null, message: '' };
}; 

module.exports = {
  validateName,
  validateNewSale,
};