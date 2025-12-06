export default class MessageError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.message = message || 'Internal Server Error';
    this.statusCode = statusCode;
  }
}
