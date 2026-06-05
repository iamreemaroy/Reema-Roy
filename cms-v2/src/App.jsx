import { useState, useRef } from "react";
import Editor from "./components/editor/Editor";

export default function App() {

  const editorRef = useRef();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const handlePublish = async () => {

    try {

      const response = await fetch("/api/publish", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
        title,
        slug,
        metaTitle,
        metaDescription,
        keywords,
        youtubeUrl,
        thumbnailName: thumbnail?.name || "",
        content: editorRef.current?.getHTML?.() || "",
      }),
      });

      
      const text = await response.text();

      console.log(text);

      const data = JSON.parse(text);

      if (data.success) {
        alert("Blog published successfully!");
      } else {
        console.error(data);
        alert("Error publishing blog");
      }

    } catch (error) {
      console.error(error);
      alert("Error publishing blog");
    }
  };

  return (
    <div className="app-layout">

      <div className="cms-layout">

        <aside className="sidebar">

          <div className="sidebar-card">

            <div className="field">
              <label>Title</label>

              <input
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Slug</label>

              <input
                placeholder="wordpress-vs-headless-cms"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Meta Title</label>

              <input
                placeholder="SEO meta title"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Meta Description</label>

              <textarea
                placeholder="SEO description"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Keywords</label>

              <input
                placeholder="seo, cms, blog"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Thumbnail Upload</label>

              <input
                type="file"
                onChange={(e) => setThumbnail(e.target.files[0])}
              />
            </div>

            <div className="field">
              <label>YouTube URL</label>

              <input
                placeholder="https://youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
              />
            </div>

            <div className="url-preview">
              https://www.reemaroy.com/blog/{slug}
            </div>

            <button
              onClick={handlePublish}
              style={{
                width: "100%",
                background: "#081225",
                color: "#fff",
                border: "none",
                padding: "14px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "16px",
                marginTop: "20px",
              }}
            >
              Publish Blog
            </button>

          </div>

        </aside>

        <Editor ref={editorRef} />

      </div>

    </div>
  );
}
