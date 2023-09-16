import { Connection } from '../connection/Connection';
import { connection } from '../index';

function validateConnection(connection1: Connection | undefined): connection1 is Connection {
  return Boolean(connection1);
}

export class Table {
  #name: string;

  constructor() {
    this.#name = this.constructor.name;
  }

  static async findAll() {
    if (!validateConnection(connection)) {
      throw new Error('not connected');
    }

    return await connection.query(`select * from ${this.name}`);
  }

  static async findById(id: string) {
    if (!validateConnection(connection)) {
      throw new Error('not connected');
    }

    return await connection.query(`select * from ${this.name} where id = ?`, [id]);
  }

  static async create(obj: {[key: string]: any}) {
    if (!validateConnection(connection)) {
      throw new Error('not connected');
    }

    const entries = Object.entries(obj);

    await connection.query(
      `insert into ${this.name} (${entries.map(entry => entry[0]).join(', ')})
      values (${Array(entries.length).fill('?').join(', ')})`,
      entries.map(entry => entry[1])
    );
  }

  async save() {
    if (!validateConnection(connection)) {
      throw new Error('not connected');
    }

    // might have to restrict this to only properties of the child object
    const entries = Object.entries(this);

    await connection.query(
      `insert into ${this.#name} (${entries.map(entry => entry[0]).join(', ')})
      values (${Array(entries.length).fill('?').join(', ')})`,
      entries.map(entry => entry[1])
    );

    return this;
  }
}
