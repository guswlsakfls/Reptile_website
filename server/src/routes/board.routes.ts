const board = require("../controller/board.controller");
const express = require('express');
const router = express.Router();

// 전체 게시글 리스트 조회
router.get("/board/list", board.findAll);

// id로 해당 게시글 조회
router.get("/board/view", board.findOne);

// id로 삭제
router.delete("/board/view", board.delete);

// 튜플 생성
router.post("/board/write", board.create);

// id로 수정
router.put("/board/write", board.update);

// 전체 삭제
// router.delete("/board", board.deleteAll);

module.exports = router