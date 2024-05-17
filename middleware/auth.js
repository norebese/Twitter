import jwt, { decode } from 'jsonwebtoken';
import * as authRepository from '../data/auth.js';

const AUTH_ERROR = {message: "인증에러"};

export const isAuth = async (req,res,next)=>{
    const authHeader = req.get('Authorization');
    console.log(authHeader);

    if(!(authHeader && authHeader.startsWith('Bearer '))){
        console.log('에러1');
        return res.status(401).json(AUTH_ERROR);
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(
        token, 'abcdefg1234%^&*', async(error, decoded)=>{
            if(error){
                console.log('에러2');
                return res.status(401).json(AUTH_ERROR);
            }
            console.log('decoded.id :', decoded)
            const user = await authRepository.findById(decoded.id);
            console.log(decoded)
            if(!user){
                console.log('에러3');
                return res.status(401).json(AUTH_ERROR);
            }
            req.userId = user.id;
            next();
        }
    )
}