import express from 'express';
import bodyParser from 'body-parser';
import path from "path";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.static(path.join(__dirname, '/../dist/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const router_1 = require("./routes/customer.routes");

// 서버에서 클라이언트 열기
app.get('/', function (req, res, next) {
  if(req.path.split('/')[1] === 'static') return next();
  res.sendFile(path.resolve(__dirname + '/../dist/build/index.html'));
  // res.status(200).send(path.resolve(__dirname + '/../dist/build/index.html'));
})

// require('./routes/customer.routes')();

app.listen(PORT, () => {
    console.log(`server is running!\nport = ${PORT}`); 
})

app.use('/api', router_1);