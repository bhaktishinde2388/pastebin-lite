import express from "express";
import { nanoid } from "nanoid";
import Paste from "../models/paste.js";
import getCurrentTime from "../utils/getCurrentTime.js";
import escapeHtml from "escape-html";

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
    const now = getCurrentTime(req);

    const paste = await Paste.findOneAndUpdate(
      {
        pasteId: req.params.id,
        $or: [{ expiresAt: null }, { expiresAt: { $gt: new Date(now) } }],
        $or: [
          { remainingViews: null },
          { remainingViews: { $gt: 0 } }
        ],
      },
      {
        $inc: { remainingViews: -1 }
      },
      { new: true }
    );

    if (!paste) {
      return res.status(404).json({ error: "Paste not found" });
    }

    res.json({
      content: paste.content,
      remaining_views: paste.remainingViews,
      expires_at: paste.expiresAt
        ? paste.expiresAt.toISOString()
        : null,
    });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});




router.get("/p/:id", async (req, res) => {
  try {
    const now = getCurrentTime(req);

    const paste = await Paste.findOneAndUpdate(
      {
        pasteId: req.params.id,
        $or: [{ expiresAt: null }, { expiresAt: { $gt: new Date(now) } }],
        $or: [
          { remainingViews: null },
          { remainingViews: { $gt: 0 } }
        ],
      },
      {
        $inc: { remainingViews: -1 }
      },
      { new: true }
    );

    if (!paste) {
      return res.status(404).send("Not found");
    }

    res.send(`
      <!doctype html>
      <html>
        <head><meta charset="utf-8"></head>
        <body>
          <pre>${escapeHtml(paste.content)}</pre>
        </body>
      </html>
    `);
  } catch {
    res.status(500).send("Server error");
  }
});

export default router;