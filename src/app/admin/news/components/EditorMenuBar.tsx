'use client';

import React from 'react';
import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Youtube as YoutubeIcon,
  Heading1,
  Heading2,
  Heading3,
} from 'lucide-react';

interface EditorMenuBarProps {
  editor: Editor;
}

const EditorMenuBar: React.FC<EditorMenuBarProps> = ({ editor }) => {
  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL');
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
      });
    }
  };

  const setLink = () => {
    const url = prompt('Enter URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-2 mb-4 flex flex-wrap gap-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
        title="Bold"
      >
        <Bold size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
        title="Italic"
      >
        <Italic size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
        title="Underline"
      >
        <Underline size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-2 rounded ${editor.isActive('strike') ? 'bg-gray-200' : ''}`}
        title="Strikethrough"
      >
        <Strikethrough size={20} />
      </button>

      <div className="w-px h-6 bg-gray-200 mx-2" />

      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-2 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
        title="Align Left"
      >
        <AlignLeft size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-2 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
        title="Align Center"
      >
        <AlignCenter size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-2 rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
        title="Align Right"
      >
        <AlignRight size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={`p-2 rounded ${editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200' : ''}`}
        title="Justify"
      >
        <AlignJustify size={20} />
      </button>

      <div className="w-px h-6 bg-gray-200 mx-2" />

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
        title="Heading 1"
      >
        <Heading1 size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
        title="Heading 2"
      >
        <Heading2 size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-2 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}`}
        title="Heading 3"
      >
        <Heading3 size={20} />
      </button>

      <div className="w-px h-6 bg-gray-200 mx-2" />

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
        title="Bullet List"
      >
        <List size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
        title="Numbered List"
      >
        <ListOrdered size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}
        title="Quote"
      >
        <Quote size={20} />
      </button>

      <div className="w-px h-6 bg-gray-200 mx-2" />

      <button
        onClick={setLink}
        className={`p-2 rounded ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
        title="Add Link"
      >
        <LinkIcon size={20} />
      </button>
      <button
        onClick={addYoutubeVideo}
        className="p-2 rounded hover:bg-gray-100"
        title="Add YouTube Video"
      >
        <YoutubeIcon size={20} />
      </button>
    </div>
  );
};

export default EditorMenuBar; 