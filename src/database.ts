import mysql, { RowDataPacket, QueryError } from 'mysql2';
import { User, UserOptions } from './client/model/User';

function createUserOptions(userRowData: RowDataPacket): UserOptions {
  return {
    id: userRowData.id,
    username: userRowData.username,
    name: userRowData.name,
    type: userRowData.type
  };
}

export async function connect() {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    database: 'test',
    password: process.env.DB_PASSWORD
  });

  connection.query(
    'SELECT * FROM `user`',
    function(err: QueryError, results: RowDataPacket) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(results); // results contains rows returned by server
      const userOptions = createUserOptions(results[0]);
      console.log(new User(userOptions));
      // console.log(fields); // fields contains extra meta data about results, if available
    }
  );

  connection.end((err) => {
    if (err) console.log(err);
  });
}