import React from "react";

const TextProperties = ({
  editorState,
  addText,
  textColorChange,
  textBgColorChange,
  onFontSize,
}) => {
  return (
    <div className="relative border-2 border-primaryBlack p-2 py-3">
      <h1 className="absolute -top-3 bg-white px-1">Text Properties</h1>
      <button onClick={() => addText()} className="btn btn-primary w-full mb-2">
        Add Text
      </button>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <label htmlFor="text-color">Text color </label>
          <input
            id="text-color"
            type="color"
            value={editorState.color}
            size="10"
            onChange={(e) => textColorChange(e)}
            className="w-32 h-8"
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="text-bgcolor">Background text color</label>
          <input
            id="text-bgcolor"
            type="color"
            value=""
            size="10"
            onChange={(e) => textBgColorChange(e)}
            className="w-32 h-8"
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="text-font-size">Font size</label>
          <input
            id="text-font-size"
            type="number"
            value={editorState.fontSize}
            onChange={(e) => onFontSize(e)}
            size="10"
            min={"0"}
            className="w-32 h-8 border outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default TextProperties;
