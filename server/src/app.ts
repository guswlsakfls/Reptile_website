import express from 'express';
import bodyParser from 'body-parser';
import path from "path";
import cors from 'cors';
// import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 5000;

const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, '/../dist/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const router_board = require("./routes/board.routes");

// 서버에서 클라이언트 열기
app.get('/', function (req, res, next) {
  if(req.path.split('/')[1] === 'static') return next();
  res.sendFile(path.resolve(__dirname + '/../dist/build/index.html'));
})

app.listen(PORT, () => {
    console.log(`server is running!\nport = ${PORT}`); 
})

// 서버 확인용 로그
console.log("korep 시작")

app.use('/', router_board);