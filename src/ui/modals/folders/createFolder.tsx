"use client";
import { LoadingContext } from "@/libs/contexts/loadingContext";
import { ToastContext } from "@/libs/contexts/toastContext";
import { ToastType } from "@/libs/interfaces/toast.interface";
import { folderSchema } from "@/libs/schemas/folder";
import Button from "@/ui/components/buttons/ButtonFill";
import InputNUI from "@/ui/components/inputs/inputNUI";
import TextAreaNUI from "@/ui/components/inputs/textAreaNUI";
import { Form } from "@/ui/shadcn/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CreateFolderProps {
  onClose: () => void;
  onFolderCreated: () => void;
  values?: any;
  method: string;
  id?: number;
}

const CreateFolder: React.FC<CreateFolderProps> = ({
  onClose,
  onFolderCreated,
  values,
  method,
  id,
}) => {
  const { handleShowToast } = useContext(ToastContext)!;
  const { setIsLoading } = useContext(LoadingContext)!;

  const form = useForm<z.infer<typeof folderSchema>>({
    resolver: zodResolver(folderSchema),
    defaultValues: {
      name: values?.folderName ?? "",
      description: values?.folderDescription ?? "",
    },
    mode: "all",
  });

  async function onSubmit(values: z.infer<typeof folderSchema>) {
    try {
      setIsLoading(true);
      let response;
      if (id != null) {
        response = await fetch(`../api/folders?id=${id}`, {
          method: method,
          body: JSON.stringify(values),
        });
      } else {
        response = await fetch(`../api/folders`, {
          method: method,
          body: JSON.stringify(values),
        });
      }
      const data = await response.json();
      if (response.ok) {
        handleShowToast(data.message, ToastType.SUCCESS);
        onClose();
        onFolderCreated();
      } else {
        handleShowToast(data.error, ToastType.ERROR);
      }
    } catch (error) {
      handleShowToast("Ocurrió un error inesperado", ToastType.ERROR);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="shadow-2xl w-full rounded-lg py-3 bg-bgColorLeft">
      <div className="pb-3 ps-3 text-left font-bold text-lg text-primary-500 font-custom">
        {id == null ? "+ Crear nueva carpeta" : "Editar carpeta"}
      </div>
      <div className="py-2 gap-4 grid grid-cols-1 md:gap-4 xl:gap-5 sm:gap-4 lg:gap-5 sm:grid-cols-1 px-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              console.log(errors);
              handleShowToast(
                "Por favor, verifique que los campos hayan sido ingresados",
                ToastType.WARNING
              );
            })}
            className="space-y-4"
          >
            <InputNUI
              form={form}
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
              type="text"
            ></InputNUI>
            <TextAreaNUI
              form={form}
              label="Descripción de la carpeta"
              placeholder="Carpeta de matemáticas de 1ro de secundaria"
              name="description"
              rows={2}
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
            ></TextAreaNUI>
            <div className="py-3 grid px-10">
              <Button type="submit">
                {values == undefined ? "Crear carpeta" : "Editar carpeta"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateFolder;
