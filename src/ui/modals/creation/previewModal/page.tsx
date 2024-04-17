import { Chip, Divider } from "@mui/material";
import React from "react";

const PreviewContent: React.FC<{ content: any[] }> = ({ content }) => {
  return (
    <div className="preview-content p-3">
      {content.map((page: any, index: any) => (
        <div key={index} className="mb-8">
          <div className="mb-2">
            <Divider>
              <Chip
                className="font-semibold"
                label={`Pagina N° ${page.pageNumber}`}
                size="medium"
              />
            </Divider>
            <div className="bg-white px-6 pb-1 pt-2 rounded-lg shadow-md">
              {page.template == "Template1" && (
                <div>
                  <div className="flex items-center justify-center mb-2">
                    <img
                      src={URL.createObjectURL(page.imageBlob)}
                      alt="Imagen"
                      className="max-h-full max-w-full"
                    />
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
                </div>
              )}
              {page.template == "Template2" && (
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <img
                      src={URL.createObjectURL(page.imageBlob)}
                      alt="Imagen 2"
                      className="max-h-full max-w-full"
                    />
                  </div>
                  <div className="col-span-2">
                    <div
                      className="text-ellipsis"
                      dangerouslySetInnerHTML={{ __html: page.content }}
                    ></div>
                  </div>
                </div>
              )}
              {page.template == "Template3" && (
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <div
                      className="text-ellipsis"
                      dangerouslySetInnerHTML={{ __html: page.content }}
                    ></div>
                  </div>
                  <div>
                    <img
                      src={URL.createObjectURL(page.imageBlob)}
                      alt="Imagen 2"
                      className="max-h-full max-w-full"
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
