'use client';

import React from 'react';

interface SeoSectionProps {
  metaTitle: string;
  metaDescription: string;
  slug: string;
  onChange: (field: string, value: string) => void;
}

const SeoSection: React.FC<SeoSectionProps> = ({
  metaTitle,
  metaDescription,
  slug,
  onChange,
}) => {
  const META_TITLE_MAX_LENGTH = 60;
  const META_DESCRIPTION_MAX_LENGTH = 160;

  return (
    <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">SEO Settings</h2>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Meta Title
          <span className="text-sm text-gray-500 ml-2">
            ({metaTitle.length}/{META_TITLE_MAX_LENGTH})
          </span>
        </label>
        <input
          type="text"
          value={metaTitle}
          onChange={(e) => onChange('metaTitle', e.target.value)}
          maxLength={META_TITLE_MAX_LENGTH}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter meta title for SEO"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Meta Description
          <span className="text-sm text-gray-500 ml-2">
            ({metaDescription.length}/{META_DESCRIPTION_MAX_LENGTH})
          </span>
        </label>
        <textarea
          value={metaDescription}
          onChange={(e) => onChange('metaDescription', e.target.value)}
          maxLength={META_DESCRIPTION_MAX_LENGTH}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter meta description for SEO"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          URL Slug
        </label>
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">/blog/</span>
          <input
            type="text"
            value={slug}
            onChange={(e) => onChange('slug', e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''))}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="enter-url-slug"
          />
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-md">
        <h3 className="text-sm font-medium text-gray-700 mb-2">SEO Preview</h3>
        <div className="space-y-1">
          <div className="text-blue-600 text-lg">{metaTitle || 'Title'}</div>
          <div className="text-green-700 text-sm">
            {window.location.origin}/blog/{slug || 'url-slug'}
          </div>
          <div className="text-gray-600 text-sm">
            {metaDescription || 'Meta description will appear here...'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeoSection; 