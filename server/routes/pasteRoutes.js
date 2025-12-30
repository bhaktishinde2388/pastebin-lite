import express from "express";
import { nanoid } from "nanoid";
import Paste from "../models/Paste.js";
import getCurrentTime from "../utils/getCurrentTime.js";

const router = express.Router();
// ..................health chek api
router.get("/healthz", async (req, res) => {
  try {
    await Paste.findOne();
    res.status(200).json({ ok: true });
  } catch {
    res.status(500).json({ ok: false });
  }
});

export default router;