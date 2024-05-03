import * as authRepository from '../data/auth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {config} from '../config.js';

const secretKey = config.jwt.secretKey;
const jwtExpiresInDays = config.jwt.expiresInSec;
const bcryptSaltRounds = config.bcrypt.saltRounds;

// async function makeToken(id){ //토큰을 만들어주는 함수 만듬
//     const token = jsonwebtoken.sign({
//         id: id,
//         isAdmin: false
//     }, secret, {expiresIn: '1h'})
//     return token;
// }

function createJwtToken(id){ //토큰을 만들어주는 함수 만듬
    return jwt.sign({id}, secretKey, {expiresIn: jwtExpiresInDays});
}

//회원을 생성하는 함수
export async function signup(req,res,next){
    const {username, password, name, email, url} = req.body;
    const found = await authRepository.findByUsername(username);
    if(found){
        return res.status(409).json({message: `${username}이 이미 있습니다`})
    }
    const hashed = await bcrypt.hash(password, bcryptSaltRounds); //비밀번호 암호화
    const userId = await authRepository.createUser({username, hashed, name, email, url});
    const token = createJwtToken(userId);
    res.status(201).json({token, username});

};

export async function login(req,res,next){
    const {username, password} = req.body;
    // const user = await authRepository.login(username);
    const user = await authRepository.findByUsername(username);
    if(!user){
        return res.status(401).json({message: `아이디를 찾을 수 없음`});
    }
    const isValidpassword = await bcrypt.compareSync(password, user.password);
    if(!isValidpassword){
        return res.status(401).json({message: `비밀번호가 틀렸음`});
    }
    const token = createJwtToken(user.id); //로그인 되면 토큰 발생
    res.status(200).json({token, user});
}

// export async function verify(req,res,next){ //로그인한 흔적 있는지 확인용
//     const token = req.headers['token'];
//     console.log(token)
//     if(token){
//         res.status(200).json(token);
//     }else {
//         res.status(401).json({message: '토큰이 전송되지 않았습니다.'});
//     }
// }

export async function me(req,res,next){
    const user = await authRepository.findById(req.userId);
    if(!user){
        return res.status(404).json({message: `일치하는 사용자가 없음`});
    }
    
    res.status(200).json({token: req.token, username: user.username});
    // postman에서 "token": req.token이 오지 않는 이유는 req.token이 어디서 오는지 명시되어 있지 않아서임, 이 경우 서버에서는 req.headers.authorization을 통해 토큰을 가져올 수 있다.
}