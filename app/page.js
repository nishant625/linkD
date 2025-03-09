"use client"

import { useState } from "react";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");

  const handleDownload = () => {
    if (!videoUrl) {
      alert("Please enter a valid video URL");
      return;
    }
    window.location.href = `/api/file?url=${encodeURIComponent(videoUrl)}`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>iOS Video Downloader</h1>
      <input
        type="text"
        placeholder="Enter video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginRight: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={handleDownload}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Download Video
      </button>
    </div>
  );
}
