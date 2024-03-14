import React from "react";

const TextDecoration = ({ textDecorationData, handleTextDecor }) => {
  return (
    <div className=" relative border-2 border-primaryBlack p-2 py-3">
      <h1 className="absolute -top-3 bg-white px-1">Text Decoration</h1>
      <div className="flex flex-wrap">
        {textDecorationData.map((el) => (
          <div key={el.id} className="flex gap-1 items-center w-1/2">
            <input
              id={el.id}
              name={el.label}
              type="checkbox"
              onChange={(e) => {
                handleTextDecor(e, el);
              }}
            />
            <label htmlFor={el.id} className="mt-[2px]">
              {el.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextDecoration;
