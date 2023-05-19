import express from "express";
const router = express.Router();
import Joi from "joi";

router.post("/create-contact", async (req, res) => {});
router.post("/star-contact", async (req, res) => {});
router.post("/archive-contact", async (req, res) => {});
router.post("/block-contact", async (req, res) => {});

router.put("/update-contact", async (req, res) => {});
router.delete("/delete-contact", async (req, res) => {});
router.get("/load-contacts", async (req, res) => {});

module.exports = router;
