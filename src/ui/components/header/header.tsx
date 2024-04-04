import React from "react";
import frontPage from "../../../../public/imgs/frontPage.png";

interface HeaderProps {
  projectName: string;
  category: string;
}

const Header: React.FC<HeaderProps> = ({ projectName, category }) => {
  return (
    <div className="flex items-center justify-between shadow-slate-400 shadow-sm px-4 py-3">
      <div className="flex items-center">
        <div className="text-lg font-bold mr-2">{projectName}</div>
        <div className="text-sm text-gray-500">{category}</div>
      </div>
      <div className="flex items-center">
        <div className="mr-4">
          <i className="fas fa-bell text-gray-500"></i>
        </div>
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img
            src={frontPage.src}
            alt="Profile Picture"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
