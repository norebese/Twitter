// npm i mysql2
import mysql from 'mysql2';
import {config} from '../config.js';
import SQ from 'sequelize';
import MongoDb from 'mongodb';

let db;

export async function connectDB(){
   return MongoDb.MongoClient.connect(config.db.host).then((client)=>db = client.db());
}

export function getUsers(){
   return db.collection('users');
}

export function getTweets(){
   return db.collection('tweets');
}

// const pool = mysql.createPool({
//    host: config.db.host,
//    port: config.db.port,
//    user: config.db.user,
//    database: config.db.database,
//    password: config.db.password
// });

// export const db = pool.promise();

// const {host, user, database, password, port} = config.db;

// export const sequelize = new SQ.Sequelize(database,user, password, {
//    host,
//    dialect: 'mysql',
//    logging: false
// })