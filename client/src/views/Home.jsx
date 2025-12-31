import { useState } from "react";
import axios from "axios";
import "./Home.css";

export default function Home() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        content,
        ttl_seconds: ttl ? Number(ttl) : undefined,
        max_views: maxViews ? Number(maxViews) : undefined,
      };

      const res = await axios.post(
        "https://pastebin-lite-backend-9oih.onrender.com/api/pastes",
        payload
      );

      setUrl(res.data.url);
      setContent("");
      setTtl("");
      setMaxViews("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create paste");
    }
  };

  return (
    <div className="home-wrapper">
      <div className="home-card">
        <h1 className="home-title">Create Paste</h1>

        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter paste content"
            required
          />

          <input
            type="number"
            min="1"
            placeholder="TTL in seconds"
            value={ttl}
            onChange={(e) => setTtl(e.target.value)}
          />

          <input
            type="number"
            min="1"
            placeholder="Max views"
            value={maxViews}
            onChange={(e) => setMaxViews(e.target.value)}
          />

          <button type="submit">Create</button>
        </form>

        {error && <p className="error-message">{error}</p>}

        {url && (
          <p className="url-message">
            Shareable URL:{" "}
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
