import db  from './db';
import mysql from 'mysql';

const Comment = (Comment: {
    id: number; img: string; nickname: string; date: string;
    like: number; text: string; }) => {
        const id = Comment.id;
        const img = Comment.img;
        const nickname = Comment.nickname;
        const date = Comment.date;
        const like = Comment.like;
        const text = Comment.text;
        return ({id, img, nickname, date, like, text})
}

Comment.create = (newComment: any, q: {table: String}, result: any) => {
    let sql = "";
    const table = {
        freeBoard: "INSERT INTO korep.free_Comment SET ?",
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

    db.query(sql, newComment, (err: any, res) => {
        if (err) {
            console.log("err: ", err);
            result(err, null);
            return ;
        }
        console.log("Created comment: ", {id:res.insertId, ...newComment});
        console.log('newComment');
        result(null, res);
    });
}

// Comment 전체 조회 table, commentPage, no, limit
Comment.findCommentList = (q: any, result: any) => {
    console.log('comment: ', q);

    // offest 페이지네이션 구현
    const offset = (q.commentPage - 1) * q.commentLimit;
    const limit = parseInt(q.commentLimit);
    const sqlParams = [q.no, offset, limit];
    let sql = q.table;
    const table = {
        freeBoard: "SELECT * FROM korep.free_comment where b_id=? order by id desc limit ?, ?; ",
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
        console.log("Comment: ", res[0], res[1]); // 서버 콘솔에 조회결과 출력
        result(null, res);
    })
}

// Board 총 list 숫자 조회
const getListCount = (q: any) => {
    let sql = q.table;
    const table = {
        freeBoard: "SELECT count(*) as count FROM korep.free_comment where b_id=?; ",
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
    return mysql.format(sql, [q.no]);
}

export default Comment;
