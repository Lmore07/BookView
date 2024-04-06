export interface ResponseData<T = undefined> {
  message?: string;
  statusCode: number;
  data?: T | null;
  pagination?: Pagination;
  error?: string;
}

export interface Pagination {
  total: number;
  pages: number;
  page: number;
  limit: number;
}
