import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import template1 from "../../../../public/templates/template1.svg";
import template2 from "../../../../public/templates/template2.svg";
import template3 from "../../../../public/templates/template3.svg";
import template4 from "../../../../public/templates/template4.svg";
import template5 from "../../../../public/templates/template5.svg";
import Template4 from "./pages/templateFour";
import Template1 from "./pages/templateOne";
import Template3 from "./pages/templateThree";
import Template2 from "./pages/templateTwo";
import Template5 from "./pages/templateFive";

const BookEditor: React.FC<{ onChangedPages: any; pagesEdit?: any[] }> = ({
  onChangedPages,
  pagesEdit,
}) => {
  const [pages, setPages] = useState<any>(pagesEdit ?? []);
  const didRun = useRef(false);

  const addPage = (template: any) => {
    setPages([
      ...pages,
      {
        idPage: null,
        template,
        content: "",
        image: null,
        numberPage: pages.length + 1,
        audio: null,
        video: null,
      },
    ]);
  };

  const removePage = (index: any) => {
    const newPages = [...pages];
    newPages.splice(index, 1);
    setPages(newPages.map((page, i) => ({ ...page, numberPage: i + 1 })));
  };

  const updatePageContent = (
    index: any,
    content: any,
    image: any,
    audio?: any,
    video?: any
  ) => {
    const newPages = [...pages];
    newPages[index].content = content;
    newPages[index].image = image;
    newPages[index].audio = audio;
    newPages[index].video = video;
    setPages(newPages);
  };

  useEffect(() => {
    if (!didRun.current && pagesEdit && pagesEdit.length > 0) {
      setPages(pagesEdit);
      didRun.current = true;
    }
  }, [pagesEdit]);

  useEffect(() => {
    onChangedPages(pages);
  }, [pages]);

  return (
    <div className="flex flex-col">
      <div>
        <div className="mx-auto">
          {pages.map((page: any, index: any) => (
            <div key={index} className="mb-8">
              <div className="mb-2 font-semibold">
                <Divider className="border-t-black">
                  <Chip label={`Pagina N° ${page.numberPage}`} size="medium" />
                </Divider>
              </div>
              <div className="bg-bgColorLeft p-6 rounded-lg shadow-xl">
                {page.template === "Template1" && (
                  <Template1
                    content={page.content}
                    image={page.image}
                    audio={page.audio}
                    video={page.video}
                    onContentChange={(
                      content: any,
                      image: any,
                      audio: any,
                      video: any
                    ) => updatePageContent(index, content, image, audio, video)}
                  />
                )}
                {page.template === "Template2" && (
                  <Template2
                    content={page.content}
                    image={page.image}
                    audio={page.audio}
                    video={page.video}
                    onContentChange={(
                      content: any,
                      image: any,
                      audio: any,
                      video: any
                    ) => updatePageContent(index, content, image, audio, video)}
                  />
                )}
                {page.template === "Template3" && (
                  <Template3
                    content={page.content}
                    image={page.image}
                    audio={page.audio}
                    video={page.video}
                    onContentChange={(
                      content: any,
                      image: any,
                      audio: any,
                      video: any
                    ) => updatePageContent(index, content, image, audio, video)}
                  />
                )}
                {page.template === "Template4" && (
                  <Template4
                    content={page.content}
                    audio={page.audio}
                    video={page.video}
                    onContentChange={(
                      content: any,
                      image: any,
                      audio: any,
                      video: any
                    ) => updatePageContent(index, content, image, audio, video)}
                  />
                )}
                {page.template === "Template5" && (
                  <Template5
                    image={page.image}
                    audio={page.audio}
                    video={page.video}
                    onContentChange={(image: any, audio: any, video: any) =>
                      updatePageContent(index, null, image, audio, video)
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
      <div className="bg-bgColorDark rounded-md shadow-xl">
        <div className="mt-3">
          <h1 className="font-custom relative cursor-default text-sm text-primary-500 font-bold underline">
            <span className="ps-2">Selecciona una plantilla</span>
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-4 justify-center">
          <Image
            onClick={() => addPage("Template1")}
            alt="Logo"
            className="cursor-pointer"
            src={template1}
            width={200}
            height={100}
          ></Image>
          <Image
            onClick={() => addPage("Template2")}
            alt="Logo"
            className="cursor-pointer"
            src={template2}
            width={200}
            height={100}
          ></Image>
          <Image
            onClick={() => addPage("Template3")}
            alt="Logo"
            className="cursor-pointer"
            src={template3}
            width={200}
            height={100}
          ></Image>
          <Image
            onClick={() => addPage("Template4")}
            alt="Logo"
            className="cursor-pointer"
            src={template4}
            width={200}
            height={100}
          ></Image>
          <Image
            onClick={() => addPage("Template5")}
            alt="Logo"
            className="cursor-pointer"
            src={template5}
            width={200}
            height={100}
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default BookEditor;
