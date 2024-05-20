import { LoadingContext } from "@/libs/contexts/loadingContext";
import { ToastContext } from "@/libs/contexts/toastContext";
import { ToastType } from "@/libs/interfaces/toast.interface";
import { validateNotEmpty, validateUrl } from "@/libs/validations/validations";
import Button from "@/ui/components/buttons/ButtonFill";
import Input from "@/ui/components/inputs/input";
import { useContext, useEffect, useState } from "react";

const CategoryComponent: React.FC<{
  category: { name: string | null; description: string | null };
  idCategory: number;
  onFinish: () => void;
}> = ({ category, idCategory, onFinish }) => {
  const [categoryInfo, setCategoryInfo] = useState({
    name: category.name ?? "",
    description: category.description ?? "",
  });
  const { handleShowToast } = useContext(ToastContext)!;
  const { setIsLoading } = useContext(LoadingContext)!;

  const validateForm = () => {
    const validations = [
      {
        fieldName: "name",
        value: categoryInfo.name,
        validations: [validateNotEmpty],
      },
      {
        fieldName: "description",
        value: categoryInfo.description,
        validations: [validateNotEmpty],
      },
    ];

    const formIsValid = validations.every((field) =>
      field.validations.every((validation) => !validation(field.value))
    );

    return formIsValid;
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
        let res: any;
        if (idCategory == 0) {
          res = await fetch("../api/admin/categories", {
            cache: "no-store",
            method: "POST",
            body: JSON.stringify(categoryInfo),
          });
        } else {
          res = await fetch(`../api/admin/categories?id=${idCategory}`, {
            cache: "no-store",
            method: "PUT",
            body: JSON.stringify(categoryInfo),
          });
        }
        const response = await res.json();
        if (res.ok) {
          handleShowToast(response.message, ToastType.SUCCESS);
        } else {
          handleShowToast(response.error, ToastType.ERROR);
        }
      } catch (error) {
        handleShowToast("Ocurrio un error inesperado", ToastType.ERROR);
      } finally {
        setIsLoading(false);
        onFinish();
      }
    } else {
      handleShowToast("Por favor ingrese datos válidos.", ToastType.WARNING);
    }
  };

  const handleChange = (e: any) => {
    setCategoryInfo({
      ...categoryInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full rounded-lg">
      <div className="flex items-center text-left font-bold text-lg text-primary-500 font-poppins">
        <span>{idCategory == 0 ? "Insertar" : "Actualizar"} categoría </span>
      </div>
      <div className="my-2">
        <Input
          label="Nombre de la categoría"
          name="name"
          onChange={handleChange}
          placeholder="Ciencias de la Ingeniería"
          type="text"
          maxLength={50}
          value={categoryInfo.name}
          validations={[validateNotEmpty]}
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
                <path d="M15.7285 3.88396C17.1629 2.44407 19.2609 2.41383 20.4224 3.57981C21.586 4.74798 21.5547 6.85922 20.1194 8.30009L17.6956 10.7333C17.4033 11.0268 17.4042 11.5017 17.6976 11.794C17.9911 12.0863 18.466 12.0854 18.7583 11.7919L21.1821 9.35869C23.0934 7.43998 23.3334 4.37665 21.4851 2.5212C19.6346 0.663551 16.5781 0.905664 14.6658 2.82536L9.81817 7.69182C7.90688 9.61053 7.66692 12.6739 9.51519 14.5293C9.80751 14.8228 10.2824 14.8237 10.5758 14.5314C10.8693 14.2391 10.8702 13.7642 10.5779 13.4707C9.41425 12.3026 9.44559 10.1913 10.8809 8.75042L15.7285 3.88396Z"></path>
                <path d="M14.4851 9.47074C14.1928 9.17728 13.7179 9.17636 13.4244 9.46868C13.131 9.76101 13.1301 10.2359 13.4224 10.5293C14.586 11.6975 14.5547 13.8087 13.1194 15.2496L8.27178 20.1161C6.83745 21.556 4.73937 21.5863 3.57791 20.4203C2.41424 19.2521 2.44559 17.1408 3.88089 15.6999L6.30473 13.2667C6.59706 12.9732 6.59614 12.4984 6.30268 12.206C6.00922 11.9137 5.53434 11.9146 5.24202 12.2081L2.81818 14.6413C0.906876 16.5601 0.666916 19.6234 2.51519 21.4789C4.36567 23.3365 7.42221 23.0944 9.33449 21.1747L14.1821 16.3082C16.0934 14.3895 16.3334 11.3262 14.4851 9.47074Z"></path>
              </g>
            </svg>
          }
        ></Input>
      </div>
      <div className="my-2">
        <Input
          label="Descripción de la categoría"
          name="description"
          onChange={handleChange}
          placeholder="Descripción"
          type="text"
          maxLength={255}
          value={categoryInfo.description}
          validations={[validateNotEmpty]}
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
                <path d="M15.7285 3.88396C17.1629 2.44407 19.2609 2.41383 20.4224 3.57981C21.586 4.74798 21.5547 6.85922 20.1194 8.30009L17.6956 10.7333C17.4033 11.0268 17.4042 11.5017 17.6976 11.794C17.9911 12.0863 18.466 12.0854 18.7583 11.7919L21.1821 9.35869C23.0934 7.43998 23.3334 4.37665 21.4851 2.5212C19.6346 0.663551 16.5781 0.905664 14.6658 2.82536L9.81817 7.69182C7.90688 9.61053 7.66692 12.6739 9.51519 14.5293C9.80751 14.8228 10.2824 14.8237 10.5758 14.5314C10.8693 14.2391 10.8702 13.7642 10.5779 13.4707C9.41425 12.3026 9.44559 10.1913 10.8809 8.75042L15.7285 3.88396Z"></path>
                <path d="M14.4851 9.47074C14.1928 9.17728 13.7179 9.17636 13.4244 9.46868C13.131 9.76101 13.1301 10.2359 13.4224 10.5293C14.586 11.6975 14.5547 13.8087 13.1194 15.2496L8.27178 20.1161C6.83745 21.556 4.73937 21.5863 3.57791 20.4203C2.41424 19.2521 2.44559 17.1408 3.88089 15.6999L6.30473 13.2667C6.59706 12.9732 6.59614 12.4984 6.30268 12.206C6.00922 11.9137 5.53434 11.9146 5.24202 12.2081L2.81818 14.6413C0.906876 16.5601 0.666916 19.6234 2.51519 21.4789C4.36567 23.3365 7.42221 23.0944 9.33449 21.1747L14.1821 16.3082C16.0934 14.3895 16.3334 11.3262 14.4851 9.47074Z"></path>
              </g>
            </svg>
          }
        ></Input>
      </div>
      <div className="mx-36">
        <Button onClick={handleClick}>Aceptar</Button>
      </div>
    </div>
  );
};

export default CategoryComponent;
