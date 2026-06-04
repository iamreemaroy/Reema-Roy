import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";



export const extensions = [
  StarterKit,

  Placeholder.configure({
    placeholder: "Start writing your blog...",
  }),

  Underline,

  TaskList,

  TaskItem.configure({
    nested: true,
  }),

  Image,

  Link.configure({
    openOnClick: false,
  }),

  Table.configure({
    resizable: true,
  }),

  TableRow,
  TableHeader,
  TableCell,
];

