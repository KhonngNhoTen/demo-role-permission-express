module.exports = class ApiError extends Error {
  /** @param {{code: string, message: string, status: string}} options */
  constructor(options) {
    super(options);
    this.code = options.code;
    this.message = options.message;
    this.messages = options.message;
    this.status = options.status;
  }
};
