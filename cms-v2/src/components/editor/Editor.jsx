import { forwardRef, useImperativeHandle } from "react";
import { useEditor, EditorContent } from "@tiptap/react";

const Editor = forwardRef((props, ref) => {

  const editor = useEditor({
    content: "<p>Start writing...</p>",
  });

  useImperativeHandle(ref, () => ({
    getHTML: () => editor?.getHTML() || "",
  }));

  if (!editor) return null;

  return (
    <div className="editor-wrapper">
      <EditorContent editor={editor} />
    </div>
  );
});

export default Editor;
