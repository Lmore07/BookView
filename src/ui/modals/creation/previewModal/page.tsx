import { Chip, Divider } from "@mui/material";
import Image from "next/image";
import React from "react";

const PreviewContent: React.FC<{ content: any[] }> = ({ content }) => {
  return (
    <div className="preview-content p-3">
      {content.map((page: any, index: any) => (
        <div key={index} className="mb-3">
          <div>
            <Divider className="py-2">
              <Chip
                className="font-semibold text-textRegisterLabel"
                label={`Página N° ${page.numberPage}`}
                size="medium"
              />
            </Divider>
            <div className="bg-bgColorDark px-4 pb-1 pt-2 rounded-lg shadow-md">
              {page.template == "Template1" && (
                <div className="overflow-hidden">
                  <div className="flex items-center justify-center mb-2">
                    <Image
                      src={URL.createObjectURL(page.image)}
                      alt="Imagen"
                      className="max-h-full max-w-full"
                    />
                  </div>
                  <div
                    className="break-words max-w-none"
                    dangerouslySetInnerHTML={{ __html: page.content }}
                  ></div>
                </div>
              )}
              {page.template == "Template2" && (
                <div className="grid grid-cols-5 gap-3 overflow-hidden">
                  <div className="flex items-center justify-center col-span-2">
                    <Image
                      src={URL.createObjectURL(page.image)}
                      alt="Imagen 2"
                      className="object-cover"
                    />
                  </div>
                  <div className="col-span-3">
                    <div
                      className="break-words max-w-none"
                      dangerouslySetInnerHTML={{ __html: page.content }}
                    ></div>
                  </div>
                </div>
              )}
              {page.template == "Template3" && (
                <div className="grid grid-cols-5 gap-3 overflow-hidden">
                  <div className="col-span-3">
                    <div
                      className="break-words max-w-none"
                      dangerouslySetInnerHTML={{ __html: page.content }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-center col-span-2">
                    <Image
                      src={URL.createObjectURL(page.image)}
                      alt="Imagen 2"
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              {page.template == "Template4" && (
                <div>
                  <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PreviewContent;
