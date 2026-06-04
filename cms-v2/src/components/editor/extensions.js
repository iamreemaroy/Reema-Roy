import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";

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
];
