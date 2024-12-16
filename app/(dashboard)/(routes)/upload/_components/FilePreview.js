import React from 'react'
import { Image as LucideImage, FileText, File, X } from 'lucide-react'

function FilePreview({ file, removeFile }) {
  // Function to return the appropriate icon based on file type
  const renderFileIcon = (type) => {
    if (type.startsWith('image/')) return <LucideImage size={50} color="#3b82f6" />;
    if (type.startsWith('text/')) return <FileText size={50} color="#3b82f6" />;
    return <File size={50} color="#3b82f6" />; // Fallback icon for other files
  };

  return (
    <div className="flex items-center gap-2 justify-between mt-5 border rounded-md p-2 border-blue-200">
      <div className="flex items-center p-2">
      
        {renderFileIcon(file.type)}
        <div className="text-left ml-2">
          <h2 className="font-semibold">{file.name}</h2>
          <h2 className="text-sm text-gray-500">
            {file?.type} / {(file.size / 1024 / 1024).toFixed(2)} MB
          </h2>
        </div>
      </div>
      
      <X
        className="text-red-500 cursor-pointer hover:text-red-700"
        onClick={() => removeFile()}
      />
    </div>
  );
}

export default FilePreview;
