import express from 'express';
import morgan from 'morgan';
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';
import {config} from './config.js';
// import {db} from './db/database.js';
// import {sequelize} from './db/database.js';
import {connectDB} from './db/database.js';
import {initSocket} from "./connection/socket.js"

import path from 'path';

const app = express();

app.use(express.json());
app.use(morgan("dev"));

//현재 모듈의 URL을 가져와 디렉토리 경로를 추출합니다.
const __dirname = path.dirname(new URL(import.meta.url).pathname);
console.log("__dirname:", __dirname);
// 정적 파일 제공 설정
const publicPath = path.join(__dirname, 'public');
// console.log("publicPath:", publicPath);
app.use(express.static(publicPath));

// 루트 경로에 대한 요청이 오면 testHTML.html 파일을 보냅니다.
app.get('/', (req, res) => {
    const filePath = path.resolve('public', 'testHTML.html');
    // console.log("filePath:", filePath);
    res.sendFile(filePath);
});


app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);

// app.use('/test',(req, res)=>{
//     console.log('test html 출력')
//     res.status(200).sendFile(publicPath)
// })

app.use((req,res, next)=>{
    res.sendStatus(404);
});

// DB 연결 테스트
// db.getConnection().then(connection => console.log(connection));

// DB 연결 테스트
// sequelize.sync().then(()=>{
//     app.listen(config.host.port);
// });


// DB 연결 테스트
connectDB().then((db)=>{
    // console.log('몽구스를 사용하여 몽고디비에 접속 성공!')
    // app.listen(config.host.port);
    const server = app.listen(config.host.port);
    initSocket(server);
}).catch(console.error);


// app.listen(config.host.port);
