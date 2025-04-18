import { BreadcrumbItem } from "@/ui/components/breadcumbs/breadcumbs";
import React from "react";

export const favoritesBreadCrumb: BreadcrumbItem = {
  label: "Mis favoritos",
  href: "/reader/favorites",
  icon: (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5"
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
          d="M21 11.0975V16.0909C21 19.1875 21 20.7358 20.2659 21.4123C19.9158 21.735 19.4739 21.9377 19.0031 21.9915C18.016 22.1045 16.8633 21.0849 14.5578 19.0458C13.5388 18.1445 13.0292 17.6938 12.4397 17.5751C12.1494 17.5166 11.8506 17.5166 11.5603 17.5751C10.9708 17.6938 10.4612 18.1445 9.44216 19.0458C7.13673 21.0849 5.98402 22.1045 4.99692 21.9915C4.52615 21.9377 4.08421 21.735 3.73411 21.4123C3 20.7358 3 19.1875 3 16.0909V11.0975C3 6.80891 3 4.6646 4.31802 3.3323C5.63604 2 7.75736 2 12 2C16.2426 2 18.364 2 19.682 3.3323C21 4.6646 21 6.80891 21 11.0975ZM8.25 6C8.25 5.58579 8.58579 5.25 9 5.25H15C15.4142 5.25 15.75 5.58579 15.75 6C15.75 6.41421 15.4142 6.75 15 6.75H9C8.58579 6.75 8.25 6.41421 8.25 6Z"
        ></path>
      </g>
    </svg>
  ),
};

export const HomeBreadCrumb: BreadcrumbItem = {
  label: "Inicio",
  href: "/reader",
  icon: (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
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
          d="M2.33537 7.87495C1.79491 9.00229 1.98463 10.3208 2.36407 12.9579L2.64284 14.8952C3.13025 18.2827 3.37396 19.9764 4.54903 20.9882C5.72409 22 7.44737 22 10.8939 22H13.1061C16.5526 22 18.2759 22 19.451 20.9882C20.626 19.9764 20.8697 18.2827 21.3572 14.8952L21.6359 12.9579C22.0154 10.3208 22.2051 9.00229 21.6646 7.87495C21.1242 6.7476 19.9738 6.06234 17.6731 4.69181L16.2882 3.86687C14.199 2.62229 13.1543 2 12 2C10.8457 2 9.80104 2.62229 7.71175 3.86687L6.32691 4.69181C4.02619 6.06234 2.87583 6.7476 2.33537 7.87495ZM8.2501 17.9998C8.2501 17.5856 8.58589 17.2498 9.0001 17.2498H15.0001C15.4143 17.2498 15.7501 17.5856 15.7501 17.9998C15.7501 18.414 15.4143 18.7498 15.0001 18.7498H9.0001C8.58589 18.7498 8.2501 18.414 8.2501 17.9998Z"
        ></path>
      </g>
    </svg>
  ),
};

export const folderBreadCrumb = ({
  label,
}: {
  label: string;
}): BreadcrumbItem => ({
  label,
  href: `/reader/favorites/`,
  icon: (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
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
          d="M2 12C2 11.1184 2 10.3192 2.00958 9.59291C2.06596 9.39805 2.13335 9.2273 2.21322 9.07054C2.62068 8.27085 3.27085 7.62068 4.07054 7.21322C4.48197 7.00359 4.9897 6.87996 5.77708 6.81563C5.92663 6.80341 6.08387 6.79347 6.25 6.78538V10.831C6.25 11.2986 6.24999 11.6821 6.26739 11.9839C6.28454 12.2816 6.32145 12.5899 6.44371 12.8652C6.88513 13.859 7.97413 14.3949 9.03086 14.1383C9.32356 14.0673 9.59039 13.9084 9.83671 13.7404C10.0864 13.57 10.3903 13.336 10.7608 13.0508L10.7793 13.0365C11.2486 12.6751 11.3808 12.5804 11.5019 12.5277C11.8196 12.3897 12.1804 12.3897 12.4981 12.5277C12.6192 12.5804 12.7513 12.6751 13.2207 13.0365L13.2392 13.0507C13.6097 13.336 13.9135 13.57 14.1633 13.7404C14.4096 13.9084 14.6764 14.0673 14.9691 14.1383C16.0259 14.3949 17.1149 13.859 17.5563 12.8652C17.6786 12.5899 17.7155 12.2816 17.7326 11.9839C17.75 11.6821 17.75 11.2985 17.75 10.831V6.78538C17.9161 6.79347 18.0734 6.80341 18.2229 6.81563C19.0103 6.87996 19.518 7.00359 19.9295 7.21322C20.7291 7.62068 21.3793 8.27085 21.7868 9.07054C21.8667 9.2273 21.934 9.39805 21.9904 9.59292C22 10.3192 22 11.1184 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12ZM21.8433 6.72315C21.6699 5.24918 21.3048 4.23369 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2.69524 4.23369 2.33006 5.24918 2.15669 6.72315C2.52685 6.39051 2.9408 6.10536 3.38955 5.87671C4.04768 5.54138 4.77479 5.39252 5.65494 5.32061C6.51929 5.24999 7.59472 5.25 8.96644 5.25H15.0336C16.4053 5.25 17.4807 5.24999 18.3451 5.32061C19.2252 5.39252 19.9523 5.54138 20.6104 5.87671C21.0592 6.10536 21.4732 6.39051 21.8433 6.72315Z"
        ></path>
        <path d="M7.75 10.8076V6.75233C8.12917 6.75006 8.54382 6.75 9 6.75H15C15.4562 6.75 15.8708 6.75006 16.25 6.75233V10.8076C16.25 11.3043 16.2497 11.6442 16.2351 11.8976C16.22 12.1601 16.1923 12.2408 16.1854 12.2563C16.0383 12.5876 15.6753 12.7662 15.323 12.6807C15.3066 12.6767 15.2257 12.6493 15.0085 12.5012C14.7989 12.3582 14.5294 12.151 14.1358 11.848L14.0688 11.7964C13.6986 11.5109 13.4101 11.2885 13.0958 11.152C12.3968 10.8483 11.6032 10.8483 10.9042 11.152C10.5899 11.2885 10.3014 11.511 9.9312 11.7964L9.86419 11.848C9.47062 12.151 9.20112 12.3582 8.99148 12.5012C8.77428 12.6493 8.69342 12.6767 8.67695 12.6807C8.32471 12.7662 7.96171 12.5876 7.81457 12.2563C7.80769 12.2408 7.78003 12.1601 7.7649 11.8976C7.7503 11.6442 7.75 11.3043 7.75 10.8076Z"></path>
      </g>
    </svg>
  ),
});

export const searchBooksBreadCrumb: BreadcrumbItem = {
  label: "Búsqueda de libros",
  href: "/reader/books",
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path
        fillRule="evenodd"
        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

export const profileBreadCrumb: BreadcrumbItem = {
  label: "Mi perfil",
  href: "/reader/profile",
  icon: (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <circle cx="12" cy="6" r="4"></circle>
        <ellipse cx="12" cy="17" rx="7" ry="4"></ellipse>
      </g>
    </svg>
  ),
};
