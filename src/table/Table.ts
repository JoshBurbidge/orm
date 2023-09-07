import { Connection } from '../connection/Connection';

export class Table {
  name: string;
  connection: Connection;

  constructor(connection: Connection, name: string) {
    this.name = name;
    this.connection = connection;
  }

  async findAll() {
    return await this.connection.raw(`select * from ${this.name}`);
  }
}