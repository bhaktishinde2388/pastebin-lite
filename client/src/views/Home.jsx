import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("https://pastebin-lite-backend-9oih.onrender.com/api/pastes", { content });
    setUrl(res.data.url);
  };

  return (
    <div>
      <h1>Create Paste</h1>
      <form onSubmit={handleSubmit}>
        <textarea value={content} onChange={e => setContent(e.target.value)} />
        <button type="submit">Create</button>
      </form>
      {url && <p>Shareable URL: <a href={url}>{url}</a></p>}
    </div>
  );
}
