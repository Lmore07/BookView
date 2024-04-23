import React from "react";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string | null;
  icon?: any | null;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <Link
                href={item.href}
                className="text-gray-500 hover:text-gray-700 flex items-center"
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-400">
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <svg
                className="mx-1 h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
