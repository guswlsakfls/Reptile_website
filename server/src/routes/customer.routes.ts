

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
router.put("/customer/customerId", customer.update);

// id로 삭제
router.delete("/customer/:customerId", customer.delete);

// 전체 삭제
router.delete("/customer", customer.deleteAll);

// router.use(function(req: any, res: any, next: any) {
//     next();
// });

// router.get('/', function(req: any, res: any) {
//     res.send('hi1');
// })

// router.get('/about', function(req: any, res: any) {
//     res.send('hi2');
// });

module.exports = router