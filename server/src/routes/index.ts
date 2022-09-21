import express from "express";

const router = express();

router.get('/test', (req, res) => {
    res.send({ test: "this is test!!" });
})

export default router;