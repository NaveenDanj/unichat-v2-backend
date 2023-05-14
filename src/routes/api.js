import express from "express";
const router = express.Router();

router.get('/' , async(req , res) => {
    return res.status(200).json({
        message : "Unichat-v2 api"
    })
});

export default router;