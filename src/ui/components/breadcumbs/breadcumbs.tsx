"use client";

import { Button } from "@/ui/shadcn/ui/button";
import { BreadcrumbContext } from "@/libs/contexts/breadcrumbContext";
import Link from "next/link";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";

export interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: any | null;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC = () => {
  const { breadcrumbItems } = useContext(BreadcrumbContext);
  const router = useRouter();

  return (
    <>
      <div className="flex justify-between items-center gap-5">
        <div className="text-base breadcrumbs">
          <ul>
            {breadcrumbItems.map((item, index) => (
              <li key={item.label} className="flex items-center">
                {index != breadcrumbItems.length - 1 ? (
                  <Link href={item.href}>
                    <span className="mr-1">{item.icon}</span>
                    {item.label}
                  </Link>
                ) : (
                  <span className="inline-flex items-center">
                    <span className="mr-1">{item.icon}</span>
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Button
            size={"xs"}
            variant={"back"}
            onClick={() => {
              router.back();
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 text-white mr-1"
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
                  d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.5303 8.46967C11.2374 8.17678 10.7626 8.17678 10.4697 8.46967L7.46967 11.4697C7.17678 11.7626 7.17678 12.2374 7.46967 12.5303L10.4697 15.5303C10.7626 15.8232 11.2374 15.8232 11.5303 15.5303C11.8232 15.2374 11.8232 14.7626 11.5303 14.4697L9.81066 12.75H16C16.4142 12.75 16.75 12.4142 16.75 12C16.75 11.5858 16.4142 11.25 16 11.25H9.81066L11.5303 9.53033C11.8232 9.23744 11.8232 8.76256 11.5303 8.46967Z"
                ></path>
              </g>
            </svg>
            <span className="hidden  lg:block md:block sm:block mr-1">
              Volver
            </span>
          </Button>
        </div>
      </div>
      <hr className="m-0 mt-2 ps-8" />
    </>
  );
};

export default Breadcrumbs;
