import db  from './db';
import mysql from 'mysql';

const Board = (Board: {
    id: number; type: string; title: string;
    nickname: string; date: string; view: number;
    hit: number; text: string; }) => {
        const id = Board.id;
        const type = Board.type;
        const title = Board.title;
        const nickname = Board.nickname;
        const date = Board.date;
        const view = Board.view;
        const hit = Board.hit;
        const text = Board.text;
        return ({id, type, nickname, date, view, hit, title, text})
}

// Board 튜플 추가
Board.create = (newBoard: any, q: {table: String}, result: any) => {
    let sql = "";
    const table = {
        freeBoard: "INSERT INTO korep.free_board SET ?",
        // qnaBoard: 'SELECT count(*) as count FROM korep.qna_board',
    }

    // 게시판 유형에 따라 다른 쿼리문 실행
    if (q.table === 'free-board') {
        sql = table.freeBoard;
    }
    else if (q.table === 'notice') {
        sql = 'notice';
    }
    else if (q.table === 'qna') {
        sql = 'qna';
    }

    db.query(sql, newBoard, (err: any, res) => {
        if (err) {
            console.log("err: ", err);
            result(err, null);
            return ;
        }
        console.log("Created freeBoard: ", {id:res.insertId, ...newBoard});
        console.log('newFreeBoard');
        result(null, res);
    });
};

// Board 전체 조회
Board.getList = (q: any, result: any) => {
    // offest 페이지네이션 구현
    const offset = (q.page - 1) * q.limit;
    const limit = parseInt(q.limit);
    const sqlParams = [offset, limit];
    let sql = q.table;
    const table = {
        freeBoard: "SELECT * FROM korep.free_board order by id desc limit ?, ?; ",
        // qnaBoard: 'SELECT * FROM korep.qna_board order by id desc limit ?, ?',
    }
    let sqls = "";

    // 게시판 유형에 따라 다른 쿼리문 실행
    if (q.table === 'free-board') {
        sql = table.freeBoard;
    }
    else if (q.table === 'notice') {
        sql = 'notice';
    }
    else if (q.table === 'qna') {
        sql = 'qna';
    }

    sqls += mysql.format(sql, sqlParams);
    sqls += getListCount(q); // 리스트 count 조회

    db.query(sqls, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return ;
        }
        console.log("Board: ", res[0], res[1]); // 서버 콘솔에 조회결과 출력
        result(null, res);
    })
}

// Board 총 list 숫자 조회
const getListCount = (q: any) => {
    let sql = q.table;
    const table = {
        freeBoard: "SELECT count(*) as count FROM korep.free_board; ",
        // qnaBoard: 'SELECT count(*) as count FROM korep.qna_board',
    }

    // 게시판 유형에 따라 다른 쿼리문 실행
    if (q.table === 'free-board') {
        sql = table.freeBoard;
    }
    else if (q.table === 'notice') {
        sql = 'notice';
    }
    else if (q.table === 'qna') {
        sql = 'qna';
    }
    return mysql.format(sql, []);
}

// Board id로 조회
Board.findBoardByID = (q: any, result: any) => {
    const table = {
        freeBoard: "SELECT * FROM korep.free_board WHERE id = ?; ",
        // freeBoard: "SELECT * FROM ? WHERE id = ?",
    }
    let sql = q.table;
    const sqlParams = q.no;
    let sqls = "";
    
    
    // 게시판 유형에 따라 다른 쿼리문 실행
    if (q.table === 'free-board') {
        sql = table.freeBoard;
    } else if (q.table === 'notice') {
        sql = 'notice';
    } else if (q.table === 'qna') {
        sql = 'qna';
    }

    sqls += mysql.format(sql, sqlParams);
    
    db.query(sqls, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return ;
        }

        console.log(res);

        result(null, res);
    });
};

// Board 조회수 증가
Board.increaseView = (q: any, result: any) => {
    const table = {
        freeBoard: "UPDATE korep.free_board SET view = view + 1 WHERE id = ?",
    }
    let sql = q.table;
    const sqlParams = q.no;

    // 게시판 유형에 따라 다른 쿼리문 실행
    if (q.table === 'free-board') {
        sql = table.freeBoard;
    } else if (q.table === 'notice') {
        sql = 'notice';
    } else if (q.table === 'qna') {
        sql = 'qna';
    }
    db.query(sql, sqlParams, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return ;
        }
        result(null, res[0]);
    });
};

// Board id로 수정
Board.updateByID = (q: any, Board: any, result: any) => {
    const table = {
        freeBoard: "UPDATE korep.free_board SET type = ? ,title = ?, text = ? WHERE id = ?",
    }
    let sql = table.freeBoard;
    
    // 게시판 유형에 따라 다른 쿼리문 실행
    if (q.table === 'free-board') {
        sql = table.freeBoard;
    }
    else if (q.table === 'notice') {
        sql = 'notice';
    }
    else if (q.table === 'qna') {
        sql = 'qna';
    }

    db.query(sql, [Board.type, Board.title, Board.text, q.no], (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        else if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return ;
        }
        console.log("update Board: ", {id:q.no, ...Board});
        result(null, {id:q.no, ...Board});
    });
};



// Board id 로 삭제
Board.remove = (q: any, result: any) => {
    const table = {
        freeBoard: "DELETE FROM korep.free_board WHERE id = ?",
    }
    let sql = table.freeBoard;
    
    // 게시판 유형에 따라 다른 쿼리문 실행
    if (q.table === 'free-board') {
        sql = table.freeBoard;
    }
    else if (q.table === 'notice') {
        sql = 'notice';
    }
    else if (q.table === 'qna') {
        sql = 'qna';
    }

    db.query(sql, q.no, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return ;
        }
        console.log("deleted Board with id: ", q.no);
        result(null, res);
    });
};

// // Board 전체 삭제
// Board.removeAll = (result: any) => {
//     db.query('DELETE FROM freeBoard', (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null)
//             return ;
//         }
//         if (res.affectedRows == 0) {
//             result({kind: "not_found"}, null);
//             return ;
//         }
//         console.log(`deleted ${res.affectedRows} freeBoard`);
//         result(null, res);
//     });
// };

export default Board;