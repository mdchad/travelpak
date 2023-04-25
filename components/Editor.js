import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Text,
  Undo2,
  Redo2,
  SeparatorHorizontal,
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  CurlyBraces
} from "lucide-react";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={`btn-primary ${editor.isActive('bold') ? 'is-active' : ''}`}
      >
        <Bold size={18}/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={`btn-primary ${editor.isActive('italic') ? 'is-active' : ''}`}
      >
        <Italic size={18}/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={`btn-primary ${editor.isActive('strike') ? 'is-active' : ''}`}
      >
        <Strikethrough size={18}/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={`btn-primary ${editor.isActive('code') ? 'is-active' : ''}`}
      >
        <Code size={18}/>
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`btn-primary ${editor.isActive('paragraph') ? 'is-active' : ''}`}
      >
        <Text size={18}/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`btn-primary ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
      >
        <Heading1 size={18}/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`btn-primary ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
      >
        <Heading2 size={18}/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`btn-primary ${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}`}
      >
        <Heading3 size={18}/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`btn-primary ${editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}`}
      >
        <Heading4 size={18}/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`btn-primary ${editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}`}
      >
        <Heading5 size={18}/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`btn-primary ${editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}`}
      >
        <Heading6 size={18}/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`btn-primary ${editor.isActive('bulletList') ? 'is-active' : ''}`}
      >
        <List size={18}/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`btn-primary ${editor.isActive('orderedList') ? 'is-active' : ''}`}
      >
        <ListOrdered size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`btn-primary ${editor.isActive('codeBlock') ? 'is-active' : ''}`}
      >
        <CurlyBraces size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`btn-primary ${editor.isActive('blockquote') ? 'is-active' : ''}`}
      >
        <Quote size={18}/>
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className="btn-primary">
        <SeparatorHorizontal size={18} />
      </button>
      {/*<button onClick={() => editor.chain().focus().setHardBreak().run()} className="btn-primary">*/}
      {/*  hard break*/}
      {/*</button>*/}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
        className="btn-primary cursor-pointer"
      >
        <Undo2 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
        className="btn-primary cursor-pointer"
      >
        <Redo2 size={18}/>
      </button>
      {/*<button*/}
      {/*  onClick={() => editor.chain().focus().setColor('#958DF1').run()}*/}
      {/*  className={`btn-primary ${editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}`}*/}
      {/*>*/}
      {/*  purple*/}
      {/*</button>*/}
    </div>
  )
}

export default () => {
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: 'p-2 border border-white rounded mt-4 prose dark:prose-invert text-white max-w-none'
      }
    },
    content: `
      <h2 class="text-white">
        Hi there,
      </h2>
      <p>
        this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
      </p>
      <ul>
        <li>
          That’s a bullet list with one …
        </li>
        <li>
          … or two list items.
        </li>
      </ul>
      <p>
        Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
      </p>
      <pre><code class="language-css">body {
  display: none;
}</code></pre>
      <p>
        I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
      </p>
      <blockquote>
        Wow, that’s amazing. Good work, boy! 👏
        <br />
        — Mom
      </blockquote>
    `,
  })

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}