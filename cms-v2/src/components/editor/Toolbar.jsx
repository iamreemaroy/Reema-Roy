import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  CheckSquare,
  Quote,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Link2,
  ImageIcon,
  TableIcon,
  Undo2,
  Redo2,
} from "lucide-react";

export default function Toolbar({ editor }) {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("Enter image URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt("Enter URL");

    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="toolbar">

      <button onClick={() => editor.chain().focus().undo().run()}>
        <Undo2 size={18} />
      </button>

      <button onClick={() => editor.chain().focus().redo().run()}>
        <Redo2 size={18} />
      </button>

      <button
        className={editor.isActive("bold") ? "is-active" : ""}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={18} />
      </button>

      <button
        className={editor.isActive("italic") ? "is-active" : ""}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={18} />
      </button>

      <button
        className={editor.isActive("underline") ? "is-active" : ""}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon size={18} />
      </button>

      <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List size={18} />
      </button>

      <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered size={18} />
      </button>

      <button onClick={() => editor.chain().focus().toggleTaskList().run()}>
        <CheckSquare size={18} />
      </button>

      <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote size={18} />
      </button>

      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
        <Code2 size={18} />
      </button>

      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
        <Heading1 size={18} />
      </button>

      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading2 size={18} />
      </button>

      <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <Heading3 size={18} />
      </button>

      <button onClick={addLink}>
        <Link2 size={18} />
      </button>

      <button onClick={addImage}>
        <ImageIcon size={18} />
      </button>

      <button
        onClick={() =>
          editor.chain().focus().insertTable({
            rows: 3,
            cols: 3,
            withHeaderRow: true,
          }).run()
        }
      >
        <TableIcon size={18} />
      </button>

    </div>
  );
}
