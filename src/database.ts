import mysql, { RowDataPacket, Connection } from 'mysql2/promise';
import { User, UserOptions } from './client/model/User';

function createUserOptions(userRowData: RowDataPacket): UserOptions {
  return {
    id: userRowData.id,
    username: userRowData.username,
    name: userRowData.name,
    type: userRowData.type
  };
}

function parseResults(results: RowDataPacket[]) {
  console.log(results); // results contains rows returned by server
  const userOptions = createUserOptions(results[0]);
  console.log(new User(userOptions));
  // console.log(fields); // fields contains extra meta data about results, if available
}

function isArray(obj: any): obj is RowDataPacket[] {
  return Boolean(obj.length);
}

export async function connect(): Promise<Connection> {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    database: 'test',
    password: process.env.DB_PASSWORD
  });

  // const [rows, fields] = await connection.query(
  //   'SELECT * FROM `user`',
  // ) as [RowDataPacket[], FieldPacket[]];

  // console.log(rows);

  // if (!isArray(rows)) {
  //   return;
  // }

  // const userOptions = createUserOptions(rows[0]);
  // console.log(new User(userOptions));

  // TODO make a class and return object of that class
  return connection;
}

export async function disconnect(connection: mysql.Connection): Promise<void> {
  return connection.end();
}