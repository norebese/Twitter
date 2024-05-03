import express from 'express';
import * as authController from '../controller/auth.js';
import {body} from 'express-validator';
import {validate} from '../middleware/validator.js';
import {isAuth} from '../middleware/auth.js';

const router = express.Router();

const validateLogin = [
    body('username').trim().notEmpty().withMessage('username을 입력하세요'),
    body('password').trim().isLength({min:4}).withMessage('password는 최소 4자 이상 입력하세요'), 
    validate
]

const validateSignup = [
    ... validateLogin,
    body('name').trim().notEmpty().withMessage('name 을 입력하세요'),
    body('email').trim().isEmail().withMessage('이메일 형식 확인하세요'),
    body('url').isURL().withMessage('url 형식 확인하세요'), validate
]

//회원가입
//POST
router.post('/signup', validateSignup ,authController.signup);

//로그인
//POST
router.post('/login', validateLogin, authController.login);

router.get('/me', isAuth, authController.me);

export default router;