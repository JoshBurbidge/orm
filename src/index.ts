import * as dotenv from 'dotenv';
import { connect } from './connection/Connection';
dotenv.config();

export { connect } from './connection/Connection';
export { Table } from './table/Table';

export { Uuid } from './helpers/uuid';

// API:
// client creates a JS class representing the data, extends library class
// create database schema based on class (future TODO)

// TODO:
// create table class with a 'SELECT *' method

// auto connect here
// const connection = connect();