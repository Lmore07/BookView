import { generateSpeech } from "@/libs/services/generateSpeech";
import { Tooltip } from "@mui/material";
import React, { useRef, useState } from "react";

interface Command {
  command: string[];
  tittle: string;
}

interface VoiceCommandProps {
  commands: Command[];
  page: string;
}

const Help: React.FC<VoiceCommandProps> = ({ commands, page }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  const source = useRef<AudioBufferSourceNode | null>(null);

  const startSpeech = async () => {
    var dataTextAudio = `¡Bienvenido!, ésta es la sección de ayuda, a continuación se muestran los comandos de voz de la página de ${page}. `;
    dataTextAudio =
      dataTextAudio +
      "El * indica que puede decir cualquier cosa luego del comando. ";

    const commandsText = commands
      .map((command) => {
        return `Para ${command.tittle}, prueba diciendo: ${command.command.join(
          " o "
        )}`;
      })
      .join(". ");
    dataTextAudio += commandsText;
    const audioData = await generateSpeech(dataTextAudio);
    const ctx = new AudioContext();
    await ctx.decodeAudioData(audioData, (buffer) => {
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.connect(ctx.destination);
      src.start();
      audioContext.current = ctx;
      source.current = src;
      setIsPlaying(true);
      src.onended = () => {
        console.log("El audio ha terminado de reproducirse");
        setIsPlaying(false);
      };
    });
  };

  const stopSpeech = () => {
    if (source.current) {
      source.current.stop();
      audioContext.current?.close();
      setIsPlaying(false);
    }
  };

  const handleSpeech = () => {
    if (isPlaying) {
      stopSpeech();
    } else {
      startSpeech();
    }
  };

  return (
    <div className="shadow-2xl w-full rounded-lg py-3 bg-bgColorLeft mx-2">
      <div className="flex items-center ps-3 text-left font-bold text-lg text-primary-500 font-poppins">
        <div>
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-primary-500 mr-2"
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
                d="M12 3.25C12.4142 3.25 12.75 3.58579 12.75 4L12.75 20C12.75 20.4142 12.4142 20.75 12 20.75C11.5858 20.75 11.25 20.4142 11.25 20L11.25 4C11.25 3.58579 11.5858 3.25 12 3.25ZM8 6.25C8.41421 6.25 8.75 6.58579 8.75 7V17C8.75 17.4142 8.41421 17.75 8 17.75C7.58579 17.75 7.25 17.4142 7.25 17V7C7.25 6.58579 7.58579 6.25 8 6.25ZM16 6.25C16.4142 6.25 16.75 6.58579 16.75 7V17C16.75 17.4142 16.4142 17.75 16 17.75C15.5858 17.75 15.25 17.4142 15.25 17V7C15.25 6.58579 15.5858 6.25 16 6.25ZM4 10.25C4.41421 10.25 4.75 10.5858 4.75 11L4.75 13C4.75 13.4142 4.41421 13.75 4 13.75C3.58579 13.75 3.25 13.4142 3.25 13L3.25 11C3.25 10.5858 3.58579 10.25 4 10.25ZM20 10.25C20.4142 10.25 20.75 10.5858 20.75 11V13C20.75 13.4142 20.4142 13.75 20 13.75C19.5858 13.75 19.25 13.4142 19.25 13V11C19.25 10.5858 19.5858 10.25 20 10.25Z"
              ></path>{" "}
            </g>
          </svg>
        </div>
        <span>Comandos de Voz</span>
        <Tooltip
          arrow
          title={isPlaying ? "Detener" : "Oír"}
          className="ml-5"
          placement="right"
        >
          <span
            className="cursor-pointer bg-slate-200 shadow-xl p-2 rounded-lg"
            onClick={handleSpeech}
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#cf0101"
                className="w-6 h-6 text-red-500"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-tertiary"
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
                  <circle cx="10" cy="6.75" r="4"></circle>{" "}
                  <ellipse cx="10" cy="17.75" rx="7" ry="4"></ellipse>{" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.357 2.36424C18.5702 2.00906 19.0309 1.89388 19.386 2.10699L19.0002 2.75011C19.386 2.10699 19.3857 2.10679 19.386 2.10699L19.3874 2.10783L19.389 2.10878L19.3927 2.11103L19.4023 2.11695C19.4096 2.12153 19.4189 2.12737 19.4299 2.13448C19.4519 2.14871 19.481 2.16809 19.5162 2.19272C19.5865 2.24194 19.6815 2.31244 19.7928 2.4052C20.0149 2.59029 20.3054 2.86678 20.5946 3.24283C21.1775 4.00057 21.7502 5.15746 21.7502 6.75011C21.7502 8.34277 21.1775 9.49966 20.5946 10.2574C20.3054 10.6334 20.0149 10.9099 19.7928 11.095C19.6815 11.1878 19.5865 11.2583 19.5162 11.3075C19.481 11.3321 19.4519 11.3515 19.4299 11.3657C19.4189 11.3729 19.4096 11.3787 19.4023 11.3833L19.3927 11.3892L19.389 11.3914L19.3874 11.3924C19.3871 11.3926 19.386 11.3932 19.0002 10.7501L19.386 11.3932C19.0309 11.6063 18.5702 11.4912 18.357 11.136C18.1448 10.7823 18.2581 10.324 18.6098 10.1097L18.6154 10.1062C18.6227 10.1014 18.6365 10.0923 18.656 10.0787C18.6951 10.0513 18.7563 10.0062 18.8325 9.9427C18.9854 9.81529 19.195 9.61678 19.4057 9.34283C19.8228 8.80057 20.2502 7.95746 20.2502 6.75011C20.2502 5.54277 19.8228 4.69966 19.4057 4.1574C19.195 3.88345 18.9854 3.68494 18.8325 3.55753C18.7563 3.49403 18.6951 3.44891 18.656 3.42157C18.6365 3.40792 18.6227 3.39878 18.6154 3.39406L18.6098 3.39053C18.2581 3.17625 18.1448 2.71793 18.357 2.36424Z"
                  ></path>{" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.3293 4.4147C16.5146 4.04422 16.9651 3.89405 17.3356 4.07929L17.0002 4.75011C17.3356 4.07929 17.3352 4.07909 17.3356 4.07929L17.3372 4.08011L17.3389 4.08097L17.3426 4.08287L17.3512 4.08732L17.3728 4.09893C17.3891 4.10789 17.4091 4.11934 17.4324 4.13344C17.4787 4.16159 17.5383 4.20058 17.6064 4.25168C17.7423 4.35363 17.9153 4.5059 18.0858 4.71909C18.4345 5.15499 18.7502 5.81792 18.7502 6.75011C18.7502 7.6823 18.4345 8.34524 18.0858 8.78113C17.9153 8.99433 17.7423 9.1466 17.6064 9.24855C17.5383 9.29965 17.4787 9.33863 17.4324 9.36679C17.4091 9.38089 17.3891 9.39234 17.3728 9.40129L17.3512 9.4129L17.3426 9.41736L17.3389 9.41925L17.3372 9.42012C17.3368 9.42032 17.3356 9.42093 17.0064 8.76266L17.3356 9.42093C16.9651 9.60618 16.5146 9.45601 16.3293 9.08552C16.1464 8.71965 16.2906 8.27574 16.651 8.08634C16.6518 8.0859 16.6527 8.08533 16.6539 8.08461C16.6622 8.07956 16.6808 8.06776 16.7064 8.04855C16.758 8.00988 16.8351 7.9434 16.9145 7.84409C17.0658 7.65499 17.2502 7.31792 17.2502 6.75011C17.2502 6.1823 17.0658 5.84524 16.9145 5.65613C16.8351 5.55683 16.758 5.49035 16.7064 5.45168C16.6808 5.43246 16.6622 5.42066 16.6539 5.41562C16.6527 5.4149 16.6518 5.41432 16.651 5.41389C16.2906 5.22449 16.1464 4.78057 16.3293 4.4147Z"
                  ></path>{" "}
                </g>
              </svg>
            )}
          </span>
        </Tooltip>
      </div>
      <div className="font-poppins mt-3 flex items-center font-light bg-blue-100 my-2 px-3 mx-2 rounded-md">
        <div>
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            transform="rotate(180)"
            className="w-5 h-5 text-blue-600 mr-2"
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
                d="M7.84308 3.80211C9.8718 2.6007 10.8862 2 12 2C13.1138 2 14.1282 2.6007 16.1569 3.80211L16.8431 4.20846C18.8718 5.40987 19.8862 6.01057 20.4431 7C21 7.98943 21 9.19084 21 11.5937V12.4063C21 14.8092 21 16.0106 20.4431 17C19.8862 17.9894 18.8718 18.5901 16.8431 19.7915L16.1569 20.1979C14.1282 21.3993 13.1138 22 12 22C10.8862 22 9.8718 21.3993 7.84308 20.1979L7.15692 19.7915C5.1282 18.5901 4.11384 17.9894 3.55692 17C3 16.0106 3 14.8092 3 12.4063V11.5937C3 9.19084 3 7.98943 3.55692 7C4.11384 6.01057 5.1282 5.40987 7.15692 4.20846L7.84308 3.80211ZM13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16ZM12 6.25C12.4142 6.25 12.75 6.58579 12.75 7V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V7C11.25 6.58579 11.5858 6.25 12 6.25Z"
              ></path>{" "}
            </g>
          </svg>
        </div>
        <div>
          El <span className="text-red-500 font-bold">*</span> indica que puede
          decir cualquier cosa luego del comando.
        </div>
      </div>
      {commands.map((commandObj, index) => (
        <div key={index} className="ml-5">
          <h3 className="mt-1 font-bold font-poppins">{commandObj.tittle}:</h3>
          <ul className="list-disc list-inside">
            {commandObj.command.map((command, index) => (
              <li key={index} className="ml-5 font-poppins font-light">
                {command}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Help;
