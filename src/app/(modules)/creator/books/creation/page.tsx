"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { ToastContext } from "@/libs/contexts/toastContext";
import { BooksAll } from "@/libs/interfaces/books.interface";
import { CategoriesAll } from "@/libs/interfaces/categories.interface";
import { ResponseData } from "@/libs/interfaces/response.interface";
import { ToastType } from "@/libs/interfaces/toast.interface";
import {
  validateCorrectDate,
  validateNotEmpty,
} from "@/libs/validations/validations";
import Button from "@/ui/components/buttons/ButtonFill";
import ButtonOutlined from "@/ui/components/buttons/ButtonOutlined";
import Input from "@/ui/components/inputs/input";
import BookEditor from "@/ui/modals/creation/page";
import FlipBook from "@/ui/modals/viewBook/flipBook";
import { useContext, useEffect, useState } from "react";

export default function Stepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [categories, setCategories] = useState<CategoriesAll[]>([]);
  const [visible, setVisible] = useState(true);
  const [previsualize, setPrevisualize] = useState(false);
  const [pages, setPages] = useState<any>([]);
  const [filterCategories, setFilterCategories] = useState<number[]>([]);
  const { handleShowToast } = useContext(ToastContext)!;
  const [selectedBook, setSelectedBook] = useState<BooksAll | null>(null);
  const [stepOne, setStepOne] = useState<{
    bookName: string;
    author: string;
    illustrator: string;
    publicationDate: Date;
    bookImage: File | null;
  }>({
    bookName: "",
    author: "",
    illustrator: "",
    publicationDate: new Date(),
    bookImage: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("../../api/categories?limit=10000&status=true");
      const data: ResponseData<CategoriesAll[]> = await response.json();
      setCategories(data.data ?? []);
    };
    fetchData();
  }, []);

  const validateStepOne = () => {
    const validations = [
      {
        fieldName: "bookName",
        value: stepOne.bookName,
        validations: [validateNotEmpty],
      },
      {
        fieldName: "author",
        value: stepOne.author,
        validations: [validateNotEmpty],
      },
      {
        fieldName: "publicationDate",
        value: stepOne.publicationDate.toString(),
        validations: [validateCorrectDate],
      },
    ];

    const formIsValid = validations.every((field) =>
      field.validations.every((validation) => !validation(field.value))
    );

    return formIsValid;
  };

  const steps = [
    {
      name: "Titulo y metadatos",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
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
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.27103 2.11151C5.46135 2.21816 5.03258 2.41324 4.72718 2.71244C4.42179 3.01165 4.22268 3.43172 4.11382 4.225C4.00176 5.04159 4 6.12387 4 7.67568V16.2442C4.38867 15.9781 4.82674 15.7756 5.29899 15.6517C5.82716 15.513 6.44305 15.5132 7.34563 15.5135L20 15.5135V7.67568C20 6.12387 19.9982 5.04159 19.8862 4.22499C19.7773 3.43172 19.5782 3.01165 19.2728 2.71244C18.9674 2.41324 18.5387 2.21816 17.729 2.11151C16.8955 2.00172 15.7908 2 14.2069 2H9.7931C8.2092 2 7.10452 2.00172 6.27103 2.11151ZM6.75862 6.59459C6.75862 6.1468 7.12914 5.78378 7.58621 5.78378H16.4138C16.8709 5.78378 17.2414 6.1468 17.2414 6.59459C17.2414 7.04239 16.8709 7.40541 16.4138 7.40541H7.58621C7.12914 7.40541 6.75862 7.04239 6.75862 6.59459ZM7.58621 9.56757C7.12914 9.56757 6.75862 9.93058 6.75862 10.3784C6.75862 10.8262 7.12914 11.1892 7.58621 11.1892H13.1034C13.5605 11.1892 13.931 10.8262 13.931 10.3784C13.931 9.93058 13.5605 9.56757 13.1034 9.56757H7.58621Z"
            ></path>{" "}
            <path d="M7.47341 17.1351H8.68965H13.1034H19.9991C19.9956 18.2657 19.9776 19.1088 19.8862 19.775C19.7773 20.5683 19.5782 20.9884 19.2728 21.2876C18.9674 21.5868 18.5387 21.7818 17.729 21.8885C16.8955 21.9983 15.7908 22 14.2069 22H9.7931C8.2092 22 7.10452 21.9983 6.27103 21.8885C5.46135 21.7818 5.03258 21.5868 4.72718 21.2876C4.42179 20.9884 4.22268 20.5683 4.11382 19.775C4.07259 19.4746 4.0463 19.1382 4.02952 18.7558C4.30088 18.0044 4.93365 17.4264 5.72738 17.218C6.01657 17.1421 6.39395 17.1351 7.47341 17.1351Z"></path>{" "}
          </g>
        </svg>
      ),
    },
    {
      name: "Categorias",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
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
            <path d="M19 3H5C3.58579 3 2.87868 3 2.43934 3.4122C2 3.8244 2 4.48782 2 5.81466V6.50448C2 7.54232 2 8.06124 2.2596 8.49142C2.5192 8.9216 2.99347 9.18858 3.94202 9.72255L6.85504 11.3624C7.49146 11.7206 7.80967 11.8998 8.03751 12.0976C8.51199 12.5095 8.80408 12.9935 8.93644 13.5872C9 13.8722 9 14.2058 9 14.8729L9 17.5424C9 18.452 9 18.9067 9.25192 19.2613C9.50385 19.6158 9.95128 19.7907 10.8462 20.1406C12.7248 20.875 13.6641 21.2422 14.3321 20.8244C15 20.4066 15 19.4519 15 17.5424V14.8729C15 14.2058 15 13.8722 15.0636 13.5872C15.1959 12.9935 15.488 12.5095 15.9625 12.0976C16.1903 11.8998 16.5085 11.7206 17.145 11.3624L20.058 9.72255C21.0065 9.18858 21.4808 8.9216 21.7404 8.49142C22 8.06124 22 7.54232 22 6.50448V5.81466C22 4.48782 22 3.8244 21.5607 3.4122C21.1213 3 20.4142 3 19 3Z"></path>{" "}
          </g>
        </svg>
      ),
    },
    {
      name: "Contenido",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
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
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 16.1436V4.9978C2 3.89963 2.8863 3.00752 3.9824 3.07489C4.95877 3.1349 6.11349 3.25351 7 3.48744C8.04921 3.76431 9.29611 4.35401 10.2823 4.87546C10.5894 5.03785 10.9159 5.15048 11.2502 5.21397V20.3926C10.9472 20.3258 10.6516 20.218 10.3724 20.0692C9.37293 19.5365 8.08145 18.9187 7 18.6334C6.12329 18.402 4.98428 18.2835 4.01486 18.2228C2.90605 18.1535 2 17.2546 2 16.1436ZM5.18208 8.27239C4.78023 8.17193 4.37303 8.41625 4.27257 8.8181C4.17211 9.21994 4.41643 9.62715 4.81828 9.72761L8.81828 10.7276C9.22012 10.8281 9.62732 10.5837 9.72778 10.1819C9.82825 9.78006 9.58393 9.37285 9.18208 9.27239L5.18208 8.27239ZM5.18208 12.2724C4.78023 12.1719 4.37303 12.4163 4.27257 12.8181C4.17211 13.2199 4.41643 13.6271 4.81828 13.7276L8.81828 14.7276C9.22012 14.8281 9.62732 14.5837 9.72778 14.1819C9.82825 13.7801 9.58393 13.3729 9.18208 13.2724L5.18208 12.2724Z"
            ></path>{" "}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.7502 20.3925C13.0531 20.3257 13.3485 20.218 13.6276 20.0692C14.6271 19.5365 15.9185 18.9187 17 18.6334C17.8767 18.402 19.0157 18.2835 19.9851 18.2228C21.094 18.1535 22 17.2546 22 16.1436V4.93319C22 3.86075 21.1538 2.98041 20.082 3.01775C18.9534 3.05706 17.5469 3.17403 16.5 3.48744C15.5924 3.75916 14.5353 4.30418 13.6738 4.80275C13.3824 4.97142 13.0709 5.0953 12.7502 5.17387V20.3925ZM19.1821 9.72761C19.5839 9.62715 19.8282 9.21994 19.7278 8.8181C19.6273 8.41625 19.2201 8.17193 18.8183 8.27239L14.8183 9.27239C14.4164 9.37285 14.1721 9.78006 14.2726 10.1819C14.373 10.5837 14.7802 10.8281 15.1821 10.7276L19.1821 9.72761ZM19.1821 13.7276C19.5839 13.6271 19.8282 13.2199 19.7278 12.8181C19.6273 12.4163 19.2201 12.1719 18.8183 12.2724L14.8183 13.2724C14.4164 13.3729 14.1721 13.7801 14.2726 14.1819C14.373 14.5837 14.7802 14.8281 15.1821 14.7276L19.1821 13.7276Z"
            ></path>{" "}
          </g>
        </svg>
      ),
    },
    {
      name: "Publicar",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
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
            <path d="M16.1391 2.95907L7.10914 5.95907C1.03914 7.98907 1.03914 11.2991 7.10914 13.3191L9.78914 14.2091L10.6791 16.8891C12.6991 22.9591 16.0191 22.9591 18.0391 16.8891L21.0491 7.86907C22.3891 3.81907 20.1891 1.60907 16.1391 2.95907ZM16.4591 8.33907L12.6591 12.1591C12.5091 12.3091 12.3191 12.3791 12.1291 12.3791C11.9391 12.3791 11.7491 12.3091 11.5991 12.1591C11.3091 11.8691 11.3091 11.3891 11.5991 11.0991L15.3991 7.27907C15.6891 6.98907 16.1691 6.98907 16.4591 7.27907C16.7491 7.56907 16.7491 8.04907 16.4591 8.33907Z"></path>{" "}
          </g>
        </svg>
      ),
    },
  ];

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handlePageValidation = (obj: any) => {
    if (obj.content === null || obj.content === "") {
      handleShowToast(
        `En la página ${obj.pageNumber} falta el contenido.`,
        ToastType.ERROR
      );
      return false;
    }
    if (obj.imageBlob === null && obj.template !== "Template4") {
      handleShowToast(
        `En la página ${obj.pageNumber} falta la imagen.`,
        ToastType.ERROR
      );
      return false;
    }
    if (obj.audioBlob === null) {
      handleShowToast(
        `En las páginas que falta el audio se realizará lectura mediante IA.`,
        ToastType.INFO
      );
    }
    if (obj.videoBlob === null) {
      handleShowToast(
        `En la página ${obj.pageNumber} falta el video.`,
        ToastType.ERROR
      );
      return false;
    }
    return true;
  };

  const handleClick = async () => {
    if (currentStep === 2) {
      for (const obj of pages) {
        if (!handlePageValidation(obj)) {
          return;
        }
      }
    }
    if (currentStep !== 3) {
      handleNext();
    }
    if (currentStep == 3) {
      let body = {
        ...stepOne,
        categoriesIds: filterCategories,
        pages: pages,
      };
      const formData = new FormData();
      formData.append("bookName", body.bookName);
      formData.append("author", body.author);
      formData.append("publicationDate", body.publicationDate.toString());
      formData.append("bookCover", body.bookImage!);
      body.pages.forEach((page: any, index: any) => {
        formData.append(`pages[${index}][template]`, page.template);
        formData.append(`pages[${index}][content]`, page.content);
        formData.append(`pages[${index}][numberPage]`, page.numberPage);
        if (page.image) {
          formData.append(`pages[${index}][image]`, page.image);
        }
        if (page.audio) {
          formData.append(`pages[${index}][audio]`, page.audio);
        }
        if (page.video) {
          formData.append(`pages[${index}][video]`, page.video);
        }
      });
      formData.append("categoriesIds", JSON.stringify(body.categoriesIds));
      const response = await fetch("../../api/books", {
        method: "POST",
        body: formData,
      });
      const data: ResponseData<CategoriesAll[]> = await response.json();
    }
  };

  const handleChangeStepOne = (e: any) => {
    setStepOne({
      ...stepOne,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      setStepOne({
        ...stepOne,
        bookImage: file ?? null,
      });
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {};
        reader.readAsArrayBuffer(file);
      } else {
        setStepOne({
          ...stepOne,
          bookImage: null,
        });
      }
    };
    input.click();
  };

  return (
    <div className="shadow-xl rounded-xl p-3">
      <div className="py-2">
        <h1 className="relative text-3xl text-primary-500 font-bold">
          <span className="ps-2">Creación de Libro</span>
        </h1>
      </div>
      <div className="flex items-center justify-center flex-wrap gap-3 py-2 px-4 rounded-lg shadow-xl mx-5">
        {steps.map((step, index) => (
          <div key={index} className="flex justify-center">
            <div
              className={`flex items-center text-sm justify-start cursor-pointer pb-2 font-open-sans ${
                index === currentStep
                  ? "text-primary-500 border-b-4 border-secondary-400 font-bold"
                  : "text-gray-500"
              }`}
              onClick={() => setCurrentStep(index)}
            >
              <span className="mr-2">{step.icon}</span>
              <span className="flex text-secondary">{step.name}</span>
              {index != 3 ? (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full mt-4 flex items-center justify-center">
        {currentStep == 0 && (
          <div className="shadow-2xl w-full rounded-xl p-3">
            <div className="">
              <h1 className="pb-3 text-2xl text-left text-primary-500 font-bold">
                <span>Información del Libro</span>
              </h1>
            </div>
            <div className="py-1 grid gap-5 w-full px-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
              <div className="w-full col-span-2">
                <Input
                  label="Nombre del libro"
                  name="bookName"
                  placeholder="100 años de soledad"
                  value={stepOne.bookName}
                  type="text"
                  className="py-1"
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-iconBgColor"
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
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.27103 2.11151C5.46135 2.21816 5.03258 2.41324 4.72718 2.71244C4.42179 3.01165 4.22268 3.43172 4.11382 4.225C4.00176 5.04159 4 6.12387 4 7.67568V16.2442C4.38867 15.9781 4.82674 15.7756 5.29899 15.6517C5.82716 15.513 6.44305 15.5132 7.34563 15.5135L20 15.5135V7.67568C20 6.12387 19.9982 5.04159 19.8862 4.22499C19.7773 3.43172 19.5782 3.01165 19.2728 2.71244C18.9674 2.41324 18.5387 2.21816 17.729 2.11151C16.8955 2.00172 15.7908 2 14.2069 2H9.7931C8.2092 2 7.10452 2.00172 6.27103 2.11151ZM6.75862 6.59459C6.75862 6.1468 7.12914 5.78378 7.58621 5.78378H16.4138C16.8709 5.78378 17.2414 6.1468 17.2414 6.59459C17.2414 7.04239 16.8709 7.40541 16.4138 7.40541H7.58621C7.12914 7.40541 6.75862 7.04239 6.75862 6.59459ZM7.58621 9.56757C7.12914 9.56757 6.75862 9.93058 6.75862 10.3784C6.75862 10.8262 7.12914 11.1892 7.58621 11.1892H13.1034C13.5605 11.1892 13.931 10.8262 13.931 10.3784C13.931 9.93058 13.5605 9.56757 13.1034 9.56757H7.58621Z"
                        ></path>{" "}
                        <path d="M7.47341 17.1351H8.68965H13.1034H19.9991C19.9956 18.2657 19.9776 19.1088 19.8862 19.775C19.7773 20.5683 19.5782 20.9884 19.2728 21.2876C18.9674 21.5868 18.5387 21.7818 17.729 21.8885C16.8955 21.9983 15.7908 22 14.2069 22H9.7931C8.2092 22 7.10452 21.9983 6.27103 21.8885C5.46135 21.7818 5.03258 21.5868 4.72718 21.2876C4.42179 20.9884 4.22268 20.5683 4.11382 19.775C4.07259 19.4746 4.0463 19.1382 4.02952 18.7558C4.30088 18.0044 4.93365 17.4264 5.72738 17.218C6.01657 17.1421 6.39395 17.1351 7.47341 17.1351Z"></path>{" "}
                      </g>
                    </svg>
                  }
                  onChange={handleChangeStepOne}
                  validations={[validateNotEmpty]}
                ></Input>
                <h3 className="text-primary-500 font-poppins font-semibold text-xl">
                  Metadatos
                </h3>
                <Input
                  label="Autor del libro"
                  name="author"
                  placeholder="Gabriel Garcia Marquez"
                  value={stepOne.author}
                  type="text"
                  className="py-1"
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-iconBgColor"
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
                          d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z"
                        ></path>
                      </g>
                    </svg>
                  }
                  onChange={handleChangeStepOne}
                  validations={[validateNotEmpty]}
                ></Input>
                <Input
                  label="Ilustrador del libro"
                  name="illustrator"
                  placeholder="Luisa Rivera"
                  value={stepOne.illustrator}
                  type="text"
                  className="py-1"
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-iconBgColor"
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
                          d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z"
                        ></path>
                      </g>
                    </svg>
                  }
                  onChange={handleChangeStepOne}
                ></Input>
                <Input
                  label="Fecha de Publicación"
                  name="publicationDate"
                  placeholder="01/01/2000"
                  value={stepOne.publicationDate}
                  type="date"
                  className="py-1"
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-iconBgColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M7.75 2.5C7.75 2.08579 7.41421 1.75 7 1.75C6.58579 1.75 6.25 2.08579 6.25 2.5V4.07926C4.81067 4.19451 3.86577 4.47737 3.17157 5.17157C2.47737 5.86577 2.19451 6.81067 2.07926 8.25H21.9207C21.8055 6.81067 21.5226 5.86577 20.8284 5.17157C20.1342 4.47737 19.1893 4.19451 17.75 4.07926V2.5C17.75 2.08579 17.4142 1.75 17 1.75C16.5858 1.75 16.25 2.08579 16.25 2.5V4.0129C15.5847 4 14.839 4 14 4H10C9.16097 4 8.41527 4 7.75 4.0129V2.5Z"></path>{" "}
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2 12C2 11.161 2 10.4153 2.0129 9.75H21.9871C22 10.4153 22 11.161 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12ZM17 14C17.5523 14 18 13.5523 18 13C18 12.4477 17.5523 12 17 12C16.4477 12 16 12.4477 16 13C16 13.5523 16.4477 14 17 14ZM17 18C17.5523 18 18 17.5523 18 17C18 16.4477 17.5523 16 17 16C16.4477 16 16 16.4477 16 17C16 17.5523 16.4477 18 17 18ZM13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13ZM13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17ZM7 14C7.55228 14 8 13.5523 8 13C8 12.4477 7.55228 12 7 12C6.44772 12 6 12.4477 6 13C6 13.5523 6.44772 14 7 14ZM7 18C7.55228 18 8 17.5523 8 17C8 16.4477 7.55228 16 7 16C6.44772 16 6 16.4477 6 17C6 17.5523 6.44772 18 7 18Z"
                        ></path>
                      </g>
                    </svg>
                  }
                  onChange={handleChangeStepOne}
                  validations={[validateCorrectDate]}
                ></Input>
              </div>
              <div>
                <div className="font-open-sans mb-1 text-sm font-bold text-labelInputText">
                  Portada del libro
                </div>
                <div
                  className="bg-bgInputText rounded-md h-64 flex items-center justify-center mb-4 cursor-pointer hover:text-secondary-400 hover:border hover:border-black"
                  onClick={handleImageUpload}
                >
                  {stepOne.bookImage ? (
                    <img
                      src={URL.createObjectURL(stepOne.bookImage)}
                      alt="Imagen"
                      className="max-h-full max-w-full"
                    />
                  ) : (
                    <span className="text-gray-500">
                      Haga clic para agregar la portada
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {currentStep == 1 && (
          <div className="shadow-2xl w-full rounded-xl p-3">
            <div className="">
              <h1 className="relative ps-2 pb-3 text-2xl text-left text-primary-500 font-bold">
                <span>Categorías del Libro</span>
              </h1>
            </div>
            <div className="py-1 grid gap-3 w-full px-2">
              <h3 className="text-primary-500 font-open-sans font-normal text-base">
                Selecciona una o mas cateogrías
              </h3>
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
        )}
        <div style={{ display: currentStep === 2 ? "block" : "none" }}>
          <BookEditor
            onChangedPages={(pages: any) => {
              console.log(pages);
              setPages(pages);
            }}
          />
        </div>
        {currentStep == 3 && (
          <div className="shadow-2xl w-full rounded-xl p-3">
            <div className="flex items-center justify-between pb-2 flex-wrap">
              <h1 className="relative ps-2 pb-3 text-2xl text-left text-primary-500 font-bold">
                <span>Publicar Libro</span>
              </h1>
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    console.log("Paginas al momento: ", pages);
                    setSelectedBook({
                      idBook: 0,
                      author: stepOne.author,
                      bookName: stepOne.bookName,
                      publicationDate: stepOne.publicationDate,
                      isFavorite: false,
                      isViewed: false,
                      coverPhoto: stepOne.bookImage,
                      illustrator: stepOne.illustrator,
                    });
                    pages.unshift({
                      video: null,
                      audio: null,
                      numberPage: 0,
                      template: "Cover",
                      content: "",
                      image: selectedBook?.coverPhoto,
                    });
                    setPrevisualize(true);
                  }}
                  className="w-full flex text-sm items-center justify-center font-open-sans font-normal py-1 rounded-lg bg-bgButtonPrevFill text-textButtonPrevFill px-3 hover:text-textButtonPrevFillHover hover:bg-bgButtonPrevFillHover"
                >
                  Previsualizar libro
                </button>
              </div>
            </div>
            {visible && (
              <div
                className={`flex xl:w-1/2 lg:w-1/2 md:w-full sm:w-full items-center top-4 rounded-md font-bold font-opens-sans text-base bg-tertiary-200 text-tertiary p-4${
                  visible ? "opacity-100" : "opacity-0"
                } transition-opacity duration-500`}
              >
                <div className="ms-4 grow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="py-1 ms-2 grow">
                  Por favor, revise todo antes de publicar el libro.
                </span>
                <button
                  className="text-white pe-2 top-1 hover:text-gray-300 focus:outline-none"
                  onClick={() => {
                    setVisible(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}
            <div>
              {previsualize && (
                <Dialog
                  open={previsualize}
                  onOpenChange={(open: boolean) => {
                    setPrevisualize(open);
                    if (!open) {
                      pages.shift();
                    }
                  }}
                >
                  <DialogContent className="bg-bgColorRight">
                    <DialogHeader>
                      <DialogDescription>
                        <FlipBook
                          pages={pages!}
                          startPage={0}
                          isViewed={true}
                          coverInfo={{
                            author: selectedBook?.author ?? "",
                            bookName: selectedBook!.bookName,
                            coverPhoto: selectedBook!.coverPhoto!,
                            publicationDate: selectedBook!.publicationDate,
                            idBook: selectedBook!.idBook,
                          }}
                        />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-end mt-4 px-5 gap-3">
        <ButtonOutlined
          onClick={() => {}}
          className={
            "border-red-600 text-red-600 hover:text-white hover:bg-red-600"
          }
        >
          Cancelar
        </ButtonOutlined>
        <Button onClick={handleClick}>
          {currentStep === 3 ? "Publicar" : "Siguiente"}
        </Button>
      </div>
    </div>
  );
}
