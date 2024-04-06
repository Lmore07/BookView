"use client";
import { CategoriesAll } from "@/libs/interfaces/categories.interface";
import { ResponseData } from "@/libs/interfaces/response.interface";
import ButtonOutlined from "@/ui/components/buttons/ButtonOutlined";
import Input from "@/ui/components/inputs/input";
import "@/ui/globals.css";
import { useEffect, useState } from "react";

export default function Home() {
  //Variables declaradas
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<CategoriesAll[]>([]);
  const [filterCategories, setFilterCategories] = useState<number[]>([]);

  const handleChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    console.log(filterCategories);
  }, [filterCategories]);

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
      <div className="flex gap-5">
        <div className="w-5/6">
          <Input
            label="Encuentra el libro que buscas"
            name="bookName"
            placeholder="Escribe el nombre o autor del libro"
            type="text"
            voiceToText={true}
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
        <div>
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
