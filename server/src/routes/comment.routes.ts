const comment = require("../controller/comment.controller");
import express from 'express';
const router = express.Router();

// 튜플 생성
router.post("/write", comment.create);

// 전체 게시글 리스트 조회
router.get("/list", comment.findList);

// id로 해당 게시글 조회
router.get("/view", comment.findOne);

// id로 수정
router.put("/write", comment.update);

// id로 삭제
router.delete("/view", comment.delete);

// 전체 삭제
// router.delete("/", comment.deleteAll);

module.exports = router