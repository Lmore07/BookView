import { VoiceRecorderContext } from "@/libs/contexts/speechToTextContext";
import { parseHtmlToText } from "@/libs/services/parseHtmlToText";
import ButtonOutlined from "@/ui/components/buttons/ButtonOutlined";
import { Tooltip } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import AudioUpload from "../multimedia/audio/page";
import VideoUpload from "../multimedia/video/page";

const Template4: React.FC<{
  content: any;
  onContentChange: any;
  audio?: any;
  video?: any;
}> = ({ content, onContentChange, audio, video }) => {
  const [audioBlob, setAudioBlob] = useState<Blob | null | string>(null);
  const [videoBlob, setVideoBlob] = useState<Blob | string | null>(null);
  const { setIsListening, finalTranscript, currentComponentRef, isListening } =
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
          <Tooltip
            arrow
            title={isListening ? "Detener" : "Dictar"}
            placement="top"
          >
            {isListening ? (
              <span
                className="cursor-pointer"
                aria-label="Dictado de comandos"
                onClick={() => {
                  setIsListening(false);
                }}
              >
                <svg
                  viewBox="0 0 16 16"
                  className="w-9 h-9"
                  fill="#ff0000"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="m 8 0 c -1.660156 0 -3 1.339844 -3 3 v 0.9375 l -3.46875 -3.46875 l -1.0625 1.0625 l 14 14 l 1.0625 -1.0625 l -2.792969 -2.792969 c 0.789063 -1.011719 1.261719 -2.285156 1.261719 -3.664062 v -2.011719 h -1.5 v 2.011719 c 0 0.972656 -0.304688 1.867187 -0.824219 2.601562 l -1.089843 -1.089843 c 0.261718 -0.445313 0.414062 -0.964844 0.414062 -1.523438 v -5 c 0 -1.660156 -1.339844 -3 -3 -3 z m -6 6 v 2.011719 c 0 2.964843 2.164062 5.429687 5 5.90625 v 2.082031 h 2 v -2.082031 c 0.5 -0.085938 0.976562 -0.230469 1.425781 -0.429688 l -1.164062 -1.164062 c -0.398438 0.113281 -0.824219 0.175781 -1.261719 0.175781 c -2.507812 0 -4.5 -1.988281 -4.5 -4.488281 v -1.449219 l -0.5625 -0.5625 z m 3.003906 2.066406 c 0.035156 1.609375 1.320313 2.894532 2.929688 2.929688 z m 0 0"></path>
                  </g>
                </svg>
              </span>
            ) : (
              <span
                className="cursor-pointer"
                aria-label="Dictado de comandos"
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
            )}
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
