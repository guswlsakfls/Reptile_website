import express from 'express';
import bodyParser from 'body-parser';
import path from "path";
import cors from 'cors';
import router from '../src/routes/index';
import { db } from './models/db';

db();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
// app.use(express.static('build'));
app.use(express.static(path.join(__dirname, '../../client/public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function (req, res) {
  // res.sendFile(__dirname + '/server/dist/build/index.html');
  res.sendFile(__dirname + '../../client/public/index.html');
})

app.use('/api', (req, res) => res.json({username: 'hyujo'}));
// router();

app.listen(PORT, () => {
    console.log(`server is running!\nport = ${PORT}`); 
})