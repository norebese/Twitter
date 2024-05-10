// npm i mysql2
import mysql from 'mysql2';
import {config} from '../config.js';
import SQ from 'sequelize';
// import MongoDb from 'mongodb';
import Mongoose from 'mongoose';


export async function connectDB(){
   return Mongoose.connect(config.db.host);
}

export function useVirtualId(schema){
   schema.virtual('id').get(function(){
      return this._id.toString();
   });
   schema.set('toJSN', {virtuals:true}); //스키마 형태 세팅
   schema.set('toObject', {virtuals:true}); //스키마 형태 세팅
}

let db;

export function getUsers(){
   return db.collection('users');
}

export function getTweets(){
   return db.collection('tweets');
}





// 몽고DB 사용
// let db;

// export async function connectDB(){
//    return MongoDb.MongoClient.connect(config.db.host).then((client)=>db = client.db());
// }

// export function getUsers(){
//    return db.collection('users');
// }

// export function getTweets(){
//    return db.collection('tweets');
// }





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