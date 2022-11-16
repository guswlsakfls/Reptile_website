import Board from "../models/board.mode";

// 새 객체 생성
exports.create = (req: any, res: any) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };
    const board = Board({
      id: req.body.id,
      type: req.body.type,
      title: req.body.title,
      nickName: req.body.nickName,
      date: req.body.date,
      view: req.body.view,
      like: req.body.like,
      text: req.body.text,
    });

    // 데이터베이스에 저장
    Board.create(board, (err: any, data: any) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while creating Board."
            });
        }
        else res.send(data);
    });
};

// 전체 조회 
exports.findAll = (req: any,res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: any; }): void; new(): any; }; }; send: (arg0: any) => void; })=>{
    Board.getAll((err: { message: any; }, data: any) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
          });
        else res.send(data);
      });
};

// id로 조회
exports.findOne = (req: { params: { id: string; }; },res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; }): void; new(): any; }; }; send: (arg0: any) => void; })=>{
    Board.findByID(req.params.id, (err: { kind: string; }, data: any) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Board with id ${req.params.id}.`
            });
          }
          else {
            res.status(500).send({
              message: "Error retrieving Board with id " + req.params.id
            });
          }
        } else res.send(data);
      });
};

// id로 수정
exports.update = (req: { body: { id: number; type: string; title: any; nickName: string; date: string; view: number; like: number; text: string; }; params: { id: string; }; },res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; }): void; new(): any; }; }; send: (arg0: any) => void; })=>{
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Board.updateByID(
    req.params.id,
    Board(req.body),
    (err: { kind: string; }, data: any) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Board with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Board with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// id로 삭제
exports.delete = (req: { params: { id: number; }; },res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; }): void; new(): any; }; }; send: (arg0: { message: string; }) => void; })=>{
    Board.remove(req.params.id, (err: { kind: string; }, data: any) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Board with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Board with id " + req.params.id
            });
          }
        } else res.send({ message: `Board was deleted successfully!` });
      });
};

// 전체 삭제
exports.deleteAll = (req: any,res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: any; }): void; new(): any; }; }; send: (arg0: { message: string; }) => void; })=>{
    Board.removeAll((err: { message: any; }, data: any) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all customers."
          });
        else res.send({ message: `All Customers were deleted successfully!` });
      });
};