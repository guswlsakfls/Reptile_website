require('dotenv').config();

export const dbConfig = {
    HOST: "0.0.0.0",
    USER: "root",
    PASSWORD: "111111",
    DB: "repko",
    date: true, // 날짜 형식을 문자열로 변환
    multipleStatements: true // 다중 쿼리 사용
}