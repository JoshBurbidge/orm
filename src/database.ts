import mysql, { RowDataPacket, QueryError } from 'mysql2/promise';
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

export async function connect() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    database: 'test',
    password: process.env.DB_PASSWORD
  });

  const [rows, fields] = await connection.query(
    'SELECT * FROM `user`',
  );

  // console.log(typeof rows);
  // if (!rows instanceof RowDataPacket) {
  //   return;
  // }

  // parseResults(rows);

  console.log(rows);
  const userOptions = createUserOptions(rows[0]);
  console.log(new User(userOptions));


  return connection;
}

export async function disconnect(connection: mysql.Connection) {
  return connection.end();
}