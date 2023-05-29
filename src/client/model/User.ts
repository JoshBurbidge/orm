export interface UserOptions {
  id: number,
  username: string,
  name: string,
  type: string
}

export class User {
  id: number;
  name: string;
  username: string;
  type: string;

  // constructor(id: number, username: string, name: string, type: string) {
  //   this.id = id;
  //   this.username = username;
  //   this.name = name;
  //   this.type = type;
  // }

  constructor(options: UserOptions) {
    this.id = options.id;
    this.username = options.username;
    this.name = options.name;
    this.type = options.type;
  }
}