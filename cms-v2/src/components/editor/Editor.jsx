import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { extensions } from './extensions';
import Toolbar from './Toolbar';

export default function Editor({ content, onChange }) {
  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
  });

  useEffect(() => {
    if (!editor || content === editor.getHTML()) return;
    editor.commands.setContent(content, false);
  }, [content, editor]);

  return (
    <div className="editor-wrapper">
      <Toolbar editor={editor} />
      <div className="editor-content">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}