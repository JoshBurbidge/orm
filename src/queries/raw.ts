import { Connection } from 'mysql2/promise';

// TODO make a better API (use a class/object)
export async function raw(connection: Connection, query: string) {
  const [results] = await connection.query(query);

  return results;
}