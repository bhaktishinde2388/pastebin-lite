import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewPaste() {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`https://pastebin-lite-backend-9oih.onrender.com/api/pastes/${id}`)
      .then(res => setPaste(res.data))
      .catch(err => setError(err.response?.data?.error || "Error"));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!paste) return <p>Loading...</p>;

  return (
    <div>
      <h1>Paste Content</h1>
      <pre>{paste.content}</pre>
      {paste.remaining_views !== null && <p>Remaining Views: {paste.remaining_views}</p>}
    </div>
  );
}
