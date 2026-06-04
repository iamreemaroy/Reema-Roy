import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

export const extensions = [
  StarterKit,
  Underline,

  Link.configure({
    openOnClick: false,
  }),

  Image.configure({
    inline: false,
  }),
];
