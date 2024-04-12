"use client";
import FolderCard from "@/ui/components/cards/folderCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/ui/components/buttons/ButtonFill";
import CreateFolder from "@/ui/modals/folders/createFolder";
import ModalParent from "@/ui/modals/modal";
import { ResponseData } from "@/libs/interfaces/response.interface";
import { FoldersAll } from "@/libs/interfaces/folders.interface";
import { LoadingContext } from "@/libs/contexts/loadingContext";
import { ToastContext } from "@/libs/contexts/toastContext";
import { ToastType } from "@/libs/interfaces/toast.interface";

export default function Favorites() {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [folders, setFolders] = useState<FoldersAll[]>([]);
  const [reloadData, setReloadData] = useState(false);
  const { setIsLoading } = useContext(LoadingContext)!;
  const { handleShowToast } = useContext(ToastContext)!;

  const handleChange = (event: any, value: number) => {
    setPage(value);
  };

  const handleClickFolder = (id: number) => {
    router.push(`/reader/favorites/${id}`);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`../api/folders/?limit=8&page=${page}`);
      const data: ResponseData<FoldersAll[]> = await response.json();
      if (data.statusCode != 200) {
        handleShowToast(data.message ?? "Error", ToastType.ERROR);
        return;
      }
      setTotalPages(data.pagination?.totalPages ?? 0);
      setPage(data.pagination?.currentPage ?? 0);
      setFolders(data.data ?? []);
    } catch (error) {
      console.error(error);
      handleShowToast("Error al cargar las carpetas", ToastType.ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [reloadData]);

  return (
    <div className="shadow-2xl p-4 rounded-lg">
      <div className="flex flex-wrap justify-between mb-5">
        <h1 className="relative text-2xl text-primary-500 font-bold before:content-[''] before:block before:absolute before:h-full before:w-1 before:bg-primary-500 before:left-0">
          <span className="ps-2">Mis favoritos</span>
        </h1>
        <Button
          onClick={() => {
            setOpen(true);
          }}
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
        >
          Agregar carpeta
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {folders.map((folder) => (
          <FolderCard
            key={folder.idFolder}
            folderName={folder.folderName}
            imageUrl={folder.urlFolder}
            onClick={() => handleClickFolder(folder.idFolder)}
          />
        ))}
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
            onChange={handleChange}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
      {open && (
        <ModalParent onClose={handleClose}>
          <CreateFolder
            onClose={handleClose}
            onFolderCreated={() => setReloadData((prevState) => !prevState)}
          />
        </ModalParent>
      )}
    </div>
  );
}
