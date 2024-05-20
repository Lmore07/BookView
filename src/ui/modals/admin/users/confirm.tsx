import { LoadingContext } from "@/libs/contexts/loadingContext";
import { ToastContext } from "@/libs/contexts/toastContext";
import { ResponseData } from "@/libs/interfaces/response.interface";
import { ToastType } from "@/libs/interfaces/toast.interface";
import { validateNotEmpty, validateUrl } from "@/libs/validations/validations";
import Button from "@/ui/components/buttons/ButtonFill";
import Input from "@/ui/components/inputs/input";
import { useContext, useEffect, useState } from "react";

const ConfirmActiveOrDesactive: React.FC<{
  action: "active" | "desactive";
  idItem: number;
  status: boolean;
  onFinish: () => void;
  entity: string;
  route: string;
}> = ({ action, idItem, onFinish, status, route, entity }) => {
  const { handleShowToast } = useContext(ToastContext)!;
  const { setIsLoading } = useContext(LoadingContext)!;

  const handleActiveOrDeactive = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`../api/admin/${route}?id=${idItem}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: status }),
      });
      const data: ResponseData<any> = await response.json();
      if (data.error) {
        handleShowToast(data.message!, ToastType.ERROR);
      } else {
        handleShowToast(data.message!, ToastType.SUCCESS);
      }
    } catch (error) {
      handleShowToast(
        `Ocurrió un error al actualizar el ${entity}`,
        ToastType.ERROR
      );
    } finally {
      setIsLoading(false);
      onFinish();
    }
  };

  return (
    <div className="w-full rounded-lg">
      <div
        className={`flex items-center text-left font-bold text-lg ${
          action == "active" ? "text-primary-500" : "text-red-900"
        } font-poppins`}
      >
        <div>
          {action == "active" ? (
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>
        <span>
          {action == "active" ? "Activar" : "Desactivar"} {entity}
        </span>
      </div>
      <div className="my-5">
        <span className="font-poppins">
          ¿Está seguro que desea {action == "active" ? "activar" : "desactivar"}{" "}
          {entity}?
        </span>
      </div>
      <div className="mx-36">
        <Button
          onClick={handleActiveOrDeactive}
          className={
            action === "desactive" ? "bg-red-900 text-textButtonFill" : null
          }
        >
          Aceptar
        </Button>
      </div>
    </div>
  );
};

export default ConfirmActiveOrDesactive;
