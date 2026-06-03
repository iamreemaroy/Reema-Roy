import { useRef } from 'react';
import {
  FaBold, FaItalic, FaUnderline, FaStrikethrough, FaListUl, FaListOl,
  FaQuoteRight, FaCode, FaUndo, FaRedo, FaCheckSquare, FaImage, FaLink,
  FaYoutube, FaTable
} from 'react-icons/fa';

export default function Toolbar({ editor }) {
  const fileInputRef = useRef(null);
  if (!editor) return null;

  const uploadImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append('image', file);
    try {
      const res = await fetch('/api/upload-image', { method: 'POST', body: form });
      const json = await res.json();
      if (json.url) {
        editor.chain().focus().setImage({ src: json.url }).run();
      } else {
        alert('Upload failed');
      }
    } catch (e) {
      console.error(e);
      alert('Upload failed');
    } finally {
      event.target.value = '';
    }
  };

  return (
    <div className="toolbar">
      <button type="button" onClick={() => editor.chain().focus().undo().run()}><FaUndo /></button>
      <button type="button" onClick={() => editor.chain().focus().redo().run()}><FaRedo /></button>

      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}><FaBold /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}><FaItalic /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()}><FaUnderline /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()}><FaStrikethrough /></button>

      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}><FaListUl /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}><FaListOl /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleTaskList().run()}><FaCheckSquare /></button>

      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()}><FaQuoteRight /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()}><FaCode /></button>

      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>

      <button type="button" onClick={() => {
        const url = prompt('Enter link URL');
        if (url) editor.chain().focus().setLink({ href: url }).run();
      }}><FaLink /></button>

      {/* Image upload button triggers hidden file input */}
      <button type="button" onClick={() => fileInputRef.current?.click()}><FaImage /></button>
      <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={uploadImage} />

      <button type="button" onClick={() => {
        const url = prompt('Enter YouTube URL');
        if (url) editor.commands.setYoutubeVideo({ src: url, width: 640, height: 360 });
      }}><FaYoutube /></button>

      <button type="button" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}><FaTable /></button>
    </div>
  );
}