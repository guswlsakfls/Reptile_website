import mysql from "mysql";
import { dbConfig } from "../config/db.config";

export function db() {
    var sql = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: 3306
    });

    sql.connect(err => {
        if (err) throw err;
        console.log("Successfully connected to the database.");
    });

    sql.query('show tables', (err: any, res:any) => {
        if (err) {
            console.log(err);
        }
        console.log(res);
    });

    sql.end();
};