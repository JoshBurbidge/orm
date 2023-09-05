import mysql from 'mysql2/promise';

export class Connection {
  mySqlConnection: mysql.Connection;

  constructor(mySqlConnection: mysql.Connection) {
    this.mySqlConnection = mySqlConnection;
  }

  async raw(query: string) {
    const [results] = await this.mySqlConnection.query(query);

    return results;
  }

  disconnect(): Promise<void> {
    return this.mySqlConnection.end();
  }
}

export async function connect(): Promise<Connection> {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    database: 'test',
    password: process.env.DB_PASSWORD
  });

  return new Connection(connection);
}