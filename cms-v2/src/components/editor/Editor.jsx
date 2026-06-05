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

  getMarkdown: () => {

    const html = editor?.getHTML() || "";

    return html

      .replace(/<h1>(.*?)<\/h1>/g, "# $1\n")
      .replace(/<h2>(.*?)<\/h2>/g, "## $1\n")
      .replace(/<h3>(.*?)<\/h3>/g, "### $1\n")

      .replace(/<strong>(.*?)<\/strong>/g, "**$1**")
      .replace(/<em>(.*?)<\/em>/g, "*$1*")

      .replace(/<blockquote>(.*?)<\/blockquote>/g, "> $1\n")

      .replace(/<ul>/g, "")
      .replace(/<\/ul>/g, "")

      .replace(/<ol>/g, "")
      .replace(/<\/ol>/g, "")

      .replace(/<li>(.*?)<\/li>/g, "- $1\n")

      .replace(/<p>(.*?)<\/p>/g, "$1\n\n")

      .replace(/<br\s*\/?>/g, "\n")

      .replace(/<[^>]+>/g, "");

  },

}));

  if (!editor) return null;

  return (
  <div className="editor-container">

    <div className="toolbar-wrapper">
      <Toolbar editor={editor} />
    </div>

    <div className="editor-scroll-area">
      <EditorContent editor={editor} />
    </div>

  </div>
);
});

export default Editor;
