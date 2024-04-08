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
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative h-28">
        <Image
          src={imageUrl == null || imageUrl == "" ? NoImage : imageUrl}
          alt={`${folderName} book cover`}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-gray-800 font-bold">{folderName}</h3>
        <div className="w-full justify-between items-center mt-2">
          <ButtonOutlined
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
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
