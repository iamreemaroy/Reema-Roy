import { useEditor, EditorContent } from "@tiptap/react";
import { extensions } from "./extensions";
import Toolbar from "./Toolbar";

export default function Editor() {
  const editor = useEditor({
    extensions,
    content: "",
  });

  return (
    <main className="editor-shell">

      <Toolbar editor={editor} />

      <div className="editor-content">
        <EditorContent editor={editor} />
      </div>

    </main>
  );
}

