"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { fabric } from "fabric";
import templateData from "../../data/template.js";
import { loadImageFromURL } from "../../utils/imageLoader";
import Navbar from "@/components/navbar";
import ImageUpload from "../editMenu/ImageUpload";
import TextProperties from "../editMenu/TextProperties";
import TextDecoration from "../editMenu/TextDecoration";
import BgProperties from "../editMenu/BgProperties";
import Template from "../editMenu/Template";
import { textDecorationData } from "@/data/editor";

const Editor = () => {
  const containerRef = useRef();

  const [editorState, setEditorState] = useState({
    canvas: null,
    backgroundColor: "#FDEFEF",
    fontSize: "32",
    href: "",
    color: "#000000",
    canvasScale: 1,
    backgroundImage: "",
  });

  const deleteActiveObject = useCallback(() => {
    const { canvas } = editorState;

    canvas.getActiveObjects().forEach((object) => {
      canvas.remove(object);
    });
  }, [editorState]);

  const onHandleKeyDown = useCallback(
    (event) => {
      if (event.which === 46) {
        deleteActiveObject();
      }
    },
    [deleteActiveObject]
  );

  useEffect(() => {
    const container = containerRef.current;
    const { clientHeight, clientWidth } = container;

    const canvas = new fabric.Canvas("canvas", {
      backgroundColor: "#FDEFEF",
      height: clientHeight,
      width: clientWidth,
      preserveObjectStacking: true,
    });

    setEditorState({
      ...editorState,
      canvas,
    });

    document.addEventListener("keydown", onHandleKeyDown);

    return () => {
      document.removeEventListener("keydown", onHandleKeyDown);
      canvas.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addText = () => {
    const { canvas: demo } = editorState;
    demo.add(
      new fabric.IText("Tap and Type", {
        fontFamily: "arial",
        fill: editorState.color,
        fontSize: 32,
        padding: 5,
        left: 0,
        right: 0,
      })
    );
    setEditorState({
      ...editorState,
      canvas: demo,
    });
  };

  const addBackground = (url) => {
    const { canvas } = editorState;
    removeBackground();

    fabric.Image.fromURL(
      url,
      (img) => {
        if (canvas) {
          canvas.setBackgroundImage(
            img,
            () => {
              canvas.renderAll();
            },
            {
              scaleX: canvas.width / img.width,
              scaleY: canvas.height / img.height,
            }
          );
        }
      },
      { crossOrigin: "anonymous" }
    );
    setEditorState({ ...editorState, backgroundImage: url });
  };

  const removeBackground = () => {
    const { canvas } = editorState;
    setEditorState({ ...editorState, backgroundImage: "" });
    if (canvas.backgroundImage) {
      canvas.setBackgroundImage(null);
      canvas.renderAll();
    }
  };

  const onColorChange = (color) => {
    const { canvas } = editorState;
    removeBackground();
    if (canvas) {
      canvas.backgroundColor = color.hex;
      canvas.renderAll();
    }
  };
  const textColorChange = (e) => {
    const { canvas } = editorState;
    if (canvas.getActiveObject()) {
      canvas.getActiveObject().set("fill", e.target.value);
      canvas.renderAll();
    }
    setEditorState({ ...editorState, color: e.target.value });
  };

  const textBgColorChange = (e) => {
    const { canvas } = editorState;
    if (canvas.getActiveObject()) {
      canvas.getActiveObject().set("backgroundColor", e.target.value);
      canvas.renderAll();
    }
  };

  const onFontSize = (e) => {
    if (isNaN(e.target.value)) return;
    const { canvas } = editorState;
    if (canvas.getActiveObject()) {
      canvas.getActiveObject().set("fontSize", e.target.value);
      canvas.renderAll();
    }
    setEditorState({ ...editorState, fontSize: e.target.value });
  };

  const onImageChange = (e) => {
    const { canvas } = editorState;
    var url = URL.createObjectURL(e.target.files[0]);
    fabric.Image.fromURL(
      url,
      (img) => {
        canvas.add(img);
        canvas.renderAll();
      },
      { scaleX: 0.15, scaleY: 0.15 }
    );
  };

  const download = () => {
    const { canvas } = editorState;
    const image = canvas.toDataURL({
      format: "png",
      quality: 1,
    });
    // generate link for download data image
    const link = document.createElement("a");
    link.href = image;
    link.download = "awsome-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setEditorState({ ...editorState, href: image });
  };

  const addTemplate = async () => {
    const { canvas } = editorState;
    canvas.clear();
    if (canvas) {
      try {
        const template = JSON.parse(JSON.stringify(templateData));
        canvas.backgroundColor = template.background.value;
        canvas.renderAll();

        for (const object of template.objects) {
          const element = await importTemplate(object);
          if (element) {
            canvas.add(element);
            canvas.renderAll();
          } else {
            console.log("UNABLE TO LOAD OBJECT: ", object.type);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const importTemplate = async (item) => {
    let object;
    switch (item.type) {
      case "StaticText":
        object = await staticText(item);
        break;
      case "StaticImage":
        object = await staticImage(item);
        break;
    }
    return object;
  };

  const staticText = (item) => {
    return new Promise((resolve, reject) => {
      try {
        const baseOptions = getBaseOptions(item, "text");
        const metadata = item.metadata;
        const oldCanvasWidth = item.canvas.width;
        const newCanvasWidth = editorState.canvas.width;
        const {
          textAlign,
          fontFamily,
          fontSize,
          fontWeight,
          charSpacing,
          lineheight,
          text,
          padding,
        } = metadata;
        const textOptions = {
          ...baseOptions,
          text: text ? text : "Default Text",
          ...(textAlign && { textAlign }),
          ...(fontFamily && { fontFamily }),
          ...(fontSize && {
            fontSize: (fontSize * newCanvasWidth) / oldCanvasWidth,
          }),
          ...(fontWeight && { fontWeight }),
          ...(charSpacing && { charSpacing }),
          ...(lineheight && { lineheight }),
          ...(padding && { padding }),
        };
        const element = new fabric.Text(text, textOptions);
        resolve(element);
      } catch (err) {
        reject(err);
      }
    });
  };

  const staticImage = (item) => {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = getBaseOptions(item, "img");
        const src = item.metadata.src;
        const image = await loadImageFromURL(src);
        const { width, height } = baseOptions;
        if (!width || !height) {
          baseOptions.width = image.width;
          baseOptions.height = image.height;
        }
        const element = new fabric.Image(image, baseOptions);

        resolve(element);
      } catch (err) {
        reject(err);
      }
    });
  };

  const getBaseOptions = (item, type) => {
    const { left, top, width, height, scaleX, scaleY } = item;
    let metadata = item.metadata ? item.metadata : {};
    const { fill, angle, originX, originY } = metadata;
    const oldCanvasWidth = item.canvas.width;
    const oldCanvasHeight = item.canvas.height;
    const newCanvasWidth = editorState.canvas.width;
    const newCanvasHeight = editorState.canvas.height;

    let baseOptions = {
      angle: angle ? angle : 0,
      top: top ? (top * newCanvasWidth) / oldCanvasWidth : 0,
      left: left ? (left * newCanvasWidth) / oldCanvasWidth : 0,
      width: type === "img" ? width : (width * newCanvasWidth) / oldCanvasWidth,
      height:
        type === "img" ? height : (height * newCanvasHeight) / oldCanvasHeight,
      originX: originX || "left",
      originY: originY || "top",
      scaleX: (scaleX * newCanvasWidth) / oldCanvasWidth || 1,
      scaleY: (scaleY * newCanvasWidth) / oldCanvasWidth || 1,
      fill: fill || "#000000",
      metadata: metadata,
    };
    return baseOptions;
  };

  const handleCanvasZoom = (type) => {
    let percentage = editorState.canvasScale;
    switch (type) {
      case "in":
        if (editorState.canvasScale < 1) {
          percentage += 0.25;
        }
        break;
      case "out":
        if (editorState.canvasScale > 0.25) {
          percentage -= 0.25;
        }
        break;
      default:
        break;
    }
    setCanvasSize(percentage);
  };

  const setCanvasSize = (percentage) => {
    var canvas = editorState.canvas;

    canvas.setHeight(
      canvas.getHeight() * (percentage / editorState.canvasScale)
    );
    canvas.setWidth(canvas.getWidth() * (percentage / editorState.canvasScale));
    const objects = canvas.getObjects();

    for (var i in objects) {
      const scaleX = objects[i].scaleX;
      const scaleY = objects[i].scaleY;
      const left = objects[i].left;
      const top = objects[i].top;
      const tempScaleX = scaleX * (percentage / editorState.canvasScale);
      const tempScaleY = scaleY * (percentage / editorState.canvasScale);
      const tempLeft = left * (percentage / editorState.canvasScale);
      const tempTop = top * (percentage / editorState.canvasScale);
      objects[i].scaleX = tempScaleX;
      objects[i].scaleY = tempScaleY;
      objects[i].left = tempLeft;
      objects[i].top = tempTop;
      objects[i].setCoords();
    }
    addBackground(editorState.backgroundImage);
    setEditorState({ ...editorState, canvasScale: percentage });
    canvas.renderAll();
  };

  const handleTextDecor = (e, el) => {
    const { canvas: oldCanvas } = editorState;
    const checked = e.target.checked;

    const { id, checkValue, uncheckValue, property } = el;

    if (!oldCanvas.getActiveObject()) return;
    const activeObj = oldCanvas.getActiveObject();
    activeObj.set(
      property,
      checked ? checkValue || checked : uncheckValue || checked
    );
    oldCanvas.renderAll();

    setEditorState({
      ...editorState,
      canvas: oldCanvas,
    });
  };

  return (
    <div id="Canvas">
      <Navbar>
        <a
          className="download"
          href={editorState.href}
          onClick={() => download()}
        >
          Download
        </a>
      </Navbar>
      <div className="pt-12">
        <div className="w-[385px] bg-white text-black fixed top-0 left-0 z-40">
          <div className="flex flex-col max-h-screen overflow-auto pb-14 gap-6 mt-12 p-3">
            {/* Image Upload */}
            <ImageUpload onImageChange={onImageChange} />

            {/* Text Properties */}
            <TextProperties
              editorState={editorState}
              textColorChange={textColorChange}
              textBgColorChange={textBgColorChange}
              onFontSize={onFontSize}
              addText={addText}
            />

            {/* Text Decoration */}
            <TextDecoration
              textDecorationData={textDecorationData}
              handleTextDecor={handleTextDecor}
            />

            {/* Background Properties */}
            <BgProperties
              editorState={editorState}
              addBackground={addBackground}
              removeBackground={removeBackground}
              onColorChange={onColorChange}
            />

            <Template
              editorState={editorState}
              addTemplate={addTemplate}
              handleCanvasZoom={handleCanvasZoom}
            />
          </div>
        </div>
        <div className="ml-[385px] min-h-screen flex justify-center items-center">
          <canvas
            id="canvas"
            className="w-full h-full border m-auto"
            ref={containerRef}
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;
