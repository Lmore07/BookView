import Image from "next/image";
import React from "react";
import NoImage from "../../../../public/imgs/no-image.jpg";
import Button from "../buttons/ButtonFill";

interface BookCardProps {
  title: string;
  authors: string[];
  imageUrl?: string | null;
  isFavorite?: boolean;
  isViewed?: boolean;
  onReadClick: () => void;
  onFavoriteClick: () => void;
}

const BookCard: React.FC<BookCardProps> = ({
  title,
  authors,
  imageUrl,
  isFavorite = false,
  isViewed = false,
  onFavoriteClick,
  onReadClick,
}) => {
  return (
    <div className="bg-bgColorDark shadow-md rounded-lg overflow-hidden">
      <div className="relative h-48">
        <Image
          src={imageUrl == null || imageUrl == "" ? NoImage : imageUrl}
          alt={`${title} book cover`}
          fill          
          className="object-cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-wrap">
        <div className=" font-custom text-sm">Autores: {authors.join(", ")}</div>
        <div className=" font-bold font-custom capitalize text-xl">
          {title}
        </div>

        <div className="flex justify-between items-center mt-2 mr-2">
          <Button
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 16.1436V4.9978C2 3.89963 2.8863 3.00752 3.9824 3.07489C4.95877 3.1349 6.11349 3.25351 7 3.48744C8.04921 3.76431 9.29611 4.35401 10.2823 4.87546C10.5894 5.03785 10.9159 5.15048 11.2502 5.21397V20.3926C10.9472 20.3258 10.6516 20.218 10.3724 20.0692C9.37293 19.5365 8.08145 18.9187 7 18.6334C6.12329 18.402 4.98428 18.2835 4.01486 18.2228C2.90605 18.1535 2 17.2546 2 16.1436ZM5.18208 8.27239C4.78023 8.17193 4.37303 8.41625 4.27257 8.8181C4.17211 9.21994 4.41643 9.62715 4.81828 9.72761L8.81828 10.7276C9.22012 10.8281 9.62732 10.5837 9.72778 10.1819C9.82825 9.78006 9.58393 9.37285 9.18208 9.27239L5.18208 8.27239ZM5.18208 12.2724C4.78023 12.1719 4.37303 12.4163 4.27257 12.8181C4.17211 13.2199 4.41643 13.6271 4.81828 13.7276L8.81828 14.7276C9.22012 14.8281 9.62732 14.5837 9.72778 14.1819C9.82825 13.7801 9.58393 13.3729 9.18208 13.2724L5.18208 12.2724Z"
                  ></path>{" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.7502 20.3925C13.0531 20.3257 13.3485 20.218 13.6276 20.0692C14.6271 19.5365 15.9185 18.9187 17 18.6334C17.8767 18.402 19.0157 18.2835 19.9851 18.2228C21.094 18.1535 22 17.2546 22 16.1436V4.93319C22 3.86075 21.1538 2.98041 20.082 3.01775C18.9534 3.05706 17.5469 3.17403 16.5 3.48744C15.5924 3.75916 14.5353 4.30418 13.6738 4.80275C13.3824 4.97142 13.0709 5.0953 12.7502 5.17387V20.3925ZM19.1821 9.72761C19.5839 9.62715 19.8282 9.21994 19.7278 8.8181C19.6273 8.41625 19.2201 8.17193 18.8183 8.27239L14.8183 9.27239C14.4164 9.37285 14.1721 9.78006 14.2726 10.1819C14.373 10.5837 14.7802 10.8281 15.1821 10.7276L19.1821 9.72761ZM19.1821 13.7276C19.5839 13.6271 19.8282 13.2199 19.7278 12.8181C19.6273 12.4163 19.2201 12.1719 18.8183 12.2724L14.8183 13.2724C14.4164 13.3729 14.1721 13.7801 14.2726 14.1819C14.373 14.5837 14.7802 14.8281 15.1821 14.7276L19.1821 13.7276Z"
                  ></path>
                </g>
              </svg>
            }
            onClick={onReadClick}
          >
            {isViewed ? "Continuar" : "Leer"}
          </Button>
          <button
            onClick={onFavoriteClick}
            className={`${
              isFavorite
                ? "text-red-500 hover:text-gray-400"
                : "text-gray-400 hover:text-red-600 ml-2"
            } `}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
