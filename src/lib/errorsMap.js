const errorsMap = (errors = []) =>
  errors.map((error) => error.message.replace(/^\w+\./, ''));

module.exports = errorsMap;
