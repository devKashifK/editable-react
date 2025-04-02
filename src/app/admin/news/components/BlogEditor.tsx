'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import Placeholder from '@tiptap/extension-placeholder';
import { useDropzone } from 'react-dropzone';
import { ImageIcon, X, Loader2 } from 'lucide-react';
import { ImageUploaderAndPicker } from '@/components/ui/image-picker';
import SeoSection from './SeoSection';
import EditorMenuBar from './EditorMenuBar';
import PublishControls from './PublishControls';
import AuthorSelect from './AuthorSelect';
import CategorySelect from './CategorySelect';
import { fetchMediaByExactTitle } from '@/components/ui/use-media';

interface BlogPost {
  title: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  categories: string[];
  author: {
    name: string;
    image: string;
  };
  status: 'draft' | 'published';
  featuredImage?: {
    name: string;
    url: string;
  };
}

const BlogEditor = () => {
  const [post, setPost] = useState<BlogPost>({
    title: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    slug: '',
    categories: [],
    author: {
      name: '',
      image: '',
    },
    status: 'draft',
  });

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      if (post.featuredImage?.name) {
        setIsLoadingImage(true);
        try {
          const url = await fetchMediaByExactTitle(post.featuredImage.url);
          setImageUrl(url);
        } catch (error) {
          console.error('Error loading image:', error);
        } finally {
          setIsLoadingImage(false);
        }
      } else {
        setImageUrl(null);
      }
    };

    loadImage();
  }, [post.featuredImage?.name]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Youtube.configure({
        controls: true,
      }),
      Placeholder.configure({
        placeholder: 'Start writing your amazing blog post here...',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setPost(prev => ({
        ...prev,
        content: editor.getHTML(),
      }));
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setPost(prev => ({
      ...prev,
      title,
      slug: title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
    }));
  };

  const handleSave = async (status: 'draft' | 'published' = 'draft') => {
    // Create a clean post object with the status
    const postData = {
      ...post,
      status,
      // Ensure featuredImage is properly structured
      featuredImage: post.featuredImage ? {
        name: post.featuredImage.name,
        url: post.featuredImage.url
      } : undefined,
      // Format the date
      createdAt: new Date().toISOString(),
    };

    // Log the structured JSON data
    console.log('Post Data:', JSON.stringify(postData, null, 2));
  };

  return (
    <div className="space-y-8">
      {/* Title Input */}
      <div>
        <input
          type="text"
          placeholder="Enter blog title"
          value={post.title}
          onChange={handleTitleChange}
          className="w-full text-4xl font-bold p-2 border-b-2 border-gray-200 focus:border-blue-500 outline-none"
        />
      </div>

      {/* Featured Image Upload */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Featured Image
        </label>
        <ImageUploaderAndPicker
          onChange={(image) => {
            if (typeof image === 'string') {
              const imageData = JSON.parse(image);
              setPost(prev => ({
                ...prev,
                featuredImage: {
                  name: imageData.name,
                  url: imageData.url
                }
              }));
            }
          }}
        />
        {post.featuredImage && (
          <div className="relative mt-4">
            <div className="relative w-full h-[200px] rounded-lg overflow-hidden bg-gray-100">
              {isLoadingImage ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : imageUrl ? (
                <img
                  src={imageUrl}
                  alt={post.featuredImage.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Failed to load image
                </div>
              )}
              <button
                onClick={() => setPost(prev => ({ ...prev, featuredImage: undefined }))}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                title="Remove image"
              >
                <X size={16} />
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {post.featuredImage.name}
            </p>
          </div>
        )}
      </div>

      {/* Editor Toolbar */}
      {editor && <EditorMenuBar editor={editor} />}

      {/* Rich Text Editor */}
      <div className="prose max-w-none">
        <style jsx global>{`
          .ProseMirror p.is-editor-empty:first-child::before {
            color: #adb5bd;
            content: attr(data-placeholder);
            float: left;
            height: 0;
            pointer-events: none;
          }
        `}</style>
        <div className="min-h-[300px] p-4 border border-gray-200 rounded-lg focus-within:border-blue-500 transition-colors">
          <EditorContent 
            editor={editor} 
            className="min-h-[300px] focus:outline-none"
          />
        </div>
      </div>

      {/* SEO Section */}
      <SeoSection
        metaTitle={post.metaTitle}
        metaDescription={post.metaDescription}
        slug={post.slug}
        onChange={(field, value) => setPost(prev => ({ ...prev, [field]: value }))}
      />

      {/* Categories */}
      <CategorySelect
        selected={post.categories}
        onChange={categories => setPost(prev => ({ ...prev, categories }))}
      />

      {/* Author Selection */}
      <AuthorSelect
        author={post.author}
        onChange={author => setPost(prev => ({ ...prev, author }))}
      />

      {/* Publishing Controls */}
      <PublishControls
        onSave={() => handleSave('draft')}
        onPublish={() => handleSave('published')}
      />
    </div>
  );
};

export default BlogEditor; 