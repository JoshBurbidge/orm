import mysql, { RowDataPacket } from 'mysql2/promise';
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
