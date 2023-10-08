import { RowDataPacket } from 'mysql2';
import { connection } from '../index';
import { OkPacket, ResultSetHeader } from 'mysql2';

function isRowDataPacketList(result: RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader): result is RowDataPacket[] | RowDataPacket[][] {
  return true;
}

export class Table {
  #name: string;

  constructor() {
    this.#name = this.constructor.name;
  }

  static async findAll() {
    return await connection.query(`select * from ${this.name}`);
  }

  static async findById(id: string) {
    const result = await connection.query(`select * from ${this.name} where id = ?`, [id]);

    if (!isRowDataPacketList(result)) {
      return [];
    }

    return result[0];
  }

  static async create(obj: {[key: string]: any}) {
    const entries = Object.entries(obj);

    await connection.query(
      `insert into ${this.name} (${entries.map(entry => entry[0]).join(', ')})
      values (${Array(entries.length).fill('?').join(', ')})`,
      entries.map(entry => entry[1])
    );
  }

  async save() {
    // might have to restrict this to only properties of the child object
    const entries = Object.entries(this);

    const result = await connection.query(
      `insert into ${this.#name} (${entries.map(entry => entry[0]).join(', ')})
      values (${Array(entries.length).fill('?').join(', ')})`,
      entries.map(entry => entry[1])
    );
    console.log(result);

    return this;
  }
}
