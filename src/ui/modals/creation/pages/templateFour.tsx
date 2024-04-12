import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import ButtonOutlined from "@/ui/components/buttons/ButtonOutlined";
import AudioUpload from "../multimedia/audio/page";
import VideoUpload from "../multimedia/video/page";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Template4: React.FC<{ content: any; onContentChange: any }> = ({
  content,
  onContentChange,
}) => {
  const editor = useRef(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [videoBlob, setVideoBlob] = useState<Blob | string | null>(null);

  useEffect(() => {
    if (audioBlob) {
      onContentChange(content, null, audioBlob, videoBlob);
    } else {
      onContentChange(content, null, null, videoBlob);
    }
  }, [audioBlob]);

  useEffect(() => {
    if (videoBlob) {
      onContentChange(content, null, audioBlob, videoBlob);
    } else {
      onContentChange(content, null, audioBlob, null);
    }
  }, [videoBlob]);

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
    <div className="bg-white p-8 rounded shadow-md w-full mx-auto grid">
      <div className="flex-wrap">
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
          onBlur={(newContent) =>
            onContentChange(newContent, null, audioBlob, videoBlob)
          }
          onChange={(newContent) => {}}
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

export default Template4;
