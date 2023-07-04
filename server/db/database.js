import SQ from 'sequelize';
import { config } from '../config.js';
const { host, database, password, user } = config.db;

export const sequelize = new SQ.Sequelize(database, user, password, {host, dialect: 'mysql'});

