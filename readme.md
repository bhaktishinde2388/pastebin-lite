# Pastebin-Lite

A lightweight Pastebin-like application that allows users to create and share text pastes with optional **time-based expiration (TTL)** and **view-count limits**.

This project was built as part of a take-home assignment and is designed to pass automated functional tests against a deployed environment.

## 🚀 Live Deployment

- **Frontend:** https://pastebin-lite-ui.onrender.com  
- **Backend API:** https://pastebin-lite-backend-9oih.onrender.com  

## ✨ Features

- Create text pastes
- Receive a shareable URL
- View pastes via API or browser
- Optional expiration using TTL (seconds)
- Optional maximum view count
- Atomic view counting (no negative views)
- Safe HTML rendering (XSS-safe)
- Deterministic time support for automated testing
- Persistent storage across requests

## 🧱 Tech Stack

**Frontend**
- React
- Axios

**Backend**
- Node.js
- Express
- MongoDB
- Mongoose

**Deployment**
- Render (backend & frontend)

## 🔌 API Endpoints

### Health Check

