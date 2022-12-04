const board = require("../controller/board.controller");
const express = require('express');
const router = express.Router();

// 튜플 생성
router.post("/write", board.create);

// 전체 게시글 리스트 조회
router.get("/list", board.findList);

// id로 해당 게시글 조회
router.get("/view", board.findOne);

// id로 수정
router.put("/write", board.update);

// id로 삭제
router.delete("/view", board.delete);

// 전체 삭제
// router.delete("/board", board.deleteAll);

module.exports = router