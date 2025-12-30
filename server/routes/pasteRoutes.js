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

// ......paste api
router.post("/pastes", async (req, res) => {
  try {
    const { content, ttl_seconds, max_views } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({ error: "Content is required" });
    }

    if (ttl_seconds && ttl_seconds < 1) {
      return res.status(400).json({ error: "Invalid TTL" });
    }

    if (max_views && max_views < 1) {
      return res.status(400).json({ error: "Invalid max views" });
    }

    const pasteId = nanoid(8);
    const now = new Date();

    const expiresAt = ttl_seconds
      ? new Date(now.getTime() + ttl_seconds * 1000)
      : null;

    const paste = new Paste({
      pasteId,
      content,
      expiresAt,
      remainingViews: max_views || null,
    });

    await paste.save();

    res.status(201).json({
      id: pasteId,
      url: `http://localhost:5173/p/${pasteId}`,
    });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});


export default router;