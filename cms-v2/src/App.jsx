import { useState } from "react";
import Editor from "./components/editor/Editor";

export default function App() {
  const [slug, setSlug] = useState("");
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
        thumbnail,
        content: editor?.getHTML(),
      }),
    });

    const data = await response.json();

    console.log(data);

    if (data.success) {
      alert("Blog Published Successfully!");
    } else {
      alert("Publishing Failed");
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
            <h2>Content Settings</h2>

            <div className="field">
              <label>Title</label>
              <input placeholder="Enter blog title" />
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
              <input placeholder="SEO meta title" />
            </div>

            <div className="field">
              <label>Meta Description</label>
              <textarea placeholder="SEO description" />
            </div>

            <div className="field">
              <label>Keywords</label>
              <input placeholder="seo, cms, blog" />
            </div>

            <div className="field">
              <label>Thumbnail Upload</label>
              <input type="file" />
            </div>

            <div className="field">
              <label>YouTube URL</label>
              <input placeholder="https://youtube.com/watch?v=..." />
            </div>

            <div className="url-preview">
              https://www.reemaroy.com/blog/{slug}
            </div>

            <button onClick={handlePublish}>
              Publish Blog
            </button>

          </div>
        </aside>

        <Editor />

      </div>
    </div>
  );
}
