const errorMap = {
  NOT_FOUND: 404,
  REQUIRED_FIELD: 400,
  INVALIDE_SIZE: 422,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};