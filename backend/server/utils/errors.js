class PropertyRequiredError extends Error {
  constructor(properties) {
    if(!Array.isArray(properties)){
      properties = [properties];
    }
    super(`No properties: ${  properties}`);
    this.name = 'PropertyRequiredError';
    this.property = properties;
  }
}

class UnauthorizedError extends Error {
  constructor(properties) {
    super(properties);
    this.name = 'Unauthorized';
    this.code = 401;
    this.property = properties;
  }
}

module.exports = {
  PropertyRequiredError,
  UnauthorizedError
};