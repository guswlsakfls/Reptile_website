import mysql from "mysql";
import { dbConfig } from "../config/db.config";
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.RDS_HOST,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
    // port: process.env.RDS_PORT,
    // host: dbConfig.HOST,
    // user: dbConfig.USER,
    // password: dbConfig.PASSWORD,
    // database: dbConfig.DB,
    port: 3306,
    dateStrings: dbConfig.date,
    multipleStatements: dbConfig.multipleStatements
});

db.connect(err => {
    if (err) throw err;
    console.log("Successfully connected to the database.");
});

// sql.end();

export default db;