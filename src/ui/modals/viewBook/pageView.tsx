import { CoverI } from "@/libs/interfaces/books.interface";
import { generateSpeech } from "@/libs/services/generateSpeech";
import { generateText } from "@/libs/services/generateText";
import { parseHtmlToText } from "@/libs/services/parseHtmlToText";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/shadcn/ui/tooltip";
import { Chip, Divider } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

interface PageProps {
  page: {
    numberPage: number;
    template: string;
    content: any;
    image: any;
    audio: any;
    video: any;
  };
  coverInfo?: CoverI;
}

const PageContent: React.FC<PageProps> = ({ page, coverInfo }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  const source = useRef<AudioBufferSourceNode | null>(null);
  let audioRef = useRef<HTMLAudioElement | null>(null);
  const [selectedText, setSelectedText] = useState("");
  const [textGenerated, setTextGenerated] = useState("");
  const [loadingVoice, setLoadingVoice] = useState(false);
  const [open, setOpen] = React.useState(false);

  const startSpeech = async () => {
    let audioData: any;
    if (page.audio) {
      const audio = new Audio(page.audio);
      audioRef.current = audio;
      audio.play();
      setIsPlayingAudio(true);
      setLoadingVoice(false);
      audio.addEventListener("ended", () => {
        setIsPlayingAudio(false);
      });
    } else {
      let textContent: any;
      if (page.template == "Cover") {
        audioData = await generateSpeech(
          page.content
            .replaceAll('"', "")
            .replaceAll("{", "")
            .replaceAll("}", "")
        );
      } else {
        textContent = parseHtmlToText(page.content);
        audioData = await generateSpeech(
          textContent
            .replaceAll('"', "")
            .replaceAll("{", "")
            .replaceAll("}", "")
        );
      }
      const ctx = new AudioContext();
      await ctx.decodeAudioData(audioData, (buffer) => {
        const src = ctx.createBufferSource();
        src.buffer = buffer;
        src.connect(ctx.destination);
        setLoadingVoice(false);
        src.start();
        audioContext.current = ctx;
        source.current = src;
        setIsPlayingAudio(true);
        src.onended = () => {
          setIsPlayingAudio(false);
        };
      });
    }
  };

  const stopSpeech = () => {
    if (source.current) {
      source.current.stop();
      audioContext.current?.close();
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlayingAudio(false);
  };

  const handleSpeech = () => {
    if (isPlayingAudio) {
      stopSpeech();
    } else {
      setLoadingVoice(true);
      startSpeech();
    }
  };

  const handleTextSelection = async (event: any) => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();
    setSelectedText(selectedText ?? "vació");
    if (selectedText != "" && selectedText != null) {
      setTextGenerated(await generateText(selectedText));
      setOpen(true);
    }
  };

  const generateVideoSource = () => {
    if (page.video) {
      if (typeof page.video === "string") {
        return page.video;
      } else {
        return URL.createObjectURL(page.video);
      }
    }
    return "";
  };

  const generateVideoType = () => {
    if (page.video) {
      if (typeof page.video === "string") {
        return "video/mp4";
      } else {
        return page.video.type;
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
    if (isPlayingAudio) {
      stopSpeech();
    }
  }, [page]);

  useEffect(() => {
    if (open) {
      const wordsCount = textGenerated.split(" ").length + 1;
      const timeToClose = ((wordsCount * 60) / 100) * 1000;
      const timer = setTimeout(() => {
        setOpen(false);
      }, timeToClose);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [open]);

  return (
    <div className="bg-bgColorDark rounded-lg shadow-md  flex flex-col items-center justify-center">
      <Divider className="py-1">
        {page.numberPage == 0 ? null : (
          <Chip
            className="font-semibold"
            label={`Página N° ${page.numberPage}`}
            size="medium"
            sx={{ color: "var(--text--RegisterLabel)" }}
          />
        )}
      </Divider>
      <div className="px-4 pb-1 w-full pt-2 font-custom">
        {page.template === "Cover" && (
          <div className="overflow-y-auto min-h-[10dvh] max-h-[60dvh]">
            <div
              className="flex flex-col items-center"
              onMouseUp={handleTextSelection}
            >
              <h1 className="text-3xl responsiveText m-0 font-bold">
                {coverInfo?.bookName}
              </h1>
              <div className="text-lg  font-light pb-5">
                Autores: {coverInfo?.authors.join(", ")}
              </div>
              <Image
                src={
                  coverInfo!.coverPhoto instanceof File
                    ? URL.createObjectURL(coverInfo!.coverPhoto as Blob)
                    : coverInfo!.coverPhoto
                }
                className="max-w-64 max-h-auto"
                alt="Portada del libro"
                width={500}
                height={500}
              />
              <div className="text-sm  font-light pt-5">
                Publicado: {coverInfo?.publicationDate.substring(0, 10)}
              </div>
            </div>
          </div>
        )}
        {page.template === "Template1" && (
          <div
            className={`${
              isPlayingVideo ? "grid-cols-2" : "grid-cols-1"
            } grid overflow-hidden`}
          >
            <div>
              <div className="flex items-center  justify-center mb-2">
                {page.image && (
                  <div
                    className="relative cursor-pointer transition-all duration-300 ease-in-out"
                    onClick={() => {
                      const dialog = document.getElementById(
                        "imagePreview"
                      ) as HTMLDialogElement;
                      dialog.showModal();
                    }}
                  >
                    <Image
                      src={
                        page.image instanceof File
                          ? URL.createObjectURL(page.image as Blob)
                          : page.image
                      }
                      alt="Imagen"
                      className="max-h-40 max-w-64"
                      onClick={() => {
                        const dialog = document.getElementById(
                          "imagePreview"
                        ) as HTMLDialogElement;
                        dialog.showModal();
                      }}
                      width={300}
                      height={150}
                    />
                    <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-10 h-10"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12ZM14 7.75C13.5858 7.75 13.25 7.41421 13.25 7C13.25 6.58579 13.5858 6.25 14 6.25H17C17.4142 6.25 17.75 6.58579 17.75 7V10C17.75 10.4142 17.4142 10.75 17 10.75C16.5858 10.75 16.25 10.4142 16.25 10V8.81066L14.0303 11.0303C13.7374 11.3232 13.2626 11.3232 12.9697 11.0303C12.6768 10.7374 12.6768 10.2626 12.9697 9.96967L15.1893 7.75H14ZM11.0303 12.9697C11.3232 13.2626 11.3232 13.7374 11.0303 14.0303L8.81066 16.25H10C10.4142 16.25 10.75 16.5858 10.75 17C10.75 17.4142 10.4142 17.75 10 17.75H7C6.58579 17.75 6.25 17.4142 6.25 17V14C6.25 13.5858 6.58579 13.25 7 13.25C7.41421 13.25 7.75 13.5858 7.75 14V15.1893L9.96967 12.9697C10.2626 12.6768 10.7374 12.6768 11.0303 12.9697ZM10.75 7C10.75 7.41421 10.4142 7.75 10 7.75H8.81066L11.0303 9.96967C11.3232 10.2626 11.3232 10.7374 11.0303 11.0303C10.7374 11.3232 10.2626 11.3232 9.96967 11.0303L7.75 8.81066V10C7.75 10.4142 7.41421 10.75 7 10.75C6.58579 10.75 6.25 10.4142 6.25 10V7C6.25 6.58579 6.58579 6.25 7 6.25H10C10.4142 6.25 10.75 6.58579 10.75 7ZM12.9697 14.0303C12.6768 13.7374 12.6768 13.2626 12.9697 12.9697C13.2626 12.6768 13.7374 12.6768 14.0303 12.9697L16.25 15.1893V14C16.25 13.5858 16.5858 13.25 17 13.25C17.4142 13.25 17.75 13.5858 17.75 14V17C17.75 17.4142 17.4142 17.75 17 17.75H14C13.5858 17.75 13.25 17.4142 13.25 17C13.25 16.5858 13.5858 16.25 14 16.25H15.1893L12.9697 14.0303Z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div
                onMouseUp={handleTextSelection}
                className="break-words grid-cols-2  max-w-none min-h-[10dvh] max-h-[50dvh] overflow-y-auto"
                dangerouslySetInnerHTML={{
                  __html: page.content.replace(
                    /<ul>/g,
                    '<ul style="list-style: disc; padding-left: 60px;">'
                  ),
                }}
              ></div>
            </div>
            <div className="flex justify-center items-center">
              {isPlayingVideo && (
                <div className="flex items-center overflow-y-hidden self-center justify-center">
                  {typeof page.video === "string" ? (
                    page.video.includes("youtube") ||
                    page.video.includes("youtu.be") ? (
                      <iframe
                        width="600"
                        height="500"
                        src={`https://www.youtube.com/embed/${extractYouTubeId(
                          page.video
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
                </div>
              )}
            </div>
          </div>
        )}
        {page.template === "Template2" && (
          <div
            className={`${
              isPlayingVideo ? "grid-cols-7" : "grid-cols-5"
            } gap-3 grid overflow-hidden`}
          >
            <div className="flex items-center justify-center col-span-2">
              {page.image && (
                <div
                  className="relative w-full cursor-pointer transition-all duration-300 ease-in-out"
                  onClick={() => {
                    const dialog = document.getElementById(
                      "imagePreview"
                    ) as HTMLDialogElement;
                    dialog.showModal();
                  }}
                >
                  <Image
                    src={
                      page.image instanceof File
                        ? URL.createObjectURL(page.image as Blob)
                        : page.image
                    }
                    alt="Imagen 2"
                    className="object-cover w-full h-auto"
                    width={200}
                    height={300}
                    onClick={() => {
                      const dialog = document.getElementById(
                        "imagePreview"
                      ) as HTMLDialogElement;
                      dialog.showModal();
                    }}
                  />
                  <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-10 h-10"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12ZM14 7.75C13.5858 7.75 13.25 7.41421 13.25 7C13.25 6.58579 13.5858 6.25 14 6.25H17C17.4142 6.25 17.75 6.58579 17.75 7V10C17.75 10.4142 17.4142 10.75 17 10.75C16.5858 10.75 16.25 10.4142 16.25 10V8.81066L14.0303 11.0303C13.7374 11.3232 13.2626 11.3232 12.9697 11.0303C12.6768 10.7374 12.6768 10.2626 12.9697 9.96967L15.1893 7.75H14ZM11.0303 12.9697C11.3232 13.2626 11.3232 13.7374 11.0303 14.0303L8.81066 16.25H10C10.4142 16.25 10.75 16.5858 10.75 17C10.75 17.4142 10.4142 17.75 10 17.75H7C6.58579 17.75 6.25 17.4142 6.25 17V14C6.25 13.5858 6.58579 13.25 7 13.25C7.41421 13.25 7.75 13.5858 7.75 14V15.1893L9.96967 12.9697C10.2626 12.6768 10.7374 12.6768 11.0303 12.9697ZM10.75 7C10.75 7.41421 10.4142 7.75 10 7.75H8.81066L11.0303 9.96967C11.3232 10.2626 11.3232 10.7374 11.0303 11.0303C10.7374 11.3232 10.2626 11.3232 9.96967 11.0303L7.75 8.81066V10C7.75 10.4142 7.41421 10.75 7 10.75C6.58579 10.75 6.25 10.4142 6.25 10V7C6.25 6.58579 6.58579 6.25 7 6.25H10C10.4142 6.25 10.75 6.58579 10.75 7ZM12.9697 14.0303C12.6768 13.7374 12.6768 13.2626 12.9697 12.9697C13.2626 12.6768 13.7374 12.6768 14.0303 12.9697L16.25 15.1893V14C16.25 13.5858 16.5858 13.25 17 13.25C17.4142 13.25 17.75 13.5858 17.75 14V17C17.75 17.4142 17.4142 17.75 17 17.75H14C13.5858 17.75 13.25 17.4142 13.25 17C13.25 16.5858 13.5858 16.25 14 16.25H15.1893L12.9697 14.0303Z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </div>
              )}
            </div>
            <div className="col-span-3">
              <div
                className="break-words  max-w-none min-h-[10dvh] max-h-[50dvh] overflow-y-auto"
                onMouseUp={handleTextSelection}
                dangerouslySetInnerHTML={{
                  __html: page.content.replace(
                    /<ul>/g,
                    '<ul style="list-style: disc; padding-left: 60px;">'
                  ),
                }}
              ></div>
            </div>
            <div className="flex items-center col-span-2">
              {isPlayingVideo && (
                <div className="flex flex-col items-center overflow-y-hidden justify-center">
                  <span className="font-semibold">Video:</span>
                  {typeof page.video === "string" ? (
                    page.video.includes("youtube") ||
                    page.video.includes("youtu.be") ? (
                      <iframe
                        width="600"
                        height="500"
                        src={`https://www.youtube.com/embed/${extractYouTubeId(
                          page.video
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
                </div>
              )}
            </div>
          </div>
        )}
        {page.template === "Template3" && (
          <div
            className={`${
              isPlayingVideo ? "grid-cols-7" : "grid-cols-5"
            } grid gap-3 overflow-hidden`}
          >
            <div className="col-span-3">
              <div
                className="break-words max-w-none  min-h-[10dvh] max-h-[50dvh] overflow-y-auto"
                onMouseUp={handleTextSelection}
                dangerouslySetInnerHTML={{
                  __html: page.content.replace(
                    /<ul>/g,
                    '<ul style="list-style: disc; padding-left: 60px;">'
                  ),
                }}
              ></div>
            </div>
            <div className="flex items-center justify-center col-span-2">
              {page.image && (
                <div
                  className="relative w-full cursor-pointer transition-all duration-300 ease-in-out"
                  onClick={() => {
                    const dialog = document.getElementById(
                      "imagePreview"
                    ) as HTMLDialogElement;
                    dialog.showModal();
                  }}
                >
                  <Image
                    src={
                      page.image instanceof File
                        ? URL.createObjectURL(page.image as Blob)
                        : page.image
                    }
                    alt="Imagen 2"
                    className="object-cover w-full h-auto"
                    width={200}
                    height={300}
                    onClick={() => {
                      const dialog = document.getElementById(
                        "imagePreview"
                      ) as HTMLDialogElement;
                      dialog.showModal();
                    }}
                  />
                  <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-10 h-10"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12ZM14 7.75C13.5858 7.75 13.25 7.41421 13.25 7C13.25 6.58579 13.5858 6.25 14 6.25H17C17.4142 6.25 17.75 6.58579 17.75 7V10C17.75 10.4142 17.4142 10.75 17 10.75C16.5858 10.75 16.25 10.4142 16.25 10V8.81066L14.0303 11.0303C13.7374 11.3232 13.2626 11.3232 12.9697 11.0303C12.6768 10.7374 12.6768 10.2626 12.9697 9.96967L15.1893 7.75H14ZM11.0303 12.9697C11.3232 13.2626 11.3232 13.7374 11.0303 14.0303L8.81066 16.25H10C10.4142 16.25 10.75 16.5858 10.75 17C10.75 17.4142 10.4142 17.75 10 17.75H7C6.58579 17.75 6.25 17.4142 6.25 17V14C6.25 13.5858 6.58579 13.25 7 13.25C7.41421 13.25 7.75 13.5858 7.75 14V15.1893L9.96967 12.9697C10.2626 12.6768 10.7374 12.6768 11.0303 12.9697ZM10.75 7C10.75 7.41421 10.4142 7.75 10 7.75H8.81066L11.0303 9.96967C11.3232 10.2626 11.3232 10.7374 11.0303 11.0303C10.7374 11.3232 10.2626 11.3232 9.96967 11.0303L7.75 8.81066V10C7.75 10.4142 7.41421 10.75 7 10.75C6.58579 10.75 6.25 10.4142 6.25 10V7C6.25 6.58579 6.58579 6.25 7 6.25H10C10.4142 6.25 10.75 6.58579 10.75 7ZM12.9697 14.0303C12.6768 13.7374 12.6768 13.2626 12.9697 12.9697C13.2626 12.6768 13.7374 12.6768 14.0303 12.9697L16.25 15.1893V14C16.25 13.5858 16.5858 13.25 17 13.25C17.4142 13.25 17.75 13.5858 17.75 14V17C17.75 17.4142 17.4142 17.75 17 17.75H14C13.5858 17.75 13.25 17.4142 13.25 17C13.25 16.5858 13.5858 16.25 14 16.25H15.1893L12.9697 14.0303Z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center col-span-2">
              {isPlayingVideo && (
                <div className="flex flex-col items-center overflow-y-hidden justify-center">
                  <span className="font-semibold">Video:</span>
                  {typeof page.video === "string" ? (
                    page.video.includes("youtube") ||
                    page.video.includes("youtu.be") ? (
                      <iframe
                        width="600"
                        height="500"
                        src={`https://www.youtube.com/embed/${extractYouTubeId(
                          page.video
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
                </div>
              )}
            </div>
          </div>
        )}
        {page.template === "Template4" && (
          <div
            className={`grid ${
              isPlayingVideo ? "grid-cols-4" : "grid-cols-1"
            } gap-2`}
          >
            <div
              onMouseUp={handleTextSelection}
              className="break-words col-span-3 max-w-none min-h-[10dvh] max-h-[50dvh] overflow-y-auto"
              dangerouslySetInnerHTML={{
                __html: page.content.replace(
                  /<ul>/g,
                  '<ul style="list-style: disc; padding-left: 60px;">'
                ),
              }}
            ></div>
            <div className="flex items-center">
              {isPlayingVideo && (
                <div className="flex items-center overflow-y-hidden justify-center">
                  {typeof page.video === "string" ? (
                    page.video.includes("youtube") ||
                    page.video.includes("youtu.be") ? (
                      <iframe
                        width="600"
                        height="500"
                        src={`https://www.youtube.com/embed/${extractYouTubeId(
                          page.video
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
                </div>
              )}
            </div>
          </div>
        )}
        {page.template === "Template5" && (
          <div
            className={`grid gap-3 ${
              isPlayingVideo ? "grid-cols-6" : "grid-cols-1"
            }`}
          >
            <div className="w-full flex items-center justify-center h-full overflow-y-auto max-h-[50dvh] col-span-4">
              <Image
                src={
                  page.image instanceof File
                    ? URL.createObjectURL(page.image as Blob)
                    : page.image
                }
                alt="Imagen 2"
                className="object-cover w-[80%] h-auto"
                width={300}
                height={500}
              />
            </div>
            <div className="flex items-center justify-center col-span-2">
              {isPlayingVideo && (
                <div className="flex items-center overflow-y-hidden justify-center">
                  {typeof page.video === "string" ? (
                    page.video.includes("youtube") ||
                    page.video.includes("youtu.be") ? (
                      <iframe
                        width="600"
                        height="500"
                        src={`https://www.youtube.com/embed/${extractYouTubeId(
                          page.video
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
                </div>
              )}
            </div>
          </div>
        )}
        <div className="flex justify-end mt-1 gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="rounded-full flex items-center border-2 p-1 cursor-pointer">
                  {loadingVoice ? (
                    <span className="loading loading-spinner loading-lg cursor-default"></span>
                  ) : isPlayingAudio ? (
                    <div onClick={handleSpeech}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="#cf0101"
                        className="w-10 h-10"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM8.58579 8.58579C8 9.17157 8 10.1144 8 12C8 13.8856 8 14.8284 8.58579 15.4142C9.17157 16 10.1144 16 12 16C13.8856 16 14.8284 16 15.4142 15.4142C16 14.8284 16 13.8856 16 12C16 10.1144 16 9.17157 15.4142 8.58579C14.8284 8 13.8856 8 12 8C10.1144 8 9.17157 8 8.58579 8.58579Z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  ) : (
                    <div onClick={handleSpeech}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-10 h-10"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <circle cx="10" cy="6.75" r="4"></circle>
                          <ellipse cx="10" cy="17.75" rx="7" ry="4"></ellipse>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18.357 2.36424C18.5702 2.00906 19.0309 1.89388 19.386 2.10699L19.0002 2.75011C19.386 2.10699 19.3857 2.10679 19.386 2.10699L19.3874 2.10783L19.389 2.10878L19.3927 2.11103L19.4023 2.11695C19.4096 2.12153 19.4189 2.12737 19.4299 2.13448C19.4519 2.14871 19.481 2.16809 19.5162 2.19272C19.5865 2.24194 19.6815 2.31244 19.7928 2.4052C20.0149 2.59029 20.3054 2.86678 20.5946 3.24283C21.1775 4.00057 21.7502 5.15746 21.7502 6.75011C21.7502 8.34277 21.1775 9.49966 20.5946 10.2574C20.3054 10.6334 20.0149 10.9099 19.7928 11.095C19.6815 11.1878 19.5865 11.2583 19.5162 11.3075C19.481 11.3321 19.4519 11.3515 19.4299 11.3657C19.4189 11.3729 19.4096 11.3787 19.4023 11.3833L19.3927 11.3892L19.389 11.3914L19.3874 11.3924C19.3871 11.3926 19.386 11.3932 19.0002 10.7501L19.386 11.3932C19.0309 11.6063 18.5702 11.4912 18.357 11.136C18.1448 10.7823 18.2581 10.324 18.6098 10.1097L18.6154 10.1062C18.6227 10.1014 18.6365 10.0923 18.656 10.0787C18.6951 10.0513 18.7563 10.0062 18.8325 9.9427C18.9854 9.81529 19.195 9.61678 19.4057 9.34283C19.8228 8.80057 20.2502 7.95746 20.2502 6.75011C20.2502 5.54277 19.8228 4.69966 19.4057 4.1574C19.195 3.88345 18.9854 3.68494 18.8325 3.55753C18.7563 3.49403 18.6951 3.44891 18.656 3.42157C18.6365 3.40792 18.6227 3.39878 18.6154 3.39406L18.6098 3.39053C18.2581 3.17625 18.1448 2.71793 18.357 2.36424Z"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.3293 4.4147C16.5146 4.04422 16.9651 3.89405 17.3356 4.07929L17.0002 4.75011C17.3356 4.07929 17.3352 4.07909 17.3356 4.07929L17.3372 4.08011L17.3389 4.08097L17.3426 4.08287L17.3512 4.08732L17.3728 4.09893C17.3891 4.10789 17.4091 4.11934 17.4324 4.13344C17.4787 4.16159 17.5383 4.20058 17.6064 4.25168C17.7423 4.35363 17.9153 4.5059 18.0858 4.71909C18.4345 5.15499 18.7502 5.81792 18.7502 6.75011C18.7502 7.6823 18.4345 8.34524 18.0858 8.78113C17.9153 8.99433 17.7423 9.1466 17.6064 9.24855C17.5383 9.29965 17.4787 9.33863 17.4324 9.36679C17.4091 9.38089 17.3891 9.39234 17.3728 9.40129L17.3512 9.4129L17.3426 9.41736L17.3389 9.41925L17.3372 9.42012C17.3368 9.42032 17.3356 9.42093 17.0064 8.76266L17.3356 9.42093C16.9651 9.60618 16.5146 9.45601 16.3293 9.08552C16.1464 8.71965 16.2906 8.27574 16.651 8.08634C16.6518 8.0859 16.6527 8.08533 16.6539 8.08461C16.6622 8.07956 16.6808 8.06776 16.7064 8.04855C16.758 8.00988 16.8351 7.9434 16.9145 7.84409C17.0658 7.65499 17.2502 7.31792 17.2502 6.75011C17.2502 6.1823 17.0658 5.84524 16.9145 5.65613C16.8351 5.55683 16.758 5.49035 16.7064 5.45168C16.6808 5.43246 16.6622 5.42066 16.6539 5.41562C16.6527 5.4149 16.6518 5.41432 16.651 5.41389C16.2906 5.22449 16.1464 4.78057 16.3293 4.4147Z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {isPlayingAudio ? "Detener" : "Oír"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {page.video && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {isPlayingVideo ? (
                    <div
                      className={`rounded-full border-2 p-1 flex items-center cursor-pointer `}
                      onClick={() => {
                        setIsPlayingVideo(false);
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="#cf0101"
                        className="w-10 h-10"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  ) : (
                    <div
                      className={`rounded-full border-2 p-1 flex items-center cursor-pointer `}
                      onClick={() => {
                        setIsPlayingVideo(true);
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="#1b7505"
                        className="w-10 h-10"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path d="M12 2C13.8452 2 15.3293 2 16.5401 2.08783L13.0986 7.25002H8.40139L11.9014 2H12Z"></path>
                          <path d="M3.46447 3.46447C4.71683 2.2121 6.62194 2.03072 10.0957 2.00445L6.59861 7.25002H2.10418C2.25143 5.48593 2.6068 4.32213 3.46447 3.46447Z"></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2 12C2 10.7633 2 9.68875 2.02644 8.75002H21.9736C22 9.68875 22 10.7633 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12ZM13.014 12.5852C14.338 13.4395 15 13.8666 15 14.5C15 15.1334 14.338 15.5605 13.014 16.4148C11.6719 17.2807 11.0008 17.7137 10.5004 17.3958C10 17.0779 10 16.2186 10 14.5C10 12.7814 10 11.9221 10.5004 11.6042C11.0008 11.2863 11.6719 11.7193 13.014 12.5852Z"
                          ></path>
                          <path d="M21.8958 7.25002C21.7486 5.48593 21.3932 4.32213 20.5355 3.46447C19.9382 2.86714 19.1924 2.51345 18.1987 2.30403L14.9014 7.25002H21.8958Z"></path>
                        </g>
                      </svg>
                    </div>
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  {isPlayingVideo ? "Cerrar video" : "Ver video"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
      {open && (
        <div
          id="dismiss-alert"
          className="hs-removing:translate-x-5 font-custom hs-removing:opacity-0 bottom-1 fixed mx-20 transition duration-300 bg-primary-500 border border-teal-200 text-sm text-white rounded-lg p-4"
          role="alert"
        >
          <div className="flex items-center">
            <div className="me-2">
              <div className="text-lg font-semibold">Definición: </div>
              <div className="text-sm font-medium">
                &quot;{textGenerated}&quot;
              </div>
            </div>
            <div className="ps-3 ms-auto">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  className="inline-flex bg-teal-50 rounded-lg p-1.5 text-black hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-50 focus:ring-teal-600"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Dismiss</span>
                  <svg
                    className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <dialog id="imagePreview" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {page.image != null && (
            <Image
              src={
                page.image instanceof File
                  ? URL.createObjectURL(page.image as Blob)
                  : page.image
              }
              alt="Imagen"
              width={500}
              height={600}
              className="w-full object-contain h-full pt-6"
            />
          )}
        </div>
      </dialog>
    </div>
  );
};

export default PageContent;
