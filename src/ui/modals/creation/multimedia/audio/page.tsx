import React, { useRef, useState } from "react";

const AudioUpload: React.FC<{ onAudioSelected: any }> = ({
  onAudioSelected,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleUploadAudio = (event: any) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "audio/*";
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

  const handleRecordAudio = () => {
    // Lógica para grabar un audio desde el dispositivo
    const audioBlob = new Blob(["audio data"], { type: "audio/mpeg" });
    onAudioSelected(audioBlob);
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
              <path d="M14.3187 2.50498C13.0514 2.35716 11.8489 3.10033 11.4144 4.29989C11.3165 4.57023 11.2821 4.86251 11.266 5.16888C11.2539 5.40001 11.2509 5.67552 11.2503 6L11.25 6.45499C11.25 6.4598 11.25 6.4646 11.25 6.46938V14.5359C10.4003 13.7384 9.25721 13.25 8 13.25C5.37665 13.25 3.25 15.3766 3.25 18C3.25 20.6234 5.37665 22.75 8 22.75C10.6234 22.75 12.75 20.6234 12.75 18V9.21059C12.8548 9.26646 12.9683 9.32316 13.0927 9.38527L15.8002 10.739C16.2185 10.9481 16.5589 11.1183 16.8378 11.2399C17.119 11.3625 17.3958 11.4625 17.6814 11.4958C18.9486 11.6436 20.1511 10.9004 20.5856 9.70089C20.6836 9.43055 20.7179 9.13826 20.7341 8.83189C20.75 8.52806 20.75 8.14752 20.75 7.67988L20.7501 7.59705C20.7502 7.2493 20.7503 6.97726 20.701 6.71946C20.574 6.05585 20.2071 5.46223 19.6704 5.05185C19.4618 4.89242 19.2185 4.77088 18.9074 4.6155L16.1999 3.26179C15.7816 3.05264 15.4412 2.88244 15.1623 2.76086C14.8811 2.63826 14.6043 2.53829 14.3187 2.50498Z"></path>{" "}
            </g>
          </svg>
        </span>
        <span className="font-poppins font-semibold text-primary-500">
          Seleccione un audio
        </span>
      </div>
      <div
        className="flex items-center justify-center min-h-28 bg-gray-200 rounded-md cursor-pointer"
        onClick={() => setShowOptions(!showOptions)}
      >
        {showOptions ? (
          <div className="flex flex-col flex-wrap gap-2 my-2">
            <div>
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                onClick={handleUploadAudio}
              >
                Subir audio
              </button>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handleRecordAudio}
            >
              Grabar audio
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-iconBgColor"
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
                    d="M12 3.25C12.4142 3.25 12.75 3.58579 12.75 4L12.75 20C12.75 20.4142 12.4142 20.75 12 20.75C11.5858 20.75 11.25 20.4142 11.25 20L11.25 4C11.25 3.58579 11.5858 3.25 12 3.25ZM8 6.25C8.41421 6.25 8.75 6.58579 8.75 7V17C8.75 17.4142 8.41421 17.75 8 17.75C7.58579 17.75 7.25 17.4142 7.25 17V7C7.25 6.58579 7.58579 6.25 8 6.25ZM16 6.25C16.4142 6.25 16.75 6.58579 16.75 7V17C16.75 17.4142 16.4142 17.75 16 17.75C15.5858 17.75 15.25 17.4142 15.25 17V7C15.25 6.58579 15.5858 6.25 16 6.25ZM4 10.25C4.41421 10.25 4.75 10.5858 4.75 11L4.75 13C4.75 13.4142 4.41421 13.75 4 13.75C3.58579 13.75 3.25 13.4142 3.25 13L3.25 11C3.25 10.5858 3.58579 10.25 4 10.25ZM20 10.25C20.4142 10.25 20.75 10.5858 20.75 11V13C20.75 13.4142 20.4142 13.75 20 13.75C19.5858 13.75 19.25 13.4142 19.25 13V11C19.25 10.5858 19.5858 10.25 20 10.25Z"
                  ></path>{" "}
                </g>
              </svg>
            </span>
            <span className="font-poppins text-iconBgColor">Click aqui</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioUpload;
