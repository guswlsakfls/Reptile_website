import db  from './db';
import mysql from 'mysql';

const Comment = (Comment: {
    b_id: number; p_id: number; m_id: number;
    date: string; hit: number; text: string;
    nick_tag: string }) => {
        const b_id = Comment.b_id;
        const p_id = Comment.p_id;
        const m_id = Comment.m_id;
        const date = Comment.date;
        const hit = Comment.hit;
        const text = Comment.text;
        const nick_tag = Comment.nick_tag;
        return ({b_id, p_id, m_id, date, hit, text, nick_tag})
    }

Comment.create = (newComment: any, q: {table: String}, result: any) => {

    console.log("creat: ", newComment);

    let sql = "";
    const table = {
        freeComment: "INSERT INTO korep.free_comment SET ?",
        // qnaBoard: 'SELECT count(*) as count FROM korep.qna_board',
    }

    // 게시판 유형에 따라 다른 쿼리문 실행
    if (q.table === 'free-board') {
        sql = table.freeComment;
    }
    else if (q.table === 'notice') {
        sql = 'notice';
    }
    else if (q.table === 'qna') {
        sql = 'qna';
    }

    console.log(q.table)
    console.log(sql)

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
    // offest 페이지네이션 구현
    const offset = (q.commentPage - 1) * q.commentLimit;
    const limit = parseInt(q.commentLimit);

    // const sqlParams = [q.no, p_id, id, p_id, id];
    const sqlParams = [q.no, offset, limit];
    let sql = q.table;
    const table = {
        freeComment: "SELECT id, p_id, m_id, hit, date, text, nick_tag FROM korep.free_comment WHERE b_id = ? ORDER BY IF(ISNULL(p_id), id, p_id), id limit ?, ?; ",
        // qnaBoard: 'SELECT * FROM korep.qna_board order by id desc limit ?, ?',
    }
    let sqls = "";

    // 게시판 유형에 따라 다른 쿼리문 실행
    if (q.table === 'free-board') {
        sql = table.freeComment;
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
        console.log("Comment: ", res[0]); // 서버 콘솔에 조회결과 출력
        console.log("Comment_count: ", res[1]); // 서버 콘솔에 조회결과 출력
        result(null, res);
    })
}

// Comment 총 list 숫자 조회
const getListCount = (q: any) => {
    let sql = q.table;
    const table = {
        freeComment: "SELECT count(*) as count FROM korep.free_comment where b_id=?; ",
        // qnaBoard: 'SELECT count(*) as count FROM korep.qna_board',
    }

    // 게시판 유형에 따라 다른 쿼리문 실행
    if (q.table === 'free-board') {
        sql = table.freeComment;
    }
    else if (q.table === 'notice') {
        sql = 'notice';
    }
    else if (q.table === 'qna') {
        sql = 'qna';
    }
    return mysql.format(sql, [q.no]);
}

// Comment id로 조회
Comment.findCommentById = (q: any, result: any) => {


    db.query(`SELECT * FROM korep.free_comment WHERE id = ${q.id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return ;
        }
        if (res.length) {
            console.log("found comment: ", res[0]);
            result(null, res[0]);
            return ;
        }
        result({kind: "not_found"}, null);
    });
}

// Comment 수정
Comment.updateById = (q: any, result: any) => {
    db.query("UPDATE korep.free_comment SET text = ? WHERE id = ?", [q.comment, q.params.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return ;
        }
        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return ;
        }
        console.log("updated comment: ", q.params.id, q.comment);
        result(null, q.id, q.text);
    });
}

// Comment id로 삭제
Comment.remove = (q: any, result: any) => {
    console.log(q);

    let sql = q.table;
    const table = {
        freeComment: "DELETE FROM korep.free_comment WHERE id = ? OR p_id = ?",
        // qnaBoard: 'SELECT count(*) as count FROM korep.qna_board',
    }

    // 게시판 유형에 따라 다른 쿼리문 실행
    if (q.table === 'free-board') {
        sql = table.freeComment;
    }
    else if (q.table === 'notice') {
        sql = 'notice';
    }
    else if (q.table === 'qna') {
        sql = 'qna';
    }

    db.query(sql, [q.id, q.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return ;
        }
        if (res.affectedRows == 0) {
            // not found Comment with the id
            result({ kind: "not_found" }, null);
            return ;
        }
        console.log("deleted comment with id: ", q.id);
        result(null, res);
    });
}

export default Comment;
