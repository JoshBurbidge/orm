import * as dotenv from 'dotenv';
dotenv.config();
import { connect } from './database';

export { Uuid } from './helpers/uuid';
export  { uuidObject } from './helpers/uuid';

connect();