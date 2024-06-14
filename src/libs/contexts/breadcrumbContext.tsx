"use client";

import { BreadcrumbItem } from "@/ui/components/breadcumbs/breadcumbs";
import React, { createContext, useState } from "react";

interface BreadcrumbContextValue {
  breadcrumbItems: BreadcrumbItem[];
  setBreadcrumbItems: (items: BreadcrumbItem[]) => void;
  addBreadcrumbManyItems: (items: BreadcrumbItem[]) => void;
  removeAllBreadcrumbItems: () => void;
}

export const BreadcrumbContext = createContext<BreadcrumbContextValue>({
  breadcrumbItems: [],
  setBreadcrumbItems: () => {},
  addBreadcrumbManyItems: () => {},
  removeAllBreadcrumbItems: () => {},
});

export const BreadcrumbProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([]);

  const addBreadcrumbManyItems = (items: BreadcrumbItem[]) => {
    setBreadcrumbItems((prevItems) => [...prevItems, ...items]);
  };

  const removeAllBreadcrumbItems: () => void = () => {
    setBreadcrumbItems([]);
  };

  return (
    <BreadcrumbContext.Provider
      value={{
        breadcrumbItems,
        setBreadcrumbItems,
        addBreadcrumbManyItems,
        removeAllBreadcrumbItems,
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
};
