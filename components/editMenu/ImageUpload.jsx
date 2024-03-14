import React from "react";

const ImageUpload = ({ onImageChange }) => {
  return (
    <div className="relative border-2 border-primaryBlack p-2 py-3">
      <h1 className="absolute -top-3 bg-white px-1">Image</h1>
      <div className="relative btn btn-primary w-full cursor-pointer">
        <span>Upload Image</span>
        <input
          type="file"
          id="img"
          name="img"
          accept="image/*"
          onChange={(e) => onImageChange(e)}
          className="opacity-0 absolute inset-0 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
