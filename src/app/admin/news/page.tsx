'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const BlogEditor = dynamic(() => import('./components/BlogEditor'), {
  ssr: false,
});

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
          <BlogEditor />
        </div>
      </div>
    </main>
  );
} 