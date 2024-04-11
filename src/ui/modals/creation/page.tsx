import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import { useState } from "react";
import NoImage from "../../../../public/imgs/no-image.jpg";
import Template1 from "./pages/templateOne";
import Template2 from "./pages/templateTwo";
import Template3 from "./pages/templateThree";
import Template4 from "./pages/templateFour";

const BookEditor = () => {
  const [pages, setPages] = useState<any>([]);

  const addPage = (template: any) => {
    setPages([
      ...pages,
      { template, content: "", imageBlob: null, pageNumber: pages.length + 1 },
    ]);
  };

  const removePage = (index: any) => {
    const newPages = [...pages];
    newPages.splice(index, 1);
    setPages(newPages.map((page, i) => ({ ...page, pageNumber: i + 1 })));
  };

  const updatePageContent = (index: any, content: any, imageBlob: any) => {
    const newPages = [...pages];
    newPages[index].content = content;
    newPages[index].imageBlob = imageBlob;
    setPages(newPages);
    console.log(newPages);
  };

  return (
    <div className="bg-gray-100 flex flex-col">
      <div className="p-8">
        <div className="mx-auto">
          {pages.map((page: any, index: any) => (
            <div key={index} className="mb-8">
              <div className="mb-2 font-semibold">
                <Divider>
                  <Chip label={`Pagina N° ${page.pageNumber}`} size="medium" />
                </Divider>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                {page.template === "Template1" && (
                  <Template1
                    content={page.content}
                    onContentChange={(content: any, imageBlob: any) =>
                      updatePageContent(index, content, imageBlob)
                    }
                  />
                )}
                {page.template === "Template2" && (
                  <Template2
                    content={page.content}
                    onContentChange={(content: any, imageBlob: any) =>
                      updatePageContent(index, content, imageBlob)
                    }
                  />
                )}
                {page.template === "Template3" && (
                  <Template3
                    content={page.content}
                    onContentChange={(content: any, imageBlob: any) =>
                      updatePageContent(index, content, imageBlob)
                    }
                  />
                )}
                {page.template === "Template4" && (
                  <Template4
                    content={page.content}
                    onContentChange={(content: any, imageBlob: any) =>
                      updatePageContent(index, content, imageBlob)
                    }
                  />
                )}
              </div>
              <div className="text-right mt-2">
                <button
                  onClick={() => removePage(index)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Eliminar página
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white shadow-xl">
        <div className="mt-3">
          <h1 className="relative text-sm text-primary-500 font-bold underline">
            <span className="ps-2">Selecciona una plantilla</span>
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div
            className="rounded border cursor-pointer hover:animate-pulse  overflow-hidden shadow-lg m-4"
            onClick={() => addPage("Template1")}
          >
            <div className="flex items-center shrink  justify-center">
              <Image alt="Logo" width={100} src={NoImage}></Image>
            </div>
            <div className="px-2 mb-2 text-center">
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
          <div
            className="rounded overflow-hidden cursor-pointer hover:animate-pulse border shadow-lg m-4 flex gap-3"
            onClick={() => addPage("Template2")}
          >
            <div className="px-2 py-1 flex items-center">
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="flex items-center shrink justify-center me-2">
              <Image alt="Logo" src={NoImage}></Image>
            </div>
          </div>
          <div
            className="rounded overflow-hidden cursor-pointer hover:animate-pulse border shadow-lg m-4 flex gap-3"
            onClick={() => addPage("Template3")}
          >
            <div className="flex items-center justify-center ms-2">
              <Image alt="Logo" src={NoImage}></Image>
            </div>
            <div className="px-2 py-1 flex items-center">
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
          <div
            className="rounded border cursor-pointer hover:animate-pulse  overflow-hidden shadow-lg m-4 p-2"
            onClick={() => addPage("Template4")}
          >
            <div className="px-2 py-1 mr-1">
              <p className="text-gray-700 text-base ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookEditor;
