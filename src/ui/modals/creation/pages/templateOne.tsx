import JoditEditor from "jodit-react";
import React, { useRef, useState } from "react";

const Template1: React.FC<{ content: any; onContentChange: any }> = ({
  content,
  onContentChange,
}) => {
  const editor = useRef<any>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

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

  const openPreviewWindow = () => {
    if (editor.current) {
      const previewContent = editor.current.value;
      const previewWindow = window.open("", "_blank");
      previewWindow?.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Previsualización</title>
          </head>
          <body>
            ${previewContent}
          </body>
        </html>
      `);
      previewWindow?.document.close();
    }
  };

  const handleAudioUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "audio/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      setAudio(file || null);
    };
    input.click();
  };

  const handleVideoUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      setVideo(file || null);
    };
    input.click();
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl mx-auto">
      <div
        className="bg-gray-200 h-64 flex items-center justify-center mb-4 cursor-pointer"
        onClick={handleImageUpload}
      >
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="Imagen"
            className="max-h-full max-w-full"
          />
        ) : (
          <span className="text-gray-500">
            Haga clic para agregar una imagen
          </span>
        )}
      </div>
      <div className="flex-grow col-span-2">
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
              "image",
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
              "video",
            ],
          }}
          onBlur={(newContent) => onContentChange(newContent, imageBlob)}
          onChange={(newContent) => {}}
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div className="flex items-center">
          <span className="mr-2 text-gray-600">Seleccione un audio:</span>
          {audio ? (
            <audio controls>
              <source src={URL.createObjectURL(audio)} type={audio.type} />
            </audio>
          ) : (
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
              onClick={handleAudioUpload}
            >
              Elegir audio
            </button>
          )}
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-gray-600">Seleccione un video:</span>
          {video ? (
            <video controls>
              <source src={URL.createObjectURL(video)} type={video.type} />
            </video>
          ) : (
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
              onClick={handleVideoUpload}
            >
              Elegir video
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template1;
