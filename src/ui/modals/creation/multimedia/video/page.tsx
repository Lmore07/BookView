import ModalParent from "@/ui/modals/modal";
import React, { useState } from "react";
import URLModal from "../../modalUrl/page";

const VideoUpload: React.FC<{ onAudioSelected: any }> = ({
  onAudioSelected,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleUploadVideo = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          onAudioSelected(
            new Blob([reader.result as ArrayBuffer], { type: file.type })
          );
        };
        reader.readAsArrayBuffer(file);
      } else {
        onAudioSelected(null);
      }
    };
    input.click();
  };

  const handlePasteUrl = () => {
    setIsOpen(true);
  };

  return (
    <div className="bg-bgColorRight rounded-lg shadow-md p-4">
      <div className="flex gap-2 mb-2 flex-wrap items-center justify-center">
        <span>
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-primary-500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 12.5V11.5C2 8.21252 2 6.56878 2.90796 5.46243C3.07418 5.25989 3.25989 5.07418 3.46243 4.90796C4.56878 4 6.21252 4 9.5 4C12.7875 4 14.4312 4 15.5376 4.90796C15.7401 5.07418 15.9258 5.25989 16.092 5.46243C16.7936 6.3173 16.9531 7.49303 16.9893 9.50002L17.6584 9.17082C19.6042 8.19788 20.5772 7.7114 21.2886 8.15107C22 8.59075 22 9.67853 22 11.8541V12.1459C22 14.3215 22 15.4093 21.2886 15.8489C20.5772 16.2886 19.6042 15.8021 17.6584 14.8292L16.9893 14.5C16.9531 16.507 16.7936 17.6827 16.092 18.5376C15.9258 18.7401 15.7401 18.9258 15.5376 19.092C14.4312 20 12.7875 20 9.5 20C6.21252 20 4.56878 20 3.46243 19.092C3.25989 18.9258 3.07418 18.7401 2.90796 18.5376C2 17.4312 2 15.7875 2 12.5ZM13.5607 9.56066C14.1464 8.97487 14.1464 8.02513 13.5607 7.43934C12.9749 6.85355 12.0251 6.85355 11.4393 7.43934C10.8536 8.02513 10.8536 8.97487 11.4393 9.56066C12.0251 10.1464 12.9749 10.1464 13.5607 9.56066Z"
              ></path>{" "}
            </g>
          </svg>
        </span>
        <span className="font-custom font-semibold text-primary-500">
          Seleccione un video
        </span>
      </div>
      <div
        className="flex items-center justify-center min-h-28 bg-gray-200 rounded-md cursor-pointer"
        onClick={() => setShowOptions(!showOptions)}
      >
        {showOptions ? (
          <div className="flex flex-col flex-wrap gap-2 my-2">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handleUploadVideo}
            >
              Subir video
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handlePasteUrl}
            >
              Pegar enlace
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 text-iconBgColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path d="M11.25 2C9.88382 2.00133 8.73117 2.01015 7.75 2.0685V6.24976H11.25V2Z"></path>{" "}
                  <path d="M6.25 2.2214C5.02727 2.41566 4.1485 2.78019 3.46447 3.46423C2.78043 4.14826 2.4159 5.02703 2.22164 6.24976H6.25V2.2214Z"></path>{" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 11.9998C2 10.2993 2 8.90556 2.06874 7.74976L21.9313 7.74976C22 8.90556 22 10.2993 22 11.9998C22 13.7002 22 15.094 21.9313 16.2498L2.06874 16.2498C2 15.094 2 13.7002 2 11.9998ZM12.4112 10.4043C13.4704 11.1162 14 11.4722 14 12C14 12.5278 13.4704 12.8838 12.4112 13.5957C11.3375 14.3173 10.8006 14.6781 10.4003 14.4132C10 14.1483 10 13.4322 10 12C10 10.5678 10 9.85174 10.4003 9.58682C10.8006 9.3219 11.3375 9.68271 12.4112 10.4043Z"
                  ></path>{" "}
                  <path d="M21.7784 6.24976C21.5841 5.02703 21.2196 4.14826 20.5355 3.46423C19.8515 2.78019 18.9727 2.41566 17.75 2.2214V6.24976H21.7784Z"></path>{" "}
                  <path d="M12.75 2C14.1162 2.00133 15.2688 2.01015 16.25 2.0685V6.24976H12.75V2Z"></path>{" "}
                  <path d="M21.7784 17.7498H17.75V21.7781C18.9727 21.5839 19.8515 21.2193 20.5355 20.5353C21.2196 19.8513 21.5841 18.9725 21.7784 17.7498Z"></path>{" "}
                  <path d="M16.25 17.7498V21.931C15.2688 21.9894 14.1162 21.9982 12.75 21.9995V17.7498H16.25Z"></path>{" "}
                  <path d="M11.25 21.9995V17.7498H7.75L7.75 21.931C8.73117 21.9894 9.88382 21.9982 11.25 21.9995Z"></path>{" "}
                  <path d="M6.25 17.7498L6.25 21.7781C5.02727 21.5839 4.1485 21.2193 3.46447 20.5353C2.78043 19.8513 2.4159 18.9725 2.22164 17.7498H6.25Z"></path>{" "}
                </g>
              </svg>
            </span>
            <span className="font-custom text-iconBgColor">Click aqui</span>
          </div>
        )}
      </div>
      {isOpen && (
        <ModalParent
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <URLModal
            onUrlReady={(value: string) => {
              setIsOpen(false);
              onAudioSelected(value.trim());
            }}
          ></URLModal>
        </ModalParent>
      )}
    </div>
  );
};

export default VideoUpload;
