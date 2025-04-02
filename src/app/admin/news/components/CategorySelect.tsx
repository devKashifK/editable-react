'use client';

import React, { useState } from 'react';

interface CategorySelectProps {
  selected: string[];
  onChange: (categories: string[]) => void;
}

// This would typically come from an API or database
const PREDEFINED_CATEGORIES = [
  'Technology',
  'Business',
  'Design',
  'Development',
  'Marketing',
  'Tutorial',
  'News',
  'Opinion',
];

const CategorySelect: React.FC<CategorySelectProps> = ({ selected, onChange }) => {
  const [newCategory, setNewCategory] = useState('');
  const [showAddNew, setShowAddNew] = useState(false);

  const handleAddCategory = () => {
    if (newCategory.trim() && !selected.includes(newCategory.trim())) {
      onChange([...selected, newCategory.trim()]);
      setNewCategory('');
      setShowAddNew(false);
    }
  };

  const handleRemoveCategory = (category: string) => {
    onChange(selected.filter((c) => c !== category));
  };

  const handleSelectCategory = (category: string) => {
    if (selected.includes(category)) {
      handleRemoveCategory(category);
    } else {
      onChange([...selected, category]);
    }
  };

  return (
    <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>

      {/* Selected Categories */}
      <div className="flex flex-wrap gap-2">
        {selected.map((category) => (
          <span
            key={category}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
          >
            {category}
            <button
              type="button"
              onClick={() => handleRemoveCategory(category)}
              className="ml-2 inline-flex items-center p-0.5 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {/* Predefined Categories */}
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Select from existing categories:</h3>
        <div className="flex flex-wrap gap-2">
          {PREDEFINED_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleSelectCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                ${
                  selected.includes(category)
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Add New Category */}
      <div className="mt-4">
        {showAddNew ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter new category name"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddCategory();
                }
              }}
            />
            <button
              onClick={handleAddCategory}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowAddNew(false);
                setNewCategory('');
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowAddNew(true)}
            className="text-blue-500 hover:text-blue-600 text-sm font-medium focus:outline-none"
          >
            + Add New Category
          </button>
        )}
      </div>
    </div>
  );
};

export default CategorySelect; 