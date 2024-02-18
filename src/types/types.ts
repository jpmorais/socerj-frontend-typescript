export interface IGetAllRequestParams {
  filter?: string;
  sort?: string;
  limit?: number;
  page?: number;
}

export interface IGetAllApiResponse<T> {
  success: boolean;
  items: Array<T>;
  totalItems: number;
  currentPage: number;
  totalPages: number;
}

export interface IMutateObject {
  onSuccess?: any;
  onError?: any;
}
