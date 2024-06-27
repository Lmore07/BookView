"use client";
import { LoadingContext } from "@/libs/contexts/loadingContext";
import { ToastContext } from "@/libs/contexts/toastContext";
import { ToastType } from "@/libs/interfaces/toast.interface";
import { validateNotEmpty } from "@/libs/validations/validations";
import Button from "@/ui/components/buttons/ButtonFill";
import Input from "@/ui/components/inputs/input";
import TextArea from "@/ui/components/inputs/textArea";
import { useContext, useState } from "react";

interface CreateFolderProps {
  onClose: () => void;
  onFolderCreated: () => void;
}

const CreateFolder: React.FC<CreateFolderProps> = ({
  onClose,
  onFolderCreated,
}) => {
  const { handleShowToast } = useContext(ToastContext)!;
  const { setIsLoading } = useContext(LoadingContext)!;

  const validateForm = () => {
    const validations = [
      {
        fieldName: "name",
        value: dataFolderCreate.name,
        validations: [validateNotEmpty],
      },
      {
        fieldName: "description",
        value: dataFolderCreate.description,
        validations: [validateNotEmpty],
      },
    ];
    const formIsValid = validations.every((field) =>
      field.validations.every((validation) => !validation(field.value))
    );

    return formIsValid;
  };

  const [dataFolderCreate, setDataFolderCreate] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e: any) => {
    setDataFolderCreate({
      ...dataFolderCreate,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    const event = new CustomEvent("validate-form", {
      bubbles: true,
      cancelable: true,
    });
    window.dispatchEvent(event);
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await fetch(`../api/folders`, {
          method: "POST",
          body: JSON.stringify(dataFolderCreate),
        });
        const data = await response.json();
        if (response.ok) {
          handleShowToast(data.message, ToastType.SUCCESS);
          onClose();
          onFolderCreated();
        } else {
          handleShowToast(data.error, ToastType.ERROR);
        }
      } catch (error) {
        handleShowToast(
          "Ocurrió un error al crear la carpeta",
          ToastType.ERROR
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      handleShowToast(
        "Por favor, complete los campos correctamente",
        ToastType.WARNING
      );
    }
  };

  return (
    <div className="shadow-2xl w-full rounded-lg py-3 bg-bgColorLeft">
      <div className="pb-3 ps-3 text-left font-bold text-lg text-primary-500 font-custom">
        + Crear nueva carpeta
      </div>
      <div className="py-2 gap-4 grid grid-cols-1 md:gap-4 xl:gap-5 sm:gap-4 lg:gap-5 sm:grid-cols-1 px-10">
        <Input
          label="Nombre de carpeta"
          placeholder="Carpeta de matemáticas"
          maxLength={100}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-iconBgColor"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          }
          name="name"
          value={dataFolderCreate.name}
          type="text"
          onChange={handleChange}
          validations={[validateNotEmpty]}
        ></Input>
        <TextArea
          label="Descripción de la carpeta"
          placeholder="Carpeta de matemáticas de 1ro de secundaria"
          name="description"
          rows={2}
          value={dataFolderCreate.description}
          onChange={handleChange}
          validations={[validateNotEmpty]}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-iconBgColor"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          }
        ></TextArea>
      </div>
      <div className="py-3 grid px-10">
        <Button onClick={handleClick}>Crear carpeta</Button>
      </div>
    </div>
  );
};

export default CreateFolder;
