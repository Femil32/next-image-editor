import React from "react";

const Template = ({ editorState, addTemplate, handleCanvasZoom }) => {
  return (
    <div className="relative border-2 border-primaryBlack p-2 py-3">
      <h1 className="absolute -top-3 bg-white px-1">Template & Canvas</h1>
      <button
        onClick={() => addTemplate()}
        className="btn btn-primary w-full mb-2"
      >
        Add Template
      </button>
      <div className="flex justify-between items-center">
        <label>Zoom</label>
        <div className="flex gap-2">
          <button
            className="px-2 leading-[1px] text-white bg-primaryBlue"
            onClick={() => handleCanvasZoom("out")}
          >
            -
          </button>
          <p className="">{editorState.canvasScale * 100}</p>
          <button
            className="px-2 leading-[1px] text-white bg-primaryBlue"
            onClick={() => handleCanvasZoom("in")}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Template;
