"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { VoiceRecorderContext } from "@/libs/contexts/speechToTextContext";
import { ToastContext } from "@/libs/contexts/toastContext";
import { CategoriesAll } from "@/libs/interfaces/categories.interface";
import { ResponseData } from "@/libs/interfaces/response.interface";
import { ToastType } from "@/libs/interfaces/toast.interface";
import { callFunction } from "@/libs/services/callFunction";
import { generateSpeech } from "@/libs/services/generateSpeech";
import { commandsHomeReader } from "@/libs/texts/commands/reader/homeReader";
import { homeReader } from "@/libs/texts/messages/reader/homeReader";
import ButtonOutlined from "@/ui/components/buttons/ButtonOutlined";
import Input from "@/ui/components/inputs/input";
import "@/ui/globals.css";
import Help from "@/ui/modals/help/help";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";

export default function Home() {
  //Variables declaradas
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<CategoriesAll[]>([]);
  const [filterCategories, setFilterCategories] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  const source = useRef<AudioBufferSourceNode | null>(null);
  const [openHelp, setOpenHelp] = useState(false);
  const { handleShowToast } = useContext(ToastContext)!;
  const router = useRouter();
  const { setIsListening, finalTranscript } = useContext(VoiceRecorderContext)!;

  const addCategoriesToFilter = (categoryNames: string[]) => {
    categoryNames.map((name) => {
      const category = categories.find(
        (category) => category.categoryName.toLowerCase() === name.toLowerCase()
      );
      if (!category) {
        throw new Error(`No se encontró la categoría con el nombre ${name}`);
      }
      setFilterCategories((prevFilterCategories) => [
        ...prevFilterCategories,
        category.idCategory,
      ]);
    });
  };

  const removeCategoriesFromFilter = (categoryNames: string[]) => {
    categoryNames.map((name) => {
      const category = categories.find(
        (category) => category.categoryName.toLowerCase() === name.toLowerCase()
      );
      if (!category) {
        throw new Error(`No se encontró la categoría con el nombre ${name}`);
      }
      setFilterCategories((prevFilterCategories) =>
        prevFilterCategories.filter((id) => id !== category.idCategory)
      );
    });
  };

  const functionInterpret = async () => {
    try {
      const call = await callFunction(finalTranscript);
      if (call.name === "selectCategories") {
        addCategoriesToFilter(call.args.categories);
      } else if (call.name == "removeCategories") {
        removeCategoriesFromFilter(call.args.categories);
      } else if (call.name == "setInputText") {
        setSearchTerm(call.args.text);
      }
      console.log(call);
    } catch (error) {
      handleShowToast("No se reconoció el comando", ToastType.ERROR);
    }
  };

  useEffect(() => {
    if (finalTranscript && finalTranscript != "") {
      functionInterpret();
    }
  }, [finalTranscript]);

  const startSpeech = async () => {
    const audioData = await generateSpeech(homeReader);
    const ctx = new AudioContext();
    await ctx.decodeAudioData(audioData, (buffer) => {
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.connect(ctx.destination);
      src.start();
      audioContext.current = ctx;
      source.current = src;
      setIsPlaying(true);
      src.onended = () => {
        setIsPlaying(false);
      };
    });
  };

  const stopSpeech = () => {
    if (source.current) {
      source.current.stop();
      audioContext.current?.close();
      setIsPlaying(false);
    }
  };

  const handleSpeech = () => {
    if (isPlaying) {
      stopSpeech();
    } else {
      startSpeech();
    }
  };

  const handleChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("../api/categories?limit=10000&status=true");
      const data: ResponseData<CategoriesAll[]> = await response.json();
      setCategories(data.data ?? []);
    };
    fetchData();
  }, []);

  const handleCategoryChange = (event: any) => {
    const selectedCategoryId = event.target.value;
    const category = categories.find(
      (category) => category.idCategory == selectedCategoryId
    );
    if (category) {
      if (filterCategories.includes(category.idCategory)) {
        setFilterCategories((prev) =>
          prev.filter((id) => id !== category.idCategory)
        );
      } else {
        setFilterCategories((prev) => [...prev, category.idCategory]);
      }
    }
  };

  const handleClick = async () => {
    if (!searchTerm && filterCategories.length === 0) {
      handleShowToast(
        "Por favor, introduce un término de búsqueda o selecciona al menos una categoría",
        ToastType.ERROR
      );
      return;
    }
    router.push(
      "/reader/books?searchTerm=" +
        searchTerm +
        "&categories=" +
        filterCategories.join(",")
    );
  };

  return (
    <div className="shadow-xl p-8 grid rounded-md">
      <div className="flex items-center justify-end gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span className="cursor-pointer" onClick={handleSpeech}>
                {isPlaying ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="#cf0101"
                    className="w-8 h-8"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-10 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <circle cx="10" cy="6.75" r="4"></circle>{" "}
                      <ellipse cx="10" cy="17.75" rx="7" ry="4"></ellipse>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.357 2.36424C18.5702 2.00906 19.0309 1.89388 19.386 2.10699L19.0002 2.75011C19.386 2.10699 19.3857 2.10679 19.386 2.10699L19.3874 2.10783L19.389 2.10878L19.3927 2.11103L19.4023 2.11695C19.4096 2.12153 19.4189 2.12737 19.4299 2.13448C19.4519 2.14871 19.481 2.16809 19.5162 2.19272C19.5865 2.24194 19.6815 2.31244 19.7928 2.4052C20.0149 2.59029 20.3054 2.86678 20.5946 3.24283C21.1775 4.00057 21.7502 5.15746 21.7502 6.75011C21.7502 8.34277 21.1775 9.49966 20.5946 10.2574C20.3054 10.6334 20.0149 10.9099 19.7928 11.095C19.6815 11.1878 19.5865 11.2583 19.5162 11.3075C19.481 11.3321 19.4519 11.3515 19.4299 11.3657C19.4189 11.3729 19.4096 11.3787 19.4023 11.3833L19.3927 11.3892L19.389 11.3914L19.3874 11.3924C19.3871 11.3926 19.386 11.3932 19.0002 10.7501L19.386 11.3932C19.0309 11.6063 18.5702 11.4912 18.357 11.136C18.1448 10.7823 18.2581 10.324 18.6098 10.1097L18.6154 10.1062C18.6227 10.1014 18.6365 10.0923 18.656 10.0787C18.6951 10.0513 18.7563 10.0062 18.8325 9.9427C18.9854 9.81529 19.195 9.61678 19.4057 9.34283C19.8228 8.80057 20.2502 7.95746 20.2502 6.75011C20.2502 5.54277 19.8228 4.69966 19.4057 4.1574C19.195 3.88345 18.9854 3.68494 18.8325 3.55753C18.7563 3.49403 18.6951 3.44891 18.656 3.42157C18.6365 3.40792 18.6227 3.39878 18.6154 3.39406L18.6098 3.39053C18.2581 3.17625 18.1448 2.71793 18.357 2.36424Z"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.3293 4.4147C16.5146 4.04422 16.9651 3.89405 17.3356 4.07929L17.0002 4.75011C17.3356 4.07929 17.3352 4.07909 17.3356 4.07929L17.3372 4.08011L17.3389 4.08097L17.3426 4.08287L17.3512 4.08732L17.3728 4.09893C17.3891 4.10789 17.4091 4.11934 17.4324 4.13344C17.4787 4.16159 17.5383 4.20058 17.6064 4.25168C17.7423 4.35363 17.9153 4.5059 18.0858 4.71909C18.4345 5.15499 18.7502 5.81792 18.7502 6.75011C18.7502 7.6823 18.4345 8.34524 18.0858 8.78113C17.9153 8.99433 17.7423 9.1466 17.6064 9.24855C17.5383 9.29965 17.4787 9.33863 17.4324 9.36679C17.4091 9.38089 17.3891 9.39234 17.3728 9.40129L17.3512 9.4129L17.3426 9.41736L17.3389 9.41925L17.3372 9.42012C17.3368 9.42032 17.3356 9.42093 17.0064 8.76266L17.3356 9.42093C16.9651 9.60618 16.5146 9.45601 16.3293 9.08552C16.1464 8.71965 16.2906 8.27574 16.651 8.08634C16.6518 8.0859 16.6527 8.08533 16.6539 8.08461C16.6622 8.07956 16.6808 8.06776 16.7064 8.04855C16.758 8.00988 16.8351 7.9434 16.9145 7.84409C17.0658 7.65499 17.2502 7.31792 17.2502 6.75011C17.2502 6.1823 17.0658 5.84524 16.9145 5.65613C16.8351 5.55683 16.758 5.49035 16.7064 5.45168C16.6808 5.43246 16.6622 5.42066 16.6539 5.41562C16.6527 5.4149 16.6518 5.41432 16.651 5.41389C16.2906 5.22449 16.1464 4.78057 16.3293 4.4147Z"
                      ></path>{" "}
                    </g>
                  </svg>
                )}
              </span>
            </TooltipTrigger>
            <TooltipContent>{isPlaying ? "Detener" : "Oír"}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
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
            </TooltipTrigger>
            <TooltipContent>Dictar</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span
                className="cursor-pointer"
                onClick={() => setOpenHelp(true)}
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
            </TooltipTrigger>
            <TooltipContent>
              <div>Ayuda</div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="my-2 border-b border-gray-300"></div>
      <div className="flex gap-5">
        <div className="w-5/6">
          <Input
            label="Encuentra el libro que buscas"
            name="bookName"
            placeholder="Escribe el nombre o autor del libro"
            type="text"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor text-iconBgColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clipRule="evenodd"
                />
              </svg>
            }
            onChange={handleChange}
            value={searchTerm}
          ></Input>
        </div>
        <div className="flex items-end">
          <ButtonOutlined
            onClick={handleClick}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            }
          >
            Buscar
          </ButtonOutlined>
        </div>
      </div>
      <div className="pb-3 pt-5 text-left font-bold text-xl text-primary-500 font-poppins">
        Filtros
      </div>
      <div className="shadow-md rounded-md p-3">
        <div className="flex items-center justify-between">
          <span className="font-open-sans text-secondary-400 font-normal text-sm">
            Categorías
          </span>
        </div>
        <div className="pt-3">
          <div className="flex flex-row gap-5 flex-wrap">
            {categories.map((category) => (
              <label
                key={category.idCategory}
                className="flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={category.idCategory}
                  checked={filterCategories.includes(category.idCategory)}
                  onChange={handleCategoryChange}
                  className="mr-2 cursor-pointer focus:outline-none w-6 border-gray-200 rounded-md custom-checkbox"
                />
                <span className="font-open-sans text-sm font-normal text-labelInputText">
                  {category.categoryName}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div>
        {openHelp && (
          <Dialog
            open={openHelp}
            onOpenChange={(open: boolean) => {
              setOpenHelp(open);
            }}
          >
            <DialogContent className="bg-bgColorRight">
              <DialogHeader>
                <DialogDescription>
                  <Help commands={commandsHomeReader} page="inicio"></Help>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
