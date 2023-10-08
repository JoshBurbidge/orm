import * as dotenv from 'dotenv';
import { Connection } from './connection/Connection';

dotenv.config();

export { Table } from './table/Table';

// API:
// client creates a JS class representing the data, extends library class
// create database schema based on class (future TODO)

// automatically connect on each query?
// just use as so it throws an error if the connection is undefined
// or just check before each query

const connection = new Connection();

export async function init() {
  await connection.connect();

  return connection;
}
export { connection };
