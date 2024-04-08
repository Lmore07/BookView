"use client";
import { CategoriesAll } from "@/libs/interfaces/categories.interface";
import { ResponseData } from "@/libs/interfaces/response.interface";
import ButtonOutlined from "@/ui/components/buttons/ButtonOutlined";
import Input from "@/ui/components/inputs/input";
import "@/ui/globals.css";
import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";


export default function Home() {
  //Variables declaradas
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<CategoriesAll[]>([]);
  const [filterCategories, setFilterCategories] = useState<number[]>([]);

  const commands = [
    {
      command: [
        "Filtra por las categorías *",
        "Filtra por la categoría *",
        "Elige la categoría *",
        "Elige las categorías *",
        "Selecciona las categorías *",
        "Selecciona la categoría *",
        "Agrega la categoría *",
        "Agrega las categorías *",
      ],
      callback: (speech: string) => findCategoriesInSpeech(speech),
    },
    {
      command: [
        "Quita las categorías *",
        "Quita la categoría *",
        "Saca la categoría *",
        "Saca las categorías *",
      ],
      callback: (speech: string) => removeCategoriesFromSpeech(speech),
    },
  ];

  const { transcript, resetTranscript, listening } = useSpeechRecognition({
    commands: commands,
  });

  const findCategoriesInSpeech = (speech: string) => {
    const lowerCaseSpeech = speech.toLowerCase();
    categories.forEach((category) => {
      if (lowerCaseSpeech.includes(category.categoryName.toLowerCase())) {
        setFilterCategories((prevFilterCategories) => [
          ...prevFilterCategories,
          category.idCategory,
        ]);
      }
    });
  };

  const removeCategoriesFromSpeech = (speech: string) => {
    const lowerCaseSpeech = speech.toLowerCase();
    categories.forEach((category) => {
      if (lowerCaseSpeech.includes(category.categoryName.toLowerCase())) {
        setFilterCategories((prevFilterCategories) =>
          prevFilterCategories.filter((id) => id !== category.idCategory)
        );
      }
    });
  };

  const startListening = () => {
    SpeechRecognition.startListening({ language: "es-EC" });
  };

  const stopListening = () => {
    console.log("stopListening");
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  const handleToggleListening = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("../api/categories?limit=10000");
      const data: ResponseData<CategoriesAll[]> = await response.json();
      console.log(data.data);
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
    console.log("Click", searchTerm);
  };

  return (
    <div className="shadow-xl p-8 grid rounded-md">
      <div className="flex items-center justify-end gap-4">
        <div className="relative group">
          <span className="cursor-pointer" onClick={handleToggleListening}>
            {listening ? (
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
            )}
          </span>
          <div className="absolute w-auto top-0 right-0 mt-9 p-2 bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {listening ? "Detener" : "Dictar"}
          </div>
        </div>
        <div className="relative group">
          <span className="cursor-pointer " onClick={handleToggleListening}>
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
          <div className="absolute w-auto top-0 mt-9 p-2 bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Ayuda
          </div>
        </div>
      </div>
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
    </div>
  );
}
