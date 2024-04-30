import * as authRepository from '../data/auth.js';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

const secret = 'abcdefg1234%^&*';

async function makeToken(id){ //토큰을 만들어주는 함수 만듬
    const token = jsonwebtoken.sign({
        id: id,
        isAdmin: false
    }, secret, {expiresIn: '1h'})
    return token;
}

//회원을 생성하는 함수
export async function signup(req,res,next){
    const {username, password, name, email} = req.body;
    const hashed = bcrypt.hashSync(password, 10); //비밀번호 암호화
    const users = await authRepository.createUser(username, hashed, name, email);
    if(users){
        res.status(201).json(users);
    }
};

export async function login(req,res,next){
    const {username, password} = req.body;
    const user = await authRepository.login(username);
    if(user){
        if(bcrypt.compareSync(password, user.password)){
            res.status(201).header('Token', makeToken(username)).json(`${username} 로그인 완료`);
        }else{
            res.status(404).json({message: `${username}님 아이디 또는 비밀번호 확인하세요`})
        }
    }else{
        res.status(404).json({message:`${username}님 아이디 또는 비밀번호 확인`});
    }
}

export async function verify(req,res,next){ //로그인한 흔적 있는지 확인용
    const token = req.header['Token'];
    if(token){
        res.status(200).json(token);
    }
}