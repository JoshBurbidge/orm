import * as dotenv from 'dotenv';
import { Connection, connect } from './connection/Connection';

dotenv.config();

export { connect } from './connection/Connection';
export { Table } from './table/Table';

export { Uuid } from './helpers/uuid';

// API:
// client creates a JS class representing the data, extends library class
// create database schema based on class (future TODO)

// auto connect here
let connection: Connection | undefined;

export async function init() {
  if (connection) {
    return connection;
  }

  connection = await connect();

  return connection;
}
export { connection };
