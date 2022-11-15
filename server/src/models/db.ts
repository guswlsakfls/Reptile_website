import mysql from "mysql";
import { dbConfig } from "../config/db.config";

const db = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: 3306,
    dateStrings: dbConfig.date
});

db.connect(err => {
    if (err) throw err;
    console.log("Successfully connected to the database.");
});

// sql.end();

export default db;