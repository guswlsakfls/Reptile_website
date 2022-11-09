const customer = require("../controller/customer.controller");
const express = require('express');
const router = express.Router();

// 튜플 생성
router.post("/customer", customer.create);

// 전체 조회
router.get("/customer", customer.findAll);

// id로 조회
router.get("/customer/:customerId", customer.findOne);

// id로 수정
router.put("/customer/:customerId", customer.update);

// id로 삭제
router.delete("/customer/:customerId", customer.delete);

// 전체 삭제
router.delete("/customer", customer.deleteAll);

module.exports = router