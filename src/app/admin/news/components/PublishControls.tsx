'use client';

import React, { useState } from 'react';

interface PublishControlsProps {
  onSave: () => Promise<void>;
  onPublish: () => Promise<void>;
}

const PublishControls: React.FC<PublishControlsProps> = ({ onSave, onPublish }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      await onPublish();
    } catch (error) {
      console.error('Error publishing post:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="container mx-auto flex justify-end space-x-4">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? 'Saving...' : 'Save Draft'}
        </button>
        <button
          onClick={handlePublish}
          disabled={isPublishing}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPublishing ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </div>
  );
};

export default PublishControls; 