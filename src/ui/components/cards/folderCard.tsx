import Image from "next/image";
import React from "react";
import ButtonOutlined from "../buttons/ButtonOutlined";
import NoImage from "../../../../public/imgs/no-image.jpg";

interface FolderCardProps {
  folderName: string;
  imageUrl?: string;
  onClick: () => void;
}

const FolderCard: React.FC<FolderCardProps> = ({
  folderName,
  imageUrl,
  onClick,
}) => {
  return (
    <div className="bg-bgColorDark shadow-lg rounded-lg overflow-hidden">
      <div className="relative h-28">
        <Image
          src={imageUrl == null || imageUrl == "" ? NoImage : imageUrl}
          alt={`${folderName} book cover`}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="text-gray-800 font-bold">{folderName}</div>
        <div className="w-full justify-between items-center mt-2">
          <ButtonOutlined
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 inline-block mr-2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M16.0694 9.95182C17.3989 9.95177 18.5317 9.95172 19.436 10.054C19.5895 10.0714 19.7425 10.0923 19.8943 10.1178C20.4264 10.2071 20.9447 10.3533 21.4242 10.6063V9.75579C21.4242 8.84687 21.4243 8.09279 21.3389 7.49156C21.2489 6.85704 21.0526 6.29458 20.5834 5.83245C20.5069 5.75707 20.4261 5.68552 20.3415 5.61807C19.8297 5.21023 19.2162 5.04345 18.5217 4.96608C17.8526 4.89155 17.0097 4.89157 15.9765 4.89158L15.6237 4.89158C14.6416 4.89158 14.2895 4.88587 13.9706 4.80533C13.7833 4.75802 13.6035 4.69195 13.4348 4.60878C13.1505 4.46867 12.9028 4.25761 12.2072 3.64132L11.7331 3.22128C11.5341 3.04489 11.3982 2.9245 11.2526 2.81755C10.6279 2.35879 9.86732 2.08132 9.07098 2.01534C8.88555 1.99998 8.69632 1.99999 8.41308 2.00002L8.29666 2.00001C7.65599 1.9999 7.23317 1.99983 6.86604 2.0612C5.26119 2.32947 3.96344 3.45143 3.64735 4.93575C3.57543 5.27344 3.57554 5.66035 3.57571 6.21853L3.57573 10.6063C4.05523 10.3533 4.57357 10.2071 5.1056 10.1178C5.25746 10.0923 5.41043 10.0714 5.56394 10.054C6.46822 9.95172 7.60107 9.95177 8.93055 9.95182H16.0694Z"></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.35791 12.7788C2.74772 13.7202 2.99956 15.0292 3.50323 17.6471C3.8658 19.5317 4.04709 20.474 4.67523 21.0993C4.8382 21.2615 5.02054 21.4053 5.2186 21.5278C5.98195 22 6.99539 22 9.02227 22H15.9777C18.0046 22 19.0181 22 19.7814 21.5278C19.9795 21.4053 20.1618 21.2615 20.3248 21.0993C20.9529 20.474 21.1342 19.5317 21.4968 17.6471C22.0004 15.0292 22.2523 13.7202 21.6421 12.7788C21.4864 12.5386 21.2943 12.3211 21.0721 12.1334C20.2011 11.3976 18.7933 11.3976 15.9777 11.3976H9.02227C6.20667 11.3976 4.79888 11.3976 3.92792 12.1334C3.70566 12.3211 3.51363 12.5386 3.35791 12.7788ZM9.69518 17.1807C9.69518 16.7815 10.0376 16.4578 10.4601 16.4578H14.5398C14.9622 16.4578 15.3047 16.7815 15.3047 17.1807C15.3047 17.58 14.9622 17.9036 14.5398 17.9036H10.4601C10.0376 17.9036 9.69518 17.58 9.69518 17.1807Z"
                  ></path>
                </g>
              </svg>
            }
            onClick={onClick}
          >
            Abrir carpeta
          </ButtonOutlined>
        </div>
      </div>
    </div>
  );
};

export default FolderCard;
