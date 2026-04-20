// OsceEditor.tsx
import CommonHeader from "@/common/header/CommonHeader";
import BulletList from "@tiptap/extension-bullet-list";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

import b from "@/assets/editorIcon/b.svg";
import center from "@/assets/editorIcon/center.svg";
import h1 from "@/assets/editorIcon/h1.svg";
import h2 from "@/assets/editorIcon/h2.svg";
import i from "@/assets/editorIcon/i.svg";
import left from "@/assets/editorIcon/left.svg";
import link from "@/assets/editorIcon/link.svg";
import list1 from "@/assets/editorIcon/list.svg";
import numberList from "@/assets/editorIcon/numberList.svg";
import right from "@/assets/editorIcon/right.svg";
import u from "@/assets/editorIcon/u.svg";

import OsceHeader from "./OsceHeader";

interface OsceEditorProps {
  title: string;
  value?: string;
  onChange?: (val: string) => void;
  className?: string;
}

const OsceEditor: React.FC<OsceEditorProps> = ({
  title,
  value = "",
  onChange,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      ListItem,
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc pl-6",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal pl-6",
        },
      }),
    ],
    content: value || "",
  });

  // keep Tiptap content synced to parent (RHF)
  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
    const handler = () => onChange?.(editor.getHTML());
    editor.on("update", handler);
    return () => {
      editor.off("update", handler);
    };
  }, [editor, value, onChange]);

  // Force re-render on selection change (for active toolbar highlighting)
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!editor) return;
    const update = () => setTick((t) => t + 1);
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);
    editor.on("update", update);
    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
      editor.off("update", update);
    };
  }, [editor]);

  if (!editor) return null;

  const activeClass = "bg-gray-300 border border-gray-500 rounded";

  return (
    <div className="space-y-2 w-full bg-white p-6  border border-border rounded-md">
      <CommonHeader className="pb-3">{title}</CommonHeader>

      <label className="block text-sm font-normal text-[#020617] font-inter mb-2">
        Description
      </label>

      <div className="flex flex-wrap items-center gap-4 bg-[#F9FAFB] border border-black/10 rounded p-4">
        {/* Bold */}
        <OsceHeader
          imgUrl={b}
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? activeClass : ""}
        />
        <OsceHeader
          imgUrl={i}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? activeClass : ""}
        />
        <OsceHeader
          imgUrl={u}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? activeClass : ""}
        />
        <hr className="h-6 border border-[#D1D5DC]" />
        <OsceHeader
          imgUrl={h1}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? activeClass : ""
          }
        />
        <OsceHeader
          imgUrl={h2}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? activeClass : ""
          }
        />
        <OsceHeader
          imgUrl={list1}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? activeClass : ""}
        />
        <OsceHeader
          imgUrl={numberList}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? activeClass : ""}
        />
        <OsceHeader
          imgUrl={left}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? activeClass : ""}
        />
        <OsceHeader
          imgUrl={center}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" }) ? activeClass : ""
          }
        />
        <OsceHeader
          imgUrl={right}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? activeClass : ""}
        />
        <hr className="h-6 border border-[#D1D5DC]" />
        <OsceHeader
          imgUrl={link}
          onClick={() => {
            if (editor.isActive("link")) {
              editor.chain().focus().unsetLink().run();
            } else {
              const url = window.prompt("Enter URL");
              if (url) editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={editor.isActive("link") ? activeClass : ""}
        />
      </div>

      <label className="block text-sm font-normal text-[#020617] font-inter mb-2">
        Instruction
      </label>

      <EditorContent
        editor={editor}
        className="w-full border border-[#CBD5E1] bg-white rounded-md p-3 outline-none focus-within:outline-none focus-within:border-[#CBD5E1] text-xl min-h-[200px] [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2 [&_li]:my-1 [&_li]:ml-0 [&_.ProseMirror]:outline-none [&_.ProseMirror:focus]:outline-none"
      />
    </div>
  );
};

export default OsceEditor;
