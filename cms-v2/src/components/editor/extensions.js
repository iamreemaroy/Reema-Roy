import StarterKit from "@tiptap/starter-kit";

import { Underline } from "@tiptap/extension-underline";
import { Link } from "@tiptap/extension-link";
import { Image } from "@tiptap/extension-image";
import { TextAlign } from "@tiptap/extension-text-align";
import { Highlight } from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";

import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";

import { Placeholder } from "@tiptap/extension-placeholder";

import { Youtube } from "@tiptap/extension-youtube";

import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";

export const extensions = [
  StarterKit,

  Underline,

  TextStyle,

  Color,

  Highlight,

  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      target: "_blank",
      rel: "noopener noreferrer",
    },
  }),

  Image,

  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),

  TaskList,

  TaskItem.configure({
    nested: true,
  }),

  Placeholder.configure({
    placeholder: "Start writing your blog...",
  }),

  Youtube.configure({
    controls: true,
  }),

  Table.configure({
    resizable: true,
  }),

  TableRow,
  TableHeader,
  TableCell,
];