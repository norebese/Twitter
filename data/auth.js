// import {db} from '../db/database.js';
import SQ from 'sequelize';
// import {sequelize} from '../db/database.js';
// import MongoDbB from 'mongodb';
import {getUsers} from '../db/database.js';
import Mongoose from 'mongoose';
import {useVirtualId} from '../db/database.js';

const userSchema = new Mongoose.Schema({
    username: {type: String, require: true},
    name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    url: String
});

useVirtualId(userSchema);

const User = Mongoose.model('User', userSchema); //자동으로 'Users'로 바꿔줌

//아이디(username) 중복 검사
export async function findByUsername(username){
    return User.findOne({username});
}

// id 중복검사
export async function findById(id){
    return User.findById(id);
}

//회원가입
export async function createUser(user){
    return new User(user).save().then((data)=>data.id);
}


function mapOptionalUser(user){
    return user ? {...user, id: user._id.toString()} : user;
}











// const ObjectID = MongoDbB.ObjectId;

// //아이디(username) 중복 검사
// export async function findByUsername(username){
//     return getUsers().find({username}).next().then(mapOptionalUser);
// }

// // id 중복검사
// export async function findById(id){
//     return getUsers().find({_id: new ObjectID(id)}).next().then(mapOptionalUser);
// }

// //회원가입
// export async function createUser(user){
//     return getUsers().insertOne(user).then((result)=> console.log(result.insertId.toString()));
// }


// function mapOptionalUser(user){
//     return user ? {...user, id: user._id.toString()} : user;
// }






// const DataTypes = SQ.DataTypes; //sequelize에서 사용하는 데이터 형들을 넣어두고 데이터형 생성하기 위해

// export const User = sequelize.define(
//     'user',
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             allowNull: false,
//             primaryKey: true
//         },
//         username:{
//             type: DataTypes.STRING(50),
//             allowNull: false
//         },
//         password:{
//             type:DataTypes.STRING(150),
//             allowNull: false
//         },
//         name:{
//             type:DataTypes.STRING(50),
//             allowNull: false
//         },
//         email: {
//             type:DataTypes.STRING(50),
//             allowNull: false
//         },
//         url:DataTypes.STRING(1000)
//     },
//     {timestamps: false}
// );

// //아이디(username) 중복 검사
// export async function findByUsername(username){
//     // return db.execute('select * from users where username = ?', [username]).then((result)=> {
//     //     console.log(result);
//     //     return result[0][0];
//     // });
//     return User.findOne({where:{username}}) //username과 일치하는 녀석 하나 가져와
// }

// // id 중복검사
// export async function findById(id){
//     // return db.execute('select * from users where id = ?', [id]).then((result)=>{
//     //     console.log(result);
//     //     return result[0][0];
//     // });
//     return User.findByPk(id); //primary key로 찾아오기
// }

// //회원가입
// export async function createUser(user){
//     // const {username, hashed, name, email, url} = user;
//     // return db.execute('insert into users (username, password, name, email, url) values(?,?,?,?,?)', 
//     // [username, hashed, name, email, url]).then((result)=> {
//     //     console.log(result);    //result[0].insertId
//     //     return result[0].insertId;
//     // });
//     return User.create(user).then((data)=>data.dataValues.id)
// };

// // export async function login(username){
// //     return users.find((user)=>user.username === username);
// // };