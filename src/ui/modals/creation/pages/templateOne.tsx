import React, { useEffect, useRef, useState } from "react";
import AudioUpload from "../multimedia/audio/page";
import dynamic from "next/dynamic";
import VideoUpload from "../multimedia/video/page";
import ButtonOutlined from "@/ui/components/buttons/ButtonOutlined";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Template1: React.FC<{ content: any; onContentChange: any }> = ({
  content,
  onContentChange,
}) => {
  const editor = useRef<any>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [videoBlob, setVideoBlob] = useState<Blob | string | null>(null);

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

  useEffect(() => {
    if (imageBlob) {
      onContentChange(content, imageBlob, audioBlob, videoBlob);
    } else {
      onContentChange(content, null, audioBlob, videoBlob);
    }
  }, [imageBlob]);

  useEffect(() => {
    if (audioBlob) {
      onContentChange(content, imageBlob, audioBlob, videoBlob);
    } else {
      onContentChange(content, imageBlob, null, videoBlob);
    }
  }, [audioBlob]);

  useEffect(() => {
    if (videoBlob) {
      onContentChange(content, imageBlob, audioBlob, videoBlob);
    } else {
      onContentChange(content, imageBlob, audioBlob, null);
    }
  }, [videoBlob]);

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

  const generateVideoSource = () => {
    if (videoBlob) {
      if (typeof videoBlob === "string") {
        return videoBlob;
      } else {
        return URL.createObjectURL(videoBlob);
      }
    }
    return "";
  };

  const generateVideoType = () => {
    if (videoBlob) {
      if (typeof videoBlob === "string") {
        return "video/mp4";
      } else {
        return videoBlob.type;
      }
    }
    return "";
  };

  const extractYouTubeId = (url: any) => {
    const regex =
      /(youtu.be\/|youtube.com\/(watch\?(.*&)?v=|(embed|v)\/))([^?&"'>]+)/;
    const matches = url.match(regex);
    return matches ? matches[5] : null;
  };

  return (
    <div className="bg-bgColorDark p-8 rounded shadow-md w-full max-w-4xl mx-auto">
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
              "brush",
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
              "paragraph",
              "video",
            ],
          }}
          onBlur={(newContent) =>
            onContentChange(newContent, imageBlob, audioBlob, videoBlob)
          }
        />
      </div>
      <div className="mt-4 gap-4 flex flex-wrap items-center justify-center">
        <div className="flex items-center">
          {audioBlob ? (
            <div className="bg-bgColorRight rounded-lg shadow-md p-4">
              <audio controls>
                <source
                  src={URL.createObjectURL(audioBlob)}
                  type={audioBlob.type}
                />
              </audio>
              <ButtonOutlined
                onClick={() => {
                  setAudioBlob(null);
                }}
                className={
                  "border-red-600 mt-3 text-red-600 hover:text-white hover:bg-red-600"
                }
              >
                Quitar audio
              </ButtonOutlined>
            </div>
          ) : (
            <AudioUpload
              onAudioSelected={(file: any) => {
                setAudioBlob(file);
              }}
            ></AudioUpload>
          )}
        </div>
        <div className="flex items-center">
          {videoBlob ? (
            <div className="bg-bgColorRight rounded-lg shadow-md p-4">
              {typeof videoBlob === "string" ? (
                videoBlob.includes("youtube") ||
                videoBlob.includes("youtu.be") ? (
                  <iframe
                    width="400"
                    height="200"
                    src={`https://www.youtube.com/embed/${extractYouTubeId(
                      videoBlob
                    )}?si=1hJICvjoozCQ6RdW`}
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video controls>
                    <source
                      src={generateVideoSource()}
                      type={generateVideoType()}
                    />
                  </video>
                )
              ) : (
                <video controls>
                  <source
                    src={generateVideoSource()}
                    type={generateVideoType()}
                  />
                </video>
              )}
              <ButtonOutlined
                onClick={() => {
                  setVideoBlob(null);
                }}
                className={
                  "border-red-600 mt-3 text-red-600 hover:text-white hover:bg-red-600"
                }
              >
                Quitar video
              </ButtonOutlined>
            </div>
          ) : (
            <VideoUpload
              onAudioSelected={(video: any) => {
                setVideoBlob(video);
              }}
            ></VideoUpload>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template1;
