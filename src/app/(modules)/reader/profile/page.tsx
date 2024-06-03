"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LoadingContext } from "@/libs/contexts/loadingContext";
import { VoiceRecorderContext } from "@/libs/contexts/speechToTextContext";
import { ToastContext } from "@/libs/contexts/toastContext";
import { ResponseData } from "@/libs/interfaces/response.interface";
import { ToastType } from "@/libs/interfaces/toast.interface";
import { UserInfo } from "@/libs/interfaces/user.interface";
import { callFunction } from "@/libs/services/callFunction";
import { generateSpeech } from "@/libs/services/generateSpeech";
import { commandsProfile } from "@/libs/texts/commands/reader/homeReader";
import { profileMessage } from "@/libs/texts/messages/reader/homeReader";
import Button from "@/ui/components/buttons/ButtonFill";
import ButtonOutlined from "@/ui/components/buttons/ButtonOutlined";
import Input from "@/ui/components/inputs/input";
import Help from "@/ui/modals/help/help";
import ModalParent from "@/ui/modals/modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";

export default function ProfileReader() {
  const { setIsLoading } = useContext(LoadingContext)!;
  const { handleShowToast } = useContext(ToastContext)!;
  const [openHelp, setOpenHelp] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  const source = useRef<AudioBufferSourceNode | null>(null);
  const { setIsListening, finalTranscript } = useContext(VoiceRecorderContext)!;
  const [userInfo, setUserInfo] = useState<UserInfo>({
    mail: "",
    profilePicture: "",
    Person: {
      names: "",
      lastNames: "",
      birthday: "",
    },
  });
  const router = useRouter();

  useEffect(() => {
    if (finalTranscript && finalTranscript != "") {
      functionInterpret();
    }
  }, [finalTranscript]);

  const functionInterpret = async () => {
    try {
      const call = await callFunction(finalTranscript);
      if (call.name == "setInputText") {
        switch (call.args.inputName) {
          case "names":
            setUserInfo({
              ...userInfo,
              Person: {
                ...userInfo.Person,
                names: call.args.text,
              },
            });
            break;
          case "lastNames":
            setUserInfo({
              ...userInfo,
              Person: {
                ...userInfo.Person,
                lastNames: call.args.text,
              },
            });
            break;
          case "birthday":
            setUserInfo({
              ...userInfo,
              Person: {
                ...userInfo.Person,
                birthday: call.args.text,
              },
            });
            break;
          case "mail":
            setUserInfo({
              ...userInfo,
              mail: call.args.text,
            });
            break;
          case "profilePicture":
            handleImageUpload();
            break;
        }
      }
      console.log(call);
    } catch (error) {
      handleShowToast("Error al interpretar el comando", ToastType.ERROR);
    }
  };

  const startSpeech = async () => {
    const audioData = await generateSpeech(profileMessage);
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

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`../api/users/my-profile`);
      const data: ResponseData<UserInfo> = await response.json();
      if (data.error) {
        handleShowToast(data.message!, ToastType.ERROR);
      } else {
        const formatDate = data.data!.Person.birthday.substring(0, 10);
        setUserInfo({
          mail: data.data!.mail,
          profilePicture: data.data!.profilePicture,
          Person: {
            names: data.data!.Person.names,
            lastNames: data.data!.Person.lastNames,
            birthday: formatDate,
          },
        });
      }
    } catch (error) {
      console.error(error);
      handleShowToast(
        "Error al cargar la información del usuario",
        ToastType.ERROR
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: any) => {
    const parts = e.target.name.split(".");
    if (parts.length === 2) {
      const [object, key] = parts;
      setUserInfo((prevState: any) => ({
        ...prevState,
        [object]: {
          ...prevState[object],
          [key]: e.target.value,
        },
      }));
    } else {
      setUserInfo((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      setUserInfo({
        ...userInfo,
        profilePicture: file ?? undefined,
      });
    };
    input.click();
  };

  const handleClick = async () => {
    const formData = new FormData();
    formData.append("mail", userInfo.mail);
    formData.append("names", userInfo.Person.names);
    formData.append("lastNames", userInfo.Person.lastNames);
    if (userInfo.profilePicture) {
      formData.append("profilePicture", userInfo.profilePicture);
    }
    formData.append("birthday", userInfo.Person.birthday);
    const response = await fetch("../api/users/my-profile", {
      method: "PUT",
      body: formData,
    });
    if (response.ok) {
      handleShowToast("Perfil actualizado correctamente", ToastType.SUCCESS);
    } else {
      handleShowToast("Error al actualizar el perfil", ToastType.ERROR);
    }
  };

  return (
    <div className="shadow-2xl p-4 rounded-lg">
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
            <TooltipContent>{"Dictar"}</TooltipContent>
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
      <div className="flex flex-wrap justify-between mb-5">
        <h1 className="font-custom relative text-2xl text-primary-500 font-bold before:content-[''] before:block before:absolute before:h-full before:w-1 before:bg-primary-500 before:left-0">
          <span className="ps-2">Editar perfil</span>
        </h1>
      </div>
      <div>
        <div className="font-custom mb-1 text-sm font-bold text-labelInputText">
          Foto de perfil
        </div>
        <div className="flex gap-5 py-1">
          <div className="bg-bgInputText rounded-md h-64 w-1/3 flex items-center justify-center hover:text-secondary-400 hover:border hover:border-black">
            {userInfo.profilePicture && (
              <Image
                src={
                  userInfo.profilePicture instanceof File
                    ? URL.createObjectURL(userInfo.profilePicture as Blob)
                    : userInfo.profilePicture
                }
                alt="Imagen de perfil"
                className="max-h-full max-w-full"
                width={300}
                height={150}
              />
            )}
          </div>
          <div className="flex flex-col content-end justify-end gap-y-3">
            <ButtonOutlined
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M21.9998 12.6978C21.9983 14.1674 21.9871 15.4165 21.9036 16.4414C21.8067 17.6308 21.6081 18.6246 21.1636 19.45C20.9676 19.814 20.7267 20.1401 20.4334 20.4334C19.601 21.2657 18.5405 21.6428 17.1966 21.8235C15.8835 22 14.2007 22 12.0534 22H11.9466C9.79929 22 8.11646 22 6.80345 21.8235C5.45951 21.6428 4.39902 21.2657 3.56664 20.4334C2.82871 19.6954 2.44763 18.777 2.24498 17.6376C2.04591 16.5184 2.00949 15.1259 2.00192 13.3967C2 12.9569 2 12.4917 2 12.0009V11.9466C1.99999 9.79929 1.99998 8.11646 2.17651 6.80345C2.3572 5.45951 2.73426 4.39902 3.56664 3.56664C4.39902 2.73426 5.45951 2.3572 6.80345 2.17651C7.97111 2.01952 9.47346 2.00215 11.302 2.00024C11.6873 1.99983 12 2.31236 12 2.69767C12 3.08299 11.6872 3.3952 11.3019 3.39561C9.44749 3.39757 8.06751 3.41446 6.98937 3.55941C5.80016 3.7193 5.08321 4.02339 4.5533 4.5533C4.02339 5.08321 3.7193 5.80016 3.55941 6.98937C3.39683 8.19866 3.39535 9.7877 3.39535 12C3.39535 12.2702 3.39535 12.5314 3.39567 12.7844L4.32696 11.9696C5.17465 11.2278 6.45225 11.2704 7.24872 12.0668L11.2392 16.0573C11.8785 16.6966 12.8848 16.7837 13.6245 16.2639L13.9019 16.0689C14.9663 15.3209 16.4064 15.4076 17.3734 16.2779L20.0064 18.6476C20.2714 18.091 20.4288 17.3597 20.5128 16.3281C20.592 15.3561 20.6029 14.1755 20.6044 12.6979C20.6048 12.3126 20.917 12 21.3023 12C21.6876 12 22.0002 12.3125 21.9998 12.6978Z"></path>{" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.5 11C15.3787 11 14.318 11 13.659 10.341C13 9.68198 13 8.62132 13 6.5C13 4.37868 13 3.31802 13.659 2.65901C14.318 2 15.3787 2 17.5 2C19.6213 2 20.682 2 21.341 2.65901C22 3.31802 22 4.37868 22 6.5C22 8.62132 22 9.68198 21.341 10.341C20.682 11 19.6213 11 17.5 11ZM19.5303 5.46967L18.0303 3.96967C17.7374 3.67678 17.2626 3.67678 16.9697 3.96967L15.4697 5.46967C15.1768 5.76256 15.1768 6.23744 15.4697 6.53033C15.7626 6.82322 16.2374 6.82322 16.5303 6.53033L16.75 6.31066V8.5C16.75 8.91421 17.0858 9.25 17.5 9.25C17.9142 9.25 18.25 8.91421 18.25 8.5V6.31066L18.4697 6.53033C18.7626 6.82322 19.2374 6.82322 19.5303 6.53033C19.8232 6.23744 19.8232 5.76256 19.5303 5.46967Z"
                    ></path>
                  </g>
                </svg>
              }
              onClick={handleImageUpload}
            >
              Seleccionar imagen
            </ButtonOutlined>
            {userInfo.profilePicture != "" &&
              userInfo.profilePicture != null && (
                <ButtonOutlined
                  onClick={() => {
                    setUserInfo({
                      ...userInfo,
                      profilePicture: null,
                    });
                  }}
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M21.9998 12.6978C21.9983 14.1674 21.9871 15.4165 21.9036 16.4414C21.8067 17.6308 21.6081 18.6246 21.1636 19.45C20.9676 19.814 20.7267 20.1401 20.4334 20.4334C19.601 21.2657 18.5405 21.6428 17.1966 21.8235C15.8835 22 14.2007 22 12.0534 22H11.9466C9.79929 22 8.11646 22 6.80345 21.8235C5.45951 21.6428 4.39902 21.2657 3.56664 20.4334C2.82871 19.6954 2.44763 18.777 2.24498 17.6376C2.04591 16.5184 2.00949 15.1259 2.00192 13.3967C2 12.9569 2 12.4917 2 12.0009V11.9466C1.99999 9.79929 1.99998 8.11646 2.17651 6.80345C2.3572 5.45951 2.73426 4.39902 3.56664 3.56664C4.39902 2.73426 5.45951 2.3572 6.80345 2.17651C7.97111 2.01952 9.47346 2.00215 11.302 2.00024C11.6873 1.99983 12 2.31236 12 2.69767C12 3.08299 11.6872 3.3952 11.3019 3.39561C9.44749 3.39757 8.06751 3.41446 6.98937 3.55941C5.80016 3.7193 5.08321 4.02339 4.5533 4.5533C4.02339 5.08321 3.7193 5.80016 3.55941 6.98937C3.39683 8.19866 3.39535 9.7877 3.39535 12C3.39535 12.2702 3.39535 12.5314 3.39567 12.7844L4.32696 11.9696C5.17465 11.2278 6.45225 11.2704 7.24872 12.0668L11.2392 16.0573C11.8785 16.6966 12.8848 16.7837 13.6245 16.2639L13.9019 16.0689C14.9663 15.3209 16.4064 15.4076 17.3734 16.2779L20.0064 18.6476C20.2714 18.091 20.4288 17.3597 20.5128 16.3281C20.592 15.3561 20.6029 14.1755 20.6044 12.6979C20.6048 12.3126 20.917 12 21.3023 12C21.6876 12 22.0002 12.3125 21.9998 12.6978Z"></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.5 11C15.3787 11 14.318 11 13.659 10.341C13 9.68198 13 8.62132 13 6.5C13 4.37868 13 3.31802 13.659 2.65901C14.318 2 15.3787 2 17.5 2C19.6213 2 20.682 2 21.341 2.65901C22 3.31802 22 4.37868 22 6.5C22 8.62132 22 9.68198 21.341 10.341C20.682 11 19.6213 11 17.5 11ZM16.0303 3.96967C15.7374 3.67678 15.2626 3.67678 14.9697 3.96967C14.6768 4.26256 14.6768 4.73744 14.9697 5.03033L16.4393 6.5L14.9697 7.96967C14.6768 8.26256 14.6768 8.73744 14.9697 9.03033C15.2626 9.32322 15.7374 9.32322 16.0303 9.03033L17.5 7.56066L18.9697 9.03033C19.2626 9.32322 19.7374 9.32322 20.0303 9.03033C20.3232 8.73744 20.3232 8.26256 20.0303 7.96967L18.5607 6.5L20.0303 5.03033C20.3232 4.73744 20.3232 4.26256 20.0303 3.96967C19.7374 3.67678 19.2626 3.67678 18.9697 3.96967L17.5 5.43934L16.0303 3.96967Z"
                        ></path>
                      </g>
                    </svg>
                  }
                  className={
                    "border-red-600 text-red-600 hover:text-white hover:bg-red-600"
                  }
                >
                  Quitar imagen
                </ButtonOutlined>
              )}
          </div>
        </div>
        <div className="py-1 grid">
          <Input
            label="Nombres"
            name="Person.names"
            maxLength={50}
            placeholder="Luis"
            value={userInfo.Person.names}
            type="text"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-iconBgColor"
              >
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
              </svg>
            }
            onChange={handleChange}
          ></Input>
        </div>
        <div className="py-1 grid">
          <Input
            label="Apellidos"
            name="Person.lastNames"
            placeholder="Moreira"
            maxLength={50}
            value={userInfo.Person.lastNames}
            type="text"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-iconBgColor"
              >
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
              </svg>
            }
            onChange={handleChange}
          ></Input>
        </div>
        <div className="py-1 grid">
          <Input
            label="Fecha de nacimiento"
            name="Person.birthday"
            placeholder="lmoreira@gmail.com"
            value={userInfo.Person.birthday}
            type="date"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-iconBgColor"
              >
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
              </svg>
            }
            onChange={handleChange}
          ></Input>
        </div>
        <div className="py-1 grid">
          <Input
            label="Correo electrónico"
            name="mail"
            placeholder="lmoreira@gmail.com"
            value={userInfo.mail}
            maxLength={150}
            type="email"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-iconBgColor"
              >
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
              </svg>
            }
            onChange={handleChange}
          ></Input>
        </div>
      </div>
      <div className="flex items-center justify-end mt-4 px-5 gap-3">
        <ButtonOutlined
          onClick={() => {
            router.prefetch("../reader");
          }}
          className={
            "border-red-600 text-red-600 hover:text-white hover:bg-red-600"
          }
        >
          Cancelar
        </ButtonOutlined>
        <Button onClick={handleClick}>Guardar cambios</Button>
      </div>
      {openHelp && (
        <ModalParent
          onClose={() => {
            setOpenHelp(false);
          }}
        >
          <Help commands={commandsProfile} page="perfil"></Help>
        </ModalParent>
      )}
    </div>
  );
}
