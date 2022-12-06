import Comment from "../models/comment.mode";

// 새 객체 생성
exports.create = (req: any, res: any) => {
  if (!req.body) {
      res.status(400).send({
          message: "Content can not be empty!"
      });
  };

  const data = req.body.commentData;
  const comment = Comment({
    b_id: data.b_id,
    p_id: data.p_id,
    m_id: data.m_id,
    date: data.date,
    hit: data.hit,
    text: data.text,
    nick_tag: data.nick_tag,
  });
  // 데이터베이스에 저장
  Comment.create(comment, req.body.params,(err: any, data: any) => {
      if (err) {
          res.status(500).send({
              message: err.message || "Some error occured while creating Comment."
          });
      }
      else res.send(data);
  });
};

// 댓글 조회 
exports.findList = (req: any,res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: any; }): void; new(): any; }; }; send: (arg0: any) => void; })=>{
    // 댓글 조회
    Comment.findCommentList(req.query, (err: { kind: string; }, data: any) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found Comment with table, page, no ${req.query}.`
                });
                return ;
            }
            else {
                res.status(500).send({
                message: "Error retrieving Comment with table, page, no " + req.query
                });
                return ;
            }
            }
            else {
                console.log("send: ", data);
                res.send(data);
                return ;
        }
    });
};

// id로 게시글 조회
exports.findOne = (req: {query: any},res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; }): void; new(): any; }; }; send: (arg0: any) => void; })=>{
    // 댓글 조회
    Comment.findCommentById(req.query, (err: { kind: string; }, data: any) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found Comment with table, page, no ${req.query}.`
                });
                return ;
            }
            else {
                res.status(500).send({
                message: "Error retrieving Comment with table, page, no " + req.query
                });
                return ;
            }
            }
            else {
                console.log("send: ", data);
                res.send(data);
                return ;
        }
    });
}


// id로 게시글 수정
exports.update = (req: {body: {params: any ,comment: string}}, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; }): void; new(): any; }; }; send: (arg0: any) => void; })=>{
  console.log(req.body);
  
  // Validate Request
  if (!req.body.comment) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Comment.updateById(req.body, (err: { kind: string; }, data: any) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Comment with id ${req.body.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Comment with id " + req.body.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// id로 게시글 삭제
exports.delete = (req: {query: any},res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; }): void; new(): any; }; }; send: (arg0: { message: string; }) => void; })=>{
  Comment.remove(req.query, (err: { kind: string; }, data: any) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Comment with id ${req.query.no}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Comment with id " + req.query.no
          });
        }
      } else res.send({ message: `Comment was deleted successfully!` });
    });
};

// // 전체 삭제(필요 없을듯)
// exports.deleteAll = (req: any,res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: any; }): void; new(): any; }; }; send: (arg0: { message: string; }) => void; })=>{
//     Comment.removeAll((err: { message: any; }, data: any) => {
//         if (err)
//           res.status(500).send({
//             message:
//               err.message || "Some error occurred while removing all customers."
//           });
//         else res.send({ message: `All Customers were deleted successfully!` });
//       });
// };