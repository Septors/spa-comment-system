export default class ApiError extends Error {
  constructor(typeError, message) {
    super(message);
    this.typeError = typeError;
  }
}
