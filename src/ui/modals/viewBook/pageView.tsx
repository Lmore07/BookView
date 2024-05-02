import { generateSpeech } from "@/libs/services/generateSpeech";
import { generateText } from "@/libs/services/generateText";
import { parseHtmlToText } from "@/libs/services/parseHtmlToText";
import { Chip, Divider, Snackbar, IconButton } from "@mui/material";
import React, { useRef, useState } from "react";

interface PageProps {
  page: {
    numberPage: number;
    template: string;
    content: string;
    image: string | null;
    audio: string | null;
    video: string | null;
  };
}

const PageContent: React.FC<PageProps> = ({ page }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  const source = useRef<AudioBufferSourceNode | null>(null);
  const [selectedText, setSelectedText] = useState("");
  const [textGenerated, setTextGenerated] = useState("");

  const [open, setOpen] = React.useState(false);

  const handlePlayVideo = () => {
    setIsPlayingVideo(true);
  };

  const startSpeech = async () => {
    let audioData: any;
    if (page.audio) {
      const audio = new Audio(page.audio);
      audioData = await audio;
      audioData.play();
      setIsPlayingAudio(true);
      audioData.addEventListener("ended", () => {
        setIsPlayingAudio(false);
      });
    } else {
      const textContent = parseHtmlToText(page.content);
      audioData = await generateSpeech(
        textContent.replaceAll('"', "").replaceAll("{", "").replaceAll("}", "")
      );
      const ctx = new AudioContext();
      await ctx.decodeAudioData(audioData, (buffer) => {
        const src = ctx.createBufferSource();
        src.buffer = buffer;
        src.connect(ctx.destination);
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
    console.log("stopSpeech", source.current);
    if (source.current) {
      source.current.stop();
      audioContext.current?.close();
      setIsPlayingAudio(false);
    }
  };

  const handleSpeech = () => {
    if (isPlayingAudio) {
      console.log("Speech is stopped");
      stopSpeech();
    } else {
      startSpeech();
    }
  };

  const handleTextSelection = async (event: any) => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();
    setSelectedText(selectedText ?? "vacio");
    if (selectedText != "" && selectedText != null) {
      setTextGenerated(await generateText(selectedText));
      setOpen(true);
    }
  };

  return (
    <div className="py-5 bg-bgColorDark rounded-lg shadow-md flex flex-col">
      <Divider className="py-1">
        <Chip
          className="font-semibold"
          label={`Página N° ${page.numberPage}`}
          size="medium"
        />
      </Divider>
      <div className="px-4 pb-1 pt-2">
        {page.template === "Template1" && (
          <div className="overflow-hidden">
            <div className="flex items-center justify-center mb-2">
              {page.image && (
                <img
                  src={page.image}
                  alt="Imagen"
                  className="max-h-full max-w-full"
                />
              )}
            </div>
            <div
              onMouseUp={handleTextSelection}
              className="break-words max-w-none"
              dangerouslySetInnerHTML={{ __html: page.content }}
            ></div>
          </div>
        )}
        {page.template === "Template2" && (
          <div className="grid grid-cols-5 gap-3 overflow-hidden">
            <div className="flex items-center justify-center col-span-2">
              {page.image && (
                <img src={page.image} alt="Imagen 2" className="object-cover" />
              )}
            </div>
            <div className="col-span-3">
              <div
                onMouseUp={handleTextSelection}
                className="break-words max-w-none"
                dangerouslySetInnerHTML={{ __html: page.content }}
              ></div>
            </div>
          </div>
        )}
        {page.template === "Template3" && (
          <div className="grid grid-cols-5 gap-3 overflow-hidden">
            <div className="col-span-3">
              <div
                className="break-words max-w-none"
                onMouseUp={handleTextSelection}
                dangerouslySetInnerHTML={{ __html: page.content }}
              ></div>
            </div>
            <div className="flex items-center justify-center col-span-2">
              {page.image && (
                <img src={page.image} alt="Imagen 2" className="object-cover" />
              )}
            </div>
          </div>
        )}
        {page.template === "Template4" && (
          <div>
            <div
              onMouseUp={handleTextSelection}
              className="break-words max-w-none"
              dangerouslySetInnerHTML={{ __html: page.content }}
            ></div>
          </div>
        )}
        <div className="flex justify-end mt-4">
          <button
            className={`mr-4 p-2 rounded-full focus:outline-none ${
              isPlayingAudio
                ? "bg-red-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
            onClick={handleSpeech}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M10.0909 11.9629L19.3636 8.63087V14.1707C18.8126 13.8538 18.1574 13.67 17.4545 13.67C15.4964 13.67 13.9091 15.096 13.9091 16.855C13.9091 18.614 15.4964 20.04 17.4545 20.04C19.4126 20.04 21 18.614 21 16.855C21 16.855 21 16.8551 21 16.855L21 7.49236C21 6.37238 21 5.4331 20.9123 4.68472C20.8999 4.57895 20.8852 4.4738 20.869 4.37569C20.7845 3.86441 20.6352 3.38745 20.347 2.98917C20.2028 2.79002 20.024 2.61055 19.8012 2.45628C19.7594 2.42736 19.716 2.39932 19.6711 2.3722L19.6621 2.36679C18.8906 1.90553 18.0233 1.93852 17.1298 2.14305C16.2657 2.34086 15.1944 2.74368 13.8808 3.23763L11.5963 4.09656C10.9806 4.32806 10.4589 4.52419 10.0494 4.72734C9.61376 4.94348 9.23849 5.1984 8.95707 5.57828C8.67564 5.95817 8.55876 6.36756 8.50501 6.81203C8.4545 7.22978 8.45452 7.7378 8.45455 8.33743V16.1307C7.90347 15.8138 7.24835 15.63 6.54545 15.63C4.58735 15.63 3 17.056 3 18.815C3 20.574 4.58735 22 6.54545 22C8.50355 22 10.0909 20.574 10.0909 18.815C10.0909 18.815 10.0909 18.8151 10.0909 18.815L10.0909 11.9629Z"></path>
              </g>
            </svg>
          </button>
          {page.video && (
            <button
              className={`p-2 rounded-full focus:outline-none ${
                isPlayingVideo
                  ? "bg-red-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={handlePlayVideo}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        message={textGenerated}
      />
    </div>
  );
};

export default PageContent;
