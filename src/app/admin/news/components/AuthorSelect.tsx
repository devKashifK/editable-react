'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Author {
  name: string;
  image: string;
}

interface AuthorSelectProps {
  author: Author;
  onChange: (author: Author) => void;
}

// This would typically come from an API or database
const PREDEFINED_AUTHORS: Author[] = [
  {
    name: 'John Doe',
    image: 'https://ui-avatars.com/api/?name=John+Doe',
  },
  {
    name: 'Jane Smith',
    image: 'https://ui-avatars.com/api/?name=Jane+Smith',
  },
];

const AuthorSelect: React.FC<AuthorSelectProps> = ({ author, onChange }) => {
  const [showAddNew, setShowAddNew] = useState(false);
  const [newAuthor, setNewAuthor] = useState<Author>({
    name: '',
    image: '',
  });
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setNewAuthor(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAuthor = () => {
    if (newAuthor.name.trim() && newAuthor.image) {
      onChange(newAuthor);
      setShowAddNew(false);
      setNewAuthor({ name: '', image: '' });
      setImagePreview('');
    }
  };

  return (
    <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Author Information</h2>

      {/* Selected Author */}
      {author.name && (
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={author.image}
              alt={author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-medium">{author.name}</div>
            <button
              onClick={() => onChange({ name: '', image: '' })}
              className="text-sm text-red-500 hover:text-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Predefined Authors */}
      {!author.name && !showAddNew && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PREDEFINED_AUTHORS.map((predefinedAuthor) => (
            <button
              key={predefinedAuthor.name}
              onClick={() => onChange(predefinedAuthor)}
              className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={predefinedAuthor.image}
                  alt={predefinedAuthor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="font-medium">{predefinedAuthor.name}</div>
            </button>
          ))}
        </div>
      )}

      {/* Add New Author */}
      {!author.name && (
        <div className="mt-4">
          {showAddNew ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Author Name
                </label>
                <input
                  type="text"
                  value={newAuthor.name}
                  onChange={(e) =>
                    setNewAuthor((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter author name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Profile Image
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  {imagePreview && (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleAddAuthor}
                  disabled={!newAuthor.name.trim() || !newAuthor.image}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Author
                </button>
                <button
                  onClick={() => {
                    setShowAddNew(false);
                    setNewAuthor({ name: '', image: '' });
                    setImagePreview('');
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddNew(true)}
              className="text-blue-500 hover:text-blue-600 text-sm font-medium focus:outline-none"
            >
              + Add New Author
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthorSelect; 