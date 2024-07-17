import ButtonOutlined from "@/ui/components/buttons/ButtonOutlined";
import { Editor } from "@tinymce/tinymce-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import AudioUpload from "../multimedia/audio/page";
import VideoUpload from "../multimedia/video/page";
import { Tooltip } from "@mui/material";
import { VoiceRecorderContext } from "@/libs/contexts/speechToTextContext";
import { parseHtmlToText } from "@/libs/services/parseHtmlToText";

const Template4: React.FC<{
  content: any;
  onContentChange: any;
  audio?: any;
  video?: any;
}> = ({ content, onContentChange, audio, video }) => {
  const [audioBlob, setAudioBlob] = useState<Blob | null | string>(null);
  const [videoBlob, setVideoBlob] = useState<Blob | string | null>(null);
  const { setIsListening, finalTranscript, currentComponentRef } =
    useContext(VoiceRecorderContext)!;
  const componentRef = useRef<HTMLDivElement>(null);
  const [contentVoice, setContentVoice] = useState(content);
  var contentTemp: string = "";

  useEffect(() => {
    if (audioBlob) {
      onContentChange(contentVoice, null, audioBlob, videoBlob);
    } else {
      onContentChange(contentVoice, null, null, videoBlob);
    }
  }, [audioBlob]);

  useEffect(() => {
    if (audio) {
      setAudioBlob(audio);
    }
    if (video) {
      setVideoBlob(video);
    }
  }, [video, audio]);

  useEffect(() => {
    if (videoBlob) {
      onContentChange(contentVoice, null, audioBlob, videoBlob);
    } else {
      onContentChange(contentVoice, null, audioBlob, null);
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


  useEffect(() => {
    if (
      finalTranscript.length > 0 &&
      componentRef.current === currentComponentRef.current
    ) {
      contentTemp = finalTranscript;
    }
  }, [finalTranscript]);

  useEffect(() => {
    currentComponentRef.current = componentRef.current;
  }, []);

  return (
    <div
      ref={componentRef}
      className="bg-bgColorDark p-8 rounded shadow-md w-full mx-auto items-center"
    >
      <div className="max-w-2xl inline relative">
        <div className="absolute z-50 right-2 top-2">
          <Tooltip arrow title={"Dictar"} placement="top">
            <span
              className="cursor-pointer"
              onClick={() => {
                setIsListening(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-9 h-9"
                viewBox="0 0 16 16"
                fill="#c5910d"
              >
                <path
                  fillRule="evenodd"
                  d="M8 1a2 2 0 0 0-2 2v4a2 2 0 1 0 4 0V3a2 2 0 0 0-2-2"
                />
                <path d="M4.5 7A.75.75 0 0 0 3 7a5.001 5.001 0 0 0 4.25 4.944V13.5h-1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-1.5v-1.556A5.001 5.001 0 0 0 13 7a.75.75 0 0 0-1.5 0a3.5 3.5 0 1 1-7 0" />
              </svg>
            </span>
          </Tooltip>
        </div>
        <Editor
          apiKey="pxp94q2uamitsp5ok6hrdctn5uu10ei9emrfbozu7576fwa4"
          onFocusIn={() => {
            currentComponentRef.current = componentRef.current;
          }}
          onEditorChange={(newContent) => {
            if (newContent.length == 0) {
              contentTemp = "";
            } else {
              contentTemp = parseHtmlToText(newContent);
            }
            setContentVoice(newContent);
            onContentChange(contentVoice, null, audioBlob, videoBlob);
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
          value={contentVoice}
        />
      </div>
      <div className="mt-4 gap-4 flex flex-wrap items-center justify-center">
        <div className="flex items-center">
          {audioBlob ? (
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
