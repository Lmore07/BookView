export interface ResponseData<T = undefined> {
  message?: string;
  statusCode: number;
  data?: T | null;
  pagination?: Pagination;
  error?: string;
}

export interface Pagination {
  total: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}
