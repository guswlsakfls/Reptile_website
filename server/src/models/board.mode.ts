import db  from './db';

const Board = (Board: {
    id: number; type: string; title: string;
    nickName: string; date: string; view: number;
    like: number; text: string;
    }) => {
        const id = Board.id;
        const type = Board.type;
        const title = Board.title;
        const nickName = Board.nickName;
        const date = Board.date;
        const view = Board.view;
        const like = Board.like;
        const text = Board.text;
        return ({id, type, nickName, date, view, like, title, text})
}

// Board 튜플 추가
Board.create = (newBoard: any, result: any) => {
    db.query("INSERT INTO korep.free_board SET ?", newBoard, (err: any, res) => {
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

// Board id로 조회
Board.findByID = (id: any, result: any) => {
    db.query('SELECT * FROM korep.free_board WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return ;
        }

        result(null, res[0]);
    });
};

// Board 전체 조회
Board.getAll = (result: any) => {
    db.query('SELECT * FROM korep.free_board', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return ;
        }
        console.log("Board: ", res);
        result(null, res);
    })
}

// Board id로 수정
Board.updateByID = (id: any, Board: any, result: any) => {
    db.query('UPDATE korep.free_board SET id = ?, type = ? ,title = ?, text = ? WHERE id = ?', 
    [id, Board.type, Board.title, Board.text, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return ;
        }
        console.log("update Board: ", {id:id, ...Board});
        result(null, {id:id, ...Board});
    });
};

// Board id 로 삭제
Board.remove = (id: any, result: any) => {
    db.query('DELETE FROM korep.free_board WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return ;
        }
        console.log("deleted Board with id: ", id);
        result(null, res);
    });
};

// Board 전체 삭제
Board.removeAll = (result: any) => {
    db.query('DELETE FROM freeBoard', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null)
            return ;
        }
        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return ;
        }
        console.log(`deleted ${res.affectedRows} freeBoard`);
        result(null, res);
    });
};

export default Board;