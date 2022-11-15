const board = require("../controller/board.controller");
const express = require('express');
const router = express.Router();

// 튜플 생성
router.post("/board/write", board.create);

// 전체 조회
router.get("/board", board.findAll);

// id로 조회
router.get("/board/:boardId", board.findOne);

// id로 수정
router.put("/board/:boardId", board.update);

// id로 삭제
router.delete("/board/:boardId", board.delete);

// 전체 삭제
router.delete("/board", board.deleteAll);

module.exports = router