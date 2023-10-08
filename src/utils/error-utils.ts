export class ConnectionError extends Error {
  constructor() {
    Error.stackTraceLimit = 20;

    super('Database connection was not initialized. Make sure you call init().');
  }
}
