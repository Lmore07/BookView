import ButtonOutlined from "@/ui/components/buttons/ButtonOutlined";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AudioUpload from "../multimedia/audio/page";
import VideoUpload from "../multimedia/video/page";

const Template5: React.FC<{
  onContentChange: any;
  audio?: any;
  video?: any;
  image?: any;
}> = ({ onContentChange, audio, video, image }) => {
  const [audioBlob, setAudioBlob] = useState<Blob | null | string>(null);
  const [videoBlob, setVideoBlob] = useState<Blob | string | null>(null);
  const [imageBlob, setImageBlob] = useState<File | null | string>(null);

  useEffect(() => {
    if (audioBlob) {
      onContentChange(imageBlob, audioBlob, videoBlob);
    } else {
      onContentChange(imageBlob, null, videoBlob);
    }
  }, [audioBlob]);

  useEffect(() => {
    if (imageBlob) {
      onContentChange(imageBlob, audioBlob, videoBlob);
    } else {
      onContentChange(null, audioBlob, videoBlob);
    }
  }, [imageBlob]);

  useEffect(() => {
    if (audio) {
      setAudioBlob(audio);
    }
    if (video) {
      setVideoBlob(video);
    }
    if (image) {
      setImageBlob(image);
    }
  }, [video, audio]);

  useEffect(() => {
    if (videoBlob) {
      onContentChange(imageBlob, audioBlob, videoBlob);
    } else {
      onContentChange(imageBlob, audioBlob, null);
    }
  }, [videoBlob]);

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
    <div className="bg-bgColorDark p-8 rounded shadow-md w-full mx-auto flex flex-col items-center">
      <div className="flex">
        <div
          className="bg-gray-200 flex items-center justify-center h-96 w-80 cursor-pointer"
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
              height={200}
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
      <div className="mt-4 gap-4 flex flex-wrap items-center justify-center">
        <div className="flex items-center">
          {audioBlob != null ? (
            <div className="bg-bgColorRight rounded-lg shadow-md p-4">
              <audio controls>
                <source
                  src={
                    audioBlob instanceof Blob
                      ? URL.createObjectURL(audioBlob)
                      : audioBlob
                  }
                  type={
                    audioBlob instanceof Blob ? audioBlob.type : "audio/mpeg"
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
          {videoBlob != null ? (
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

export default Template5;
