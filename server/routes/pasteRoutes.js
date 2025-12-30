import express from "express";
import { nanoid } from "nanoid";
import Paste from "../models/Paste.js";
import getCurrentTime from "../utils/getCurrentTime.js";

const router = express.Router();

export default router;