export interface CategoriesAll {
  idCategory: number;
  categoryName: string;
  description: string;
  createdBy: number | null;
  status: boolean;
}

export interface CategoriesById {
  idCategory: number;
  categoryName: string;
  description: string;
  updatedAt: Date;
  status: boolean;
}

export interface CreateCategories {
  name: string;
  description: string;
}

export interface UpdateCategories {
  name: string;
  description: string;
}