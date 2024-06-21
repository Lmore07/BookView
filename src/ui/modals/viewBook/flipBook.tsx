import { VoiceRecorderContext } from "@/libs/contexts/speechToTextContext";
import { ToastContext } from "@/libs/contexts/toastContext";
import { CoverI } from "@/libs/interfaces/books.interface";
import { ToastType } from "@/libs/interfaces/toast.interface";
import { callFunction } from "@/libs/services/callFunction";
import { commandsHelpBook } from "@/libs/texts/commands/reader/homeReader";
import { Tooltip } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import Help from "../help/help";
import PageContent from "./pageView";
import Slider from "@mui/material/Slider";

interface FlipBookProps {
  pages: {
    numberPage: number;
    template: string;
    content: string | null;
    image: string | null;
    audio: string | null;
    video: string | null;
  }[];
  coverInfo: CoverI;
  startPage?: number;
  isViewed?: boolean;
}

const FlipBook: React.FC<FlipBookProps> = ({
  pages,
  startPage = 0,
  coverInfo,
  isViewed = false,
}) => {
  const [currentPage, setCurrentPage] = useState(startPage);
  const [currentBook, setCurrentBook] = useState(coverInfo);
  const [sliderValue, setSliderValue] = useState(startPage);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState("");
  const bookRef = useRef<HTMLDivElement>(null);
  const { setIsListening, finalTranscript, currentComponentRef } =
    useContext(VoiceRecorderContext)!;
  const componentRef = useRef<HTMLDivElement>(null);
  const { handleShowToast } = useContext(ToastContext)!;
  const [marks, setMarks] = useState<{ value: number; label: string }[]>([]);

  useEffect(() => {
    if (finalTranscript && finalTranscript != "") {
      functionInterpret();
    }
  }, [finalTranscript]);

  useEffect(() => {
    updateLastPage();
    setSliderValue(currentPage);
  }, [currentPage]);

  useEffect(() => {
    currentComponentRef.current = componentRef.current;
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isFlipping) {
      const bookElement = bookRef.current;
      if (bookElement) {
        bookElement.classList.add("flipping");
        if (flipDirection === "prev") {
          bookElement.classList.add("swing-left");
        } else {
          bookElement.classList.add("swing-right");
        }

        const resetFlip = () => {
          bookElement.classList.remove("flipping");
          bookElement.classList.remove("swing-left");
          bookElement.classList.remove("swing-right");
          setIsFlipping(false);
          if (flipDirection === "prev") {
            setCurrentPage(currentPage - 1);
          } else {
            setCurrentPage(currentPage + 1);
          }
        };

        const flipTimer = setTimeout(resetFlip, 600);

        return () => clearTimeout(flipTimer);
      }
    }
  }, [isFlipping, flipDirection, currentPage, pages.length]);

  const handlePrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setFlipDirection("prev");
      setIsFlipping(true);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1 && !isFlipping) {
      setFlipDirection("next");
      setIsFlipping(true);
    }
  };

  const handlePrevPageRef = useRef(handlePrevPage);
  const handleNextPageRef = useRef(handleNextPage);

  useEffect(() => {
    handlePrevPageRef.current = handlePrevPage;
    handleNextPageRef.current = handleNextPage;
  }, [handlePrevPage, handleNextPage]);

  const functionInterpret = async () => {
    if (componentRef.current === currentComponentRef.current) {
      try {
        const call = await callFunction(finalTranscript);
        if (call.name == "changePage") {
          changePage(call.args.action, call.args.pageNumber);
        }
        console.log(call);
      } catch (error) {
        handleShowToast("No se reconoció el comando", ToastType.ERROR);
      }
    }
  };

  const changePage = (action: string, pageNumber?: number) => {
    if (action === "next") {
      handleNextPage();
    } else if (action === "previous") {
      handlePrevPage();
    }
  };

  const updateLastPage = async () => {
    if (!isViewed) {
      await fetch("../../api/books/views", {
        method: "PUT",
        body: JSON.stringify({
          idBook: coverInfo.idBook,
          lastPage: currentPage,
        }),
      });
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    console.log(event.key);
    if (event.key === "ArrowLeft") {
      handlePrevPageRef.current();
    } else if (event.key === "ArrowRight") {
      handleNextPageRef.current();
    } else if (event.key === "Home") {
      setCurrentPage(0);
    } else if (event.key === "End") {
      setCurrentPage(pages.length - 1);
    }
  };

  useEffect(() => {
    const totalPages = pages.length;
    let marksPages = [];

    // Función para añadir una página al array de marks
    const addPage = (index: any) => {
      marksPages.push({
        value: index,
        label: index === 0 ? "Portada" : `${index}`,
      });
    };

    // Añadir las primeras 4 páginas
    for (let i = 0; i < Math.min(4, totalPages); i++) {
      addPage(i);
    }

    // Si hay más de 10 páginas, añadir puntos suspensivos en el medio
    if (totalPages > 8) {
      const middleIndex = Math.floor(totalPages / 2);
      console.log(middleIndex);
      marksPages.push({ value: middleIndex, label: "..." });
    }

    // Añadir las últimas 4 páginas, si hay más de 4 páginas en total
    if (totalPages > 4) {
      for (let i = Math.max(4, totalPages - 4); i < totalPages; i++) {
        addPage(i);
      }
    }

    setMarks(marksPages);
  }, [pages]);

  return (
    <div
      className="flex w-full h-full py-1 flex-col font-custom"
      ref={componentRef}
    >
      <div className="flex items-center justify-end gap-2 mr-14">
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
        <Tooltip arrow title="Ayuda" placement="top">
          <span
            className="cursor-pointer"
            onClick={() => {
              const dialog = document.getElementById(
                "helpModal"
              ) as HTMLDialogElement;
              dialog.showModal();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#1b7505"
              className="w-10 h-10"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </Tooltip>
      </div>
      <div
        className="flex items-center w-full justify-center mb-3"
        ref={bookRef}
      >
        {currentPage != 0 && (
          <div className="mr-5 sm:mr-2 md:mr-2">
            <button
              className="bg-gray-300 p-2 rounded-full focus:outline-none"
              onClick={handlePrevPage}
              disabled={currentPage == 0}
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
        )}
        <div className="pages w-full flex items-center justify-center font-custom">
          <div className={`page w-full front no-cover`}>
            {currentPage == 0 ? (
              <PageContent page={pages[currentPage]} coverInfo={currentBook} />
            ) : (
              <PageContent page={pages[currentPage]} />
            )}
          </div>
        </div>
        {currentPage != pages.length - 1 && (
          <div className="ml-5 sm:ml-2 md:ml-2">
            <button
              className="bg-gray-300 p-2 rounded-full focus:outline-none"
              onClick={handleNextPage}
              disabled={currentPage === pages.length - 1}
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      <div className="justify-center mx-10 flex gap-3 font-custom items-end">
        <Slider
          onChange={(event, value: any) => {
            console.log(value[0]);
            setCurrentPage(value[0]);
          }}
          value={[sliderValue]}
          aria-label="Custom marks"
          valueLabelDisplay="auto"
          defaultValue={[currentPage]}
          marks={marks}
          max={pages.length - 1}
          min={0}
          step={1}
        />
      </div>
      <dialog id="helpModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <Help commands={commandsHelpBook} page="perfil"></Help>
        </div>
      </dialog>
    </div>
  );
};

export default FlipBook;
