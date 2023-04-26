import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, {useEffect, useMemo, useState} from 'react'
import MenuBar from "@/components/Menubar";
import {Collaboration} from "@tiptap/extension-collaboration";
import {HocuspocusProvider} from "@hocuspocus/provider";

export default () => {
  const [hocusProvider, setHocusProvider] = useState(null)

  useEffect(() => {
    fetch('api/hello')
  }, [])

  useEffect(() => {
    const provider = new HocuspocusProvider({
      url: `wss://${process.env.NEXT_PUBLIC_VERCEL_URL}:1234`,
      name: "hocuspocus-fra1-01",

      onDisconnect: () => {
        // provider.on('destroy', event => {
        //   console.log('yoo')
        //   console.log(event.status)
        // })
        // close()
      }
    });

    setHocusProvider(provider)

    provider.on('status', event => {
      console.log(event.status) // logs "connected" or "disconnected"
    })

    return () => {
      console.log('yoo')
      provider.on('destroy', event => {
        console.log('yoo')
        console.log(event.status)
      })
    }
  }, [])

  if (hocusProvider) {
    return <Editor provider={hocusProvider}/>
  }
}


function Editor({ provider }) {
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        history: false,
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      Collaboration.configure({
        document: provider.document
      })
    ],
    editorProps: {
      attributes: {
        class: 'p-4 border border-black rounded mt-4 prose bg-white max-w-none'
      }
    },
    content: `
      <h2>
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