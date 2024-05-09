// import {db} from '../db/database.js';
import SQ, { NOW } from 'sequelize';
import {sequelize} from '../db/database.js';
import {User} from './auth.js';
const DataTypes = SQ.DataTypes; //sequelize에서 사용하는 데이터 형들을 넣어두고 데이터형 생성하기 위해
const Sequelize = sequelize;

const INCLUDE_USER= {
    attributes:[
        'id',
        'text',
        'createdAt',
        'userid',
        [Sequelize.col('user.name'), 'name'],
        [Sequelize.col('user.username'), 'username'],
        [Sequelize.col('user.url'), 'url']
    ],
    include:{
        model: User,
        attributes: [],
    }
}

const ORDER_DESC = {
    order: [['createdAt', 'DESC']]
}

// const SELECT_JOIN = 'select tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.email, us.url from tweets as tw join users as us on tw.userId = us.id';

// const ORDER_DESC = 'order by tw.createdAt desc';

export const Tweet = sequelize.define('tweet',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        text:{
            type:DataTypes.STRING(2000),
            allowNull: false
        }
    }, {timestamps: false});

Tweet.belongsTo(User);

// 모든 트윗을 리턴
export async function getAll(){
    // return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result)=>{
    //     console.log(result);
    //     return result;
    // });
    return Tweet.findAll({...INCLUDE_USER, ...ORDER_DESC});
}

// 해당 아이디에 대한 트윗을 리턴
export async function getAllByUsername(username){
    // return db.execute(`${SELECT_JOIN} where username = ? ${ORDER_DESC}`, [username]).then((result)=>{
    //     console.log(result);
    //     return result[0];
    // });
    return Tweet.findAll({...INCLUDE_USER, ...ORDER_DESC, include:{
        ...INCLUDE_USER.include, where: {username}
    }});
}

// 글번호에 대한 트윗을 리턴
export async function getById(id){
    // return db.execute(`${SELECT_JOIN} where tw.id = ? ${ORDER_DESC}`, [id]).then((result)=>{
    //     console.log(result);
    //     return result[0];
    // });
    return Tweet.findOne({where: {id}, ...INCLUDE_USER});
}

// 트윗을 작성
export async function create(text, userId){
    // return db.execute('insert into tweets (text, userId) values(?,?)', [text, userId]).then((result)=>{
    //     console.log(result);
    //     return getById(result[0].insertId);
    // });
    return Tweet.create({text, userId}).then((data)=>this.getById(data.dataValues.id));
}

// 트윗을 변경
export async function update(id, text){
    // return db.execute('update tweets set text = ? where id = ?', [text, id]).then((result)=>{
    //     console.log(result);
    //     return getById(id);
    // });
    return Tweet.findByPk(id, INCLUDE_USER).then((tweet)=>{
        tweet.text = text;
        return tweet.save(); //save 안하면 변견되기 전것이 리턴됨
    })
}

// 트윗 삭제
export async function remove(id){
    // return db.execute('delete from tweets where id = ?', [id]);
    return Tweet.findByPk(id).then((tweet)=>{
        tweet.destroy();
    });
}