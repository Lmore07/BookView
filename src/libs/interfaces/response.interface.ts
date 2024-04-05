export interface ResponseData {
  message?: string;
  statusCode: number;
  data?: any[];
  pagination?: Pagination;
  error?: string;
}

export interface Pagination {
  total: number;
  pages: number;
  page: number;
  limit: number;
}
