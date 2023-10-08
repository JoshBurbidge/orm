export class ConnectionError extends Error {
  constructor() {
    super('Database connection was not initialized. Make sure you call init().');
  }
}
