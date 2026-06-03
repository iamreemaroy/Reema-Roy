import { useState } from 'react';
import Editor from './components/editor/Editor';
import './index.css';

const initialState = {
  title: '',
  slug: '',
  metaTitle: '',
  metaDescription: '',
  keywords: '',
  thumbnail: null,
  youtubeUrl: '',
  editorContent: '',
};

export default function App() {
  const [content, setContent] = useState(initialState);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const generateSlug = (title) =>
    title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setContent({ ...content, title, slug: generateSlug(title) });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setContent({ ...content, thumbnail: file });
    const reader = new FileReader();
    reader.onloadend = () => setThumbnailPreview(reader.result);
    reader.readAsDataURL(file);
  };

  // Single (async) publish handler — posts FormData to /api/publish
  const handlePublish = async () => {
    try {
      const form = new FormData();
      form.append('title', content.title || 'Untitled');
      form.append('slug', content.slug || '');
      form.append('meta_title', content.metaTitle || '');
      form.append('meta_description', content.metaDescription || '');
      form.append(
        'meta_keywords',
        JSON.stringify(
          content.keywords
            ? content.keywords.split(',').map((s) => s.trim()).filter(Boolean)
            : []
        )
      );
      form.append('author', 'Reema Roy');
      form.append('content', content.editorContent || '');
      if (content.thumbnail instanceof File) form.append('thumbnail', content.thumbnail);

      const res = await fetch('/api/publish', { method: 'POST', body: form });
      const json = await res.json();
      if (json.ok) {
        alert('Published — file: ' + json.post);
      } else {
        console.error(json);
        alert('Publish failed: ' + (json.error || 'unknown'));
      }
    } catch (err) {
      console.error(err);
      alert('Publish failed: check console');
    }
  };

  return (
    <div className="page-shell">
      <div className="cms-layout">
        <aside className="sidebar-card">
          <div className="card-title">Content Settings</div>

          <div className="field">
            <label htmlFor="title">Title</label>
            <input id="title" value={content.title} onChange={handleTitleChange} placeholder="Your blog title" />
          </div>

          <div className="field">
            <label htmlFor="slug">Slug</label>
            <input id="slug" value={content.slug} onChange={(e) => setContent({ ...content, slug: e.target.value })} placeholder="auto-generated" />
          </div>

          <div className="field">
            <label htmlFor="metaTitle">Meta Title</label>
            <input id="metaTitle" value={content.metaTitle} onChange={(e) => setContent({ ...content, metaTitle: e.target.value })} placeholder="SEO meta title" />
          </div>

          <div className="field">
            <label htmlFor="metaDesc">Meta Description</label>
            <textarea id="metaDesc" rows={4} value={content.metaDescription} onChange={(e) => setContent({ ...content, metaDescription: e.target.value })} placeholder="SEO meta description (160 chars)" />
          </div>

          <div className="field">
            <label htmlFor="keywords">Keywords</label>
            <input id="keywords" value={content.keywords} onChange={(e) => setContent({ ...content, keywords: e.target.value })} placeholder="comma-separated keywords" />
          </div>

          <div className="field">
            <label htmlFor="thumbnail">Thumbnail</label>
            <input id="thumbnail" type="file" accept="image/*" onChange={handleThumbnailChange} />
            {thumbnailPreview && <img src={thumbnailPreview} alt="Thumbnail" className="thumbnail-preview" />}
          </div>

          <div className="field">
            <label htmlFor="youtube">YouTube URL</label>
            <input id="youtube" type="url" value={content.youtubeUrl} onChange={(e) => setContent({ ...content, youtubeUrl: e.target.value })} placeholder="https://youtube.com/..." />
          </div>

          <div className="field">
            <label>URL Preview</label>
            <div className="url-preview">https://www.reemaroy.com/blog/{content.slug || 'your-slug'}/</div>
          </div>

          <button className="publish-btn" onClick={handlePublish}>Publish Blog</button>
        </aside>

        <section className="editor-shell">
          <div className="editor-header">
            <div>
              <h2>Post editor</h2>
              <p>Use the toolbar to format text and upload images directly.</p>
            </div>
          </div>

          <Editor content={content.editorContent} onChange={(value) => setContent({ ...content, editorContent: value })} />
        </section>
      </div>
    </div>
  );
}