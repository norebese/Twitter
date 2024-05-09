// npm i mysql2
import mysql from 'mysql2';
import {config} from '../config.js';
import SQ from 'sequelize';

// const pool = mysql.createPool({
//    host: config.db.host,
//    port: config.db.port,
//    user: config.db.user,
//    database: config.db.database,
//    password: config.db.password
// });

// export const db = pool.promise();

const {host, user, database, password, port} = config.db;

export const sequelize = new SQ.Sequelize(database,user, password, {
   host,
   dialect: 'mysql',
   logging: false
})