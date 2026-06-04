import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";

import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

export const extensions = [
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

  TaskList,

  TaskItem.configure({
    nested: true,
  }),
];
