import { connection } from '../index';

export class Table {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  static async findAll() {
    if (!connection) {
      return;
    }
    return await connection.raw(`select * from ${this.name}`);
  }
}
