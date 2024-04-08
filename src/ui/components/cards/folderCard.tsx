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
          src={imageUrl === undefined || imageUrl == "" ? NoImage : imageUrl}
          alt={`${folderName} book cover`}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-gray-800 font-bold">{folderName}</h3>
        <div className="w-full justify-between items-center mt-2">
          <ButtonOutlined onClick={onClick}>Abrir carpeta</ButtonOutlined>
        </div>
      </div>
    </div>
  );
};

export default FolderCard;
