"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/ui/shadcn/ui/dialog";
import { LoadingContext } from "@/libs/contexts/loadingContext";
import { VoiceRecorderContext } from "@/libs/contexts/speechToTextContext";
import { ToastContext } from "@/libs/contexts/toastContext";
import { ResponseData } from "@/libs/interfaces/response.interface";
import { ToastType } from "@/libs/interfaces/toast.interface";
import { callFunction } from "@/libs/services/callFunction";
import { generateSpeech } from "@/libs/services/generateSpeech";
import { commandsCategoriesAdmin } from "@/libs/texts/commands/admin/commandsAdmin";
import { messageCategoryAdmin } from "@/libs/texts/messages/admin/message";
import ButtonOutlined from "@/ui/components/buttons/ButtonOutlined";
import Table from "@/ui/components/tabble/table";
import ConfirmActiveOrDesactive from "@/ui/modals/admin/users/confirm";
import CategoryComponent from "@/ui/modals/categories/category";
import Help from "@/ui/modals/help/help";
import { Pagination, Stack, Tooltip } from "@mui/material";
import { format, sub } from "date-fns";
import { useContext, useEffect, useRef, useState } from "react";

export default function Categories() {
  const [openHelp, setOpenHelp] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [isOpenCreated, setIsOpenCreated] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  const source = useRef<AudioBufferSourceNode | null>(null);
  const { handleShowToast } = useContext(ToastContext)!;
  const { setIsLoading } = useContext(LoadingContext)!;
  const [categoriesData, setCategoriesData] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [action, setAction] = useState<any>();
  const [statusActiveorDesactive, setStatusActiveorDesactive] = useState<any>();
  const [isOpenActiveOrDesactive, setIsOpenActiveOrDesactive] = useState(false);
  const { setIsListening, finalTranscript } = useContext(VoiceRecorderContext)!;
  const [loadingVoice, setLoadingVoice] = useState(false);

  const startSpeech = async () => {
    const audioData = await generateSpeech(messageCategoryAdmin);
    const ctx = new AudioContext();
    await ctx.decodeAudioData(audioData, (buffer) => {
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.connect(ctx.destination);
      setLoadingVoice(false);
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
      setLoadingVoice(true);
      startSpeech();
    }
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `../api/admin/categories?limit=5&page=${page}`
      );
      const data: ResponseData<any> = await response.json();
      if (data.error) {
        handleShowToast(data.message!, ToastType.ERROR);
      } else {
        const tableData = data.data.map((item: any) => {
          const formattedDate = format(
            sub(item.createdAt, { hours: 5 }),
            "dd-MM-yyyy"
          );
          return { ...item, createdAt: formattedDate };
        });
        setTotalPages(data.pagination?.totalPages ?? 0);
        setPage(data.pagination?.currentPage ?? 0);
        setCategoriesData(tableData);
      }
    } catch (error) {
      handleShowToast("Ocurrió un error al obtener los datos", ToastType.ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (event: any, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if (finalTranscript && finalTranscript != "") {
      functionInterpret();
    }
  }, [finalTranscript]);

  const functionInterpret = async () => {
    try {
      const call = await callFunction(finalTranscript);
      switch (call.name) {
        case "changePage":
          changePage(call.args.action, call.args.pageNumber);
          break;
        case "newCategory":
          setIsOpenCreated(true);
          break;
        default:
          handleShowToast("No se reconoce el comando", ToastType.ERROR);
      }
      console.log(call);
    } catch (error) {
      handleShowToast("No se reconoce el comando", ToastType.ERROR);
    }
  };

  const changePage = (action: string, pageNumber?: number) => {
    if (action === "next") {
      if (page + 1 > totalPages) {
        handleShowToast("No hay más libros", ToastType.ERROR);
      } else {
        setPage(page + 1);
      }
    } else if (action === "previous") {
      if (page - 1 < 1) {
        handleShowToast("No hay más libros", ToastType.ERROR);
      } else {
        setPage(page - 1);
      }
    } else if (action === "goTo") {
      if (pageNumber! < 1 || pageNumber! > totalPages) {
        handleShowToast("Número de página inválido", ToastType.ERROR);
      } else {
        setPage(pageNumber!);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, [page]);

  const headersCategories = [
    { key: "categoryName", name: "Nombre de la categoría" },
    { key: "description", name: "Descripción" },
    { key: "createdAt", name: "Fecha de creación" },
    { key: "status", name: "Estado" },
  ];

  const handleActiveCategory = (item: any) => {
    setSelectedId(item.idCategory);
    setAction("active");
    setStatusActiveorDesactive(true);
    setIsOpenActiveOrDesactive(true);
  };

  const handleDesactiveCategory = (item: any) => {
    setSelectedId(item.idCategory);
    setAction("desactive");
    setStatusActiveorDesactive(false);
    setIsOpenActiveOrDesactive(true);
  };

  return (
    <>
      <div className="shadow-2xl p-4  rounded-lg">
        <div className="flex items-center justify-end gap-2">
          <Tooltip arrow title={isPlaying ? "Detener" : "Oír"} placement="top">
            <span className="cursor-pointer">
              {loadingVoice ? (
                <span className="loading loading-spinner loading-lg cursor-default"></span>
              ) : isPlaying ? (
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
                </div>
              )}
            </span>
          </Tooltip>
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
            <span className="cursor-pointer" onClick={() => setOpenHelp(true)}>
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
        <div className="my-3 border-b border-gray-300"></div>
        <div className="flex flex-wrap justify-between mb-5 mt-5">
          <h1 className="relative font-custom m-0 text-2xl text-primary-500 font-bold before:content-[''] before:block before:absolute before:h-full before:w-1 before:bg-primary-500 before:left-0">
            <span className="ps-2">Categorías</span>
          </h1>
          <div className="flex gap-2">
            <ButtonOutlined
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              onClick={() => {
                setIsOpenCreated(true);
                setSelectedCategory(null);
                setSelectedId(0);
              }}
            >
              Nueva categoría
            </ButtonOutlined>
          </div>
        </div>
        <Table
          data={categoriesData}
          headers={headersCategories}
          showActions
          showEdit
          showActivate
          showDelete
          onEditClick={(item: any) => {
            setSelectedCategory(item);
            setSelectedId(item.idCategory);
            setIsOpenCreated(true);
          }}
          onActivateClick={(item: any) => {
            handleActiveCategory(item);
          }}
          onDeleteClick={(item: any) => {
            handleDesactiveCategory(item);
          }}
        />
      </div>
      <div className="mt-5 flex items-center justify-center">
        <Stack spacing={2}>
          <Pagination
            sx={{
              "& .MuiPaginationItem-page": {
                backgroundColor: "var(--bg-no-select)",
                color: "var(--text-no-select)",
                borderColor: "var(--border-not-select)",
                "&:hover": {
                  backgroundColor: "var(--bg-no-select)",
                  borderColor: "var(--text-no-select)",
                  color: "var(--hover-text-not-select)",
                },
              },
              "& .MuiPaginationItem-page.Mui-selected": {
                backgroundColor: "var(--primary--500)",
                color: "var(--bg-no-select)",
                "&:hover": {
                  backgroundColor: "var(--primary--700)",
                  color: "var(--bg-select)",
                },
              },
              '& [aria-label="Go to next page"], & [aria-label="Go to previous page"]':
                {
                  backgroundColor: "#fff",
                  color: "#000",
                },
            }}
            count={totalPages}
            size="large"
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
      <div>
        {isOpenCreated && (
          <Dialog
            open={isOpenCreated}
            onOpenChange={(open: boolean) => {
              setIsOpenCreated(open);
            }}
          >
            <DialogContent className="bg-bgColorRight">
              <DialogHeader>
                <DialogDescription>
                  <CategoryComponent
                    category={{
                      name: selectedCategory?.categoryName,
                      description: selectedCategory?.description,
                    }}
                    idCategory={selectedId}
                    onFinish={() => {
                      setIsOpenCreated(false);
                      loadData();
                    }}
                  ></CategoryComponent>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div>
        {isOpenActiveOrDesactive && (
          <Dialog
            open={isOpenActiveOrDesactive}
            onOpenChange={(open: boolean) => {
              setIsOpenActiveOrDesactive(open);
            }}
          >
            <DialogContent className="bg-bgColorRight">
              <DialogHeader>
                <DialogDescription>
                  <ConfirmActiveOrDesactive
                    action={action}
                    entity="la categoría"
                    route="categories"
                    status={statusActiveorDesactive}
                    idItem={selectedId}
                    onFinish={() => {
                      setIsOpenActiveOrDesactive(false);
                      loadData();
                    }}
                  ></ConfirmActiveOrDesactive>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
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
                  <Help
                    commands={commandsCategoriesAdmin}
                    page="categorías"
                  ></Help>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
}
