import express from 'express';
import * as authController from '../controller/auth.js';
import {body} from 'express-validator';
import {validate} from '../middleware/validator.js';

const router = express.Router();

const validateSignup = [
    body('username').trim().isLength({min:3}).withMessage('최소 3자 이상 입력'),
    body('password').trim().isLength({min:4}).withMessage('최소 4자 이상 입력'),
    body('email').trim().isEmail().withMessage('이메일 형식 확인하세요'), validate
]

//회원가입
//POST
router.post('/signup', validateSignup ,authController.signup);

//로그인
//POST
router.post('/:id', authController.loginUser);

export default router;