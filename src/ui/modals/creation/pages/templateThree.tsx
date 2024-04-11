import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";

const Template3: React.FC<{ content: any; onContentChange: any }> = ({
  content,
  onContentChange,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const editor = useRef(null);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      setImage(file || null);
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImageBlob(
            new Blob([reader.result as ArrayBuffer], { type: file.type })
          );
        };
        reader.readAsArrayBuffer(file);
      } else {
        setImageBlob(null);
      }
    };
    input.click();
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-full mx-auto grid grid-cols-3">
      <div className="flex-wrap col-span-2">
        <JoditEditor
          ref={editor}
          value={content}
          config={{
            readonly: false,
            toolbarButtonSize: "middle",
            toolbar: true,
            language: "es",
            buttons: [
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "font",
              "fontsize",
              "ul",
              "ol",
              "outdent",
              "indent",
              "table",
              "link",
              "align",
              "undo",
              "redo",
              "fullsize",
            ],
            safeMode: true,
            useSplitMode: false,
            removeButtons: [
              "about",
              "eraser",
              "selectall",
              "print",
              "copyformat",
              "speechRecognize",
              "hr",
              "brush",
              "paragraph",
              "image",
              "video",
            ],
          }}
          onBlur={(newContent) => onContentChange(newContent, imageBlob)}
          onChange={(newContent) => {}}
        />
      </div>
      <div
        className="bg-gray-200 flex items-center justify-center ml-4 cursor-pointer"
        onClick={handleImageUpload}
      >
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="Imagen"
            className="max-h-full max-w-full"
          />
        ) : (
          <span className="text-gray-600 text-center">
            Haga clic para agregar una imagen
          </span>
        )}
      </div>
    </div>
  );
};

export default Template3;
