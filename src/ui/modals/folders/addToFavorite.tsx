"use client";

import { LoadingContext } from "@/libs/contexts/loadingContext";
import { ToastContext } from "@/libs/contexts/toastContext";
import { BooksAll } from "@/libs/interfaces/books.interface";
import { FoldersAll } from "@/libs/interfaces/folders.interface";
import { ResponseData } from "@/libs/interfaces/response.interface";
import { ToastType } from "@/libs/interfaces/toast.interface";
import Button from "@/ui/components/buttons/ButtonFill";
import ButtonOutlined from "@/ui/components/buttons/ButtonOutlined";
import { useContext, useEffect, useState } from "react";

interface DeleteToFavoriteProps {
  book: BooksAll;
  onClose?: () => void;
  onAddFavorite?: () => void;
}

const AddToFavorite: React.FC<DeleteToFavoriteProps> = ({
  book,
  onAddFavorite,
  onClose,
}) => {
  const [folders, setFolders] = useState<FoldersAll[]>([]);

  const { handleShowToast } = useContext(ToastContext)!;
  const { setIsLoading } = useContext(LoadingContext)!;
  const [selectedFolder, setSelectedFolder] = useState<FoldersAll | null>(null);

  const handleFolderChange = (folder: FoldersAll) => {
    setSelectedFolder(folder);
  };

  const handleClickSave = async () => {
    if (selectedFolder === undefined || selectedFolder === null) {
      handleShowToast("Selecciona una carpeta", ToastType.ERROR);
    } else {
      setIsLoading(true);
      const body = {
        idBook: book.idBook,
        idFolder: selectedFolder.idFolder,
      };
      try {
        const response = await fetch("../api/books/favorites", {
          method: "POST",
          body: JSON.stringify(body),
        });
        const data: ResponseData<any> = await response.json();
        if (data.error) {
          handleShowToast(data.message!, ToastType.ERROR);
        } else {
          handleShowToast(data.message!, ToastType.SUCCESS);
        }
      } catch (error) {
        handleShowToast(
          "No se pudo agregar el libro a favoritos",
          ToastType.ERROR
        );
      } finally {
        setIsLoading(false);
        onAddFavorite?.();
      }
    }
  };

  const handleClickCancel = () => {
    onClose?.();
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`../api/folders/?limit=9999999&page=1`);
      const data: ResponseData<FoldersAll[]> = await response.json();
      if (data.error) {
        handleShowToast(data.message!, ToastType.ERROR);
      } else {
        setFolders(data.data ?? []);
      }
    } catch (error) {
      console.error(error);
      handleShowToast("Error al cargar las carpetas", ToastType.ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="shadow-2xl w-full rounded-lg py-3 bg-bgColorLeft">
      <div className="pb-3 ps-3 text-left font-bold text-lg text-primary-500 font-custom">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 inline-block mr-2"
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
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM16 14.0455V11.5488C16 9.40445 16 8.3323 15.4142 7.66615C14.8284 7 13.8856 7 12 7C10.1144 7 9.17157 7 8.58579 7.66615C8 8.3323 8 9.40445 8 11.5488V14.0455C8 15.5937 8 16.3679 8.32627 16.7062C8.48187 16.8675 8.67829 16.9688 8.88752 16.9958C9.32623 17.0522 9.83855 16.5425 10.8632 15.5229C11.3161 15.0722 11.5426 14.8469 11.8046 14.7875C11.9336 14.7583 12.0664 14.7583 12.1954 14.7875C12.4574 14.8469 12.6839 15.0722 13.1368 15.5229C14.1615 16.5425 14.6738 17.0522 15.1125 16.9958C15.3217 16.9688 15.5181 16.8675 15.6737 16.7062C16 16.3679 16 15.5937 16 14.0455Z"
            ></path>
          </g>
        </svg>
        Agregar libro a favoritos
      </div>
      <div className="pb-3 ps-3 text-left font-custom">
        Elige donde quieres guardar el libro:{" "}
        <b className="capitalize">{book.bookName}</b>
      </div>
      <div className="p-2 text-left font-custom flex flex-wrap gap-3 mx-2">
        {folders.map((folder) => (
          <div
            key={folder.idFolder}
            className={`flex items-center cursor-pointer ${
              selectedFolder?.idFolder === folder.idFolder
                ? "bg-primary-500 text-white rounded-md p-2"
                : "bg-gray-200 text-gray-800 rounded-md p-2 hover:bg-gray-300"
            }`}
            onClick={() => handleFolderChange(folder)}
          >
            {selectedFolder?.idFolder === folder.idFolder && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <div>{folder.folderName}</div>
          </div>
        ))}
      </div>
      <div className="flex pb-1 ps-3 items-center justify-center gap-3 flex-wrap">
        <Button onClick={handleClickSave}>Aceptar</Button>
        <ButtonOutlined
          className={
            "border-red-600 text-red-600 hover:text-white hover:bg-red-600"
          }
          onClick={handleClickCancel}
        >
          Cancelar
        </ButtonOutlined>
      </div>
    </div>
  );
};

export default AddToFavorite;
