import express from "express";
import { nanoid } from "nanoid";
import Paste from "../models/paste.js";
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
      url: `https://pastebin-lite-ui.onrender.com/p/${pasteId}`
    });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});
// paste by id............
router.get("/pastes/:id", async (req, res) => {
  try {
    const paste = await Paste.findOne({ pasteId: req.params.id });

    if (!paste) {
      return res.status(404).json({ error: "Paste not found" });
    }

    const now = getCurrentTime(req);

    if (paste.expiresAt && now > paste.expiresAt) {
      return res.status(404).json({ error: "Paste expired" });
    }

    if (paste.remainingViews !== null) {
      if (paste.remainingViews <= 0) {
        return res.status(404).json({ error: "View limit exceeded" });
      }
      paste.remainingViews -= 1;
      await paste.save();
    }

    res.json({
      content: paste.content,
      remaining_views: paste.remainingViews,
      expires_at: paste.expiresAt,
    });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});



export default router;