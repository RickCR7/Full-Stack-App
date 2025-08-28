"use client";
import React, { useState } from "react";
import { useNotification } from "./Notification";

function VideoUploadForm() {
  const { showNotification } = useNotification();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!title || !description || !videoUrl || !thumbnailUrl) {
      showNotification("Please fill all fields", "warning");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          videoUrl,
          thumbnailurl: thumbnailUrl,
        }),
      });

      if (res.ok) {
        showNotification("Video uploaded successfully!", "success");
        setTitle("");
        setDescription("");
        setVideoUrl("");
        setThumbnailUrl("");
      } else {
        const data = await res.json();
        showNotification(data.error || "Upload failed", "error");
      }
    } catch {
      showNotification("Network error", "error");
    }
    setLoading(false);
  };

  return (
    <form
      className="w-full max-w-lg mx-auto bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/40 flex flex-col gap-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-indigo-900 mb-2 text-center">
        Upload a New Video
      </h2>
      <input
        type="text"
        placeholder="Title"
        className="px-4 py-2 text-black rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/80"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="px-4 py-2 text-black rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/80 resize-none"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="url"
        placeholder="Video URL"
        className="px-4 py-2 text-black rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/80"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      <input
        type="url"
        placeholder="Thumbnail URL"
        className="px-4 py-2 text-black rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/80"
        value={thumbnailUrl}
        onChange={(e) => setThumbnailUrl(e.target.value)}
      />
      <button
        type="submit"
        className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold shadow-lg hover:scale-105 transition-transform"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Video"}
      </button>
    </form>
  );
}

export default VideoUploadForm;