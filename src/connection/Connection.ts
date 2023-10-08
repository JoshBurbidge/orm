import mysql from 'mysql2/promise';
import { ConnectionError } from '../utils/error-utils';

function validateConnection(connection: mysql.Connection | undefined): connection is mysql.Connection {
  return Boolean(connection);
}

// constructor throws error if no connection?

export class Connection {
  mySqlConnection: mysql.Connection | undefined;

  async connect() {
    const mysqlConnection = await mysql.createConnection({
      host: 'localhost',
      user: process.env.DB_USER,
      database: 'test',
      password: process.env.DB_PASSWORD
    });

    this.mySqlConnection =  mysqlConnection;
  }

  async raw(query: string) {
    if (!validateConnection(this.mySqlConnection)) {
      throw new ConnectionError();
    }

    const [results] = await this.mySqlConnection.query(query);

    return results;
  }

  async query(query: string, values?: string[]) {
    if (!validateConnection(this.mySqlConnection)) {
      throw new ConnectionError();
    }

    const [results] = await this.mySqlConnection.query(query, values);

    return results;
  }

  disconnect(): Promise<void> {
    if (!validateConnection(this.mySqlConnection)) {
      throw new ConnectionError();
    }

    return this.mySqlConnection.end();
  }
}
