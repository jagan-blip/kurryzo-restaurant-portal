import React, { useState } from 'react';
import Input from '../../../components/Input/Input';

function DocumentUploader({ documentType }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
  };

  const labelClass = selectedImage ? 'text-green cursor-pointer' : 'text-[#2492ff] cursor-pointer';

  return (
    <div className="mt-5 px-6">
      <p className="font-semibold">{documentType}</p>
      <div className="mt-4 mb-5">
        <Input placeholder={`Enter ${documentType} number`} />
      </div>
      <div className="bg-[#e0f0ff] flex justify-between items-center h-14 px-5 mt-2 rounded-md font-medium border border-dashed border-[#2492ff]">
        <label className={labelClass}>
          {selectedImage
            ? "Image uploaded Successfully"
            : `Add ${documentType} Photo`}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
          />
        </label>
        {selectedImage && (
          <p
            className="text-[#2492ff] cursor-pointer"
            onClick={handleImageRemove}
          >
            Remove
          </p>
        )}
      </div>
    </div>
  );
}

export default DocumentUploader;
