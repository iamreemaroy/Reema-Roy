import { forwardRef, useImperativeHandle } from "react";

import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";

import Toolbar from "./Toolbar";

const Editor = forwardRef((props, ref) => {

  const editor = useEditor({

    extensions: [

      StarterKit,

      Underline,

      Link.configure({
        openOnClick: false,
      }),

      Image.configure({
        inline: false,
      }),

      Table.configure({
        resizable: true,
      }),

      TableRow,
      TableHeader,
      TableCell,

    ],

    content: "",
  });

  useImperativeHandle(ref, () => ({
    getHTML: () => editor?.getHTML() || "",
  }));

  if (!editor) return null;

  return (

    <div className="editor-container">

      <Toolbar editor={editor} />

      <EditorContent editor={editor} />

    </div>
  );
});

export default Editor;
