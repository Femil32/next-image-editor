import React from "react";
import { CompactPicker } from "react-color";

const BgProperties = ({
  editorState,
  addBackground,
  removeBackground,
  onColorChange,
}) => {
  return (
    <div className="relative border-2 border-primaryBlack p-2 py-3">
      <h1 className="absolute -top-3 bg-white px-1">Background Properties</h1>
      <button
        onClick={() =>
          addBackground("https://source.unsplash.com/random/?city,night")
        }
        className="btn btn-primary w-full mb-2"
      >
        Add Background Image
      </button>
      <button
        onClick={() => removeBackground()}
        className="btn btn-secondary w-full"
      >
        Remove Background Image
      </button>
      <CompactPicker
        color={editorState.backgroundColor}
        onChange={onColorChange}
        className="bg-color-picker"
      />
    </div>
  );
};

export default BgProperties;
