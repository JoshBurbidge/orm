import mysql from 'mysql2';

export async function connect() {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test',
    password: process.env.DB_PASSWORD
  });

  connection.query(
    'SELECT * FROM `user`',
    function(err, results, fields) {
      if (err) console.log(err);
      console.log(results); // results contains rows returned by server
      // console.log(fields); // fields contains extra meta data about results, if available
    }
  );

  connection.end((err) => {
    if (err) console.log(err);
  });
}