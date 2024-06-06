import React, { useEffect, useRef, useState } from "react";
import AudioUpload from "../multimedia/audio/page";
import dynamic from "next/dynamic";
import VideoUpload from "../multimedia/video/page";
import ButtonOutlined from "@/ui/components/buttons/ButtonOutlined";
import Image from "next/image";
import { Editor } from "@tinymce/tinymce-react";

const Template1: React.FC<{
  content: any;
  onContentChange: any;
  image?: any;
  audio?: any;
  video?: any;
}> = ({ content, onContentChange, image, audio, video }) => {
  const [imageBlob, setImageBlob] = useState<File | null | string>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null | string>(null);
  const [videoBlob, setVideoBlob] = useState<Blob | string | null>(null);

  useEffect(() => {
    if (image) {
      setImageBlob(image);
    }
    if (audio) {
      setAudioBlob(audio);
    }
    if (video) {
      setVideoBlob(video);
    }
  }, [image, video, audio]);

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setImageBlob(file);
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
    <div className="bg-bgColorDark p-8 rounded shadow-md w-full max-w-4xl mx-auto items-center justify-center">
      <div
        className="bg-gray-200 h-64 w-full flex items-center justify-center mb-4 cursor-pointer"
        onClick={handleImageUpload}
      >
        {imageBlob ? (
          <Image
            src={
              imageBlob instanceof File
                ? URL.createObjectURL(imageBlob as Blob)
                : imageBlob
            }
            width={400}
            height={100}
            alt="Imagen"
            className="max-h-full max-w-full"
          />
        ) : (
          <span className="text-gray-500">
            Haga clic para agregar una imagen
          </span>
        )}
      </div>
      <div className="max-w-2xl inline">
        <Editor
          apiKey="pxp94q2uamitsp5ok6hrdctn5uu10ei9emrfbozu7576fwa4"
          onEditorChange={(newContent) => {
            onContentChange(newContent, imageBlob, audioBlob, videoBlob);
          }}
          init={{
            plugins: "wordcount advlist lists help",
            language: "es",
            menu: {
              format: {
                title: "Formato",
                items:
                  "blocks fontfamily fontsize | bold italic underline strikethrough  align lineheight | numlist bullist | forecolor backcolor",
              },
              edit: {
                title: "Edición",
                items: "cut copy paste | selectall | searchreplace",
              },
              help: {
                title: "Ayuda",
                items: "help",
              },
            },
            menubar: "format | edit | help",
            help_tabs: ["shortcuts", "keyboardnav"],
            toolbar_mode: "sliding",
            branding: false,
            placeholder: "Ingrese el texto de su página",
            toolbar:
              "undo redo | blocks fontfamily fontsize | forecolor backcolor | bold italic underline strikethrough  | align lineheight | numlist bullist",
          }}
          value={content}
        />
      </div>
      <div className="mt-4 gap-4 flex flex-wrap items-center justify-center">
        <div className="flex items-center">
          {audioBlob ? (
            <div className="bg-bgColorRight rounded-lg shadow-md p-4">
              <audio controls>
                <source
                  src={
                    audioBlob instanceof File
                      ? URL.createObjectURL(audioBlob as Blob)
                      : (audioBlob as string)
                  }
                  type={
                    audioBlob instanceof File ? audioBlob.type : "audio/mpeg"
                  }
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
