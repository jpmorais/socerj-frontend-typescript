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

export interface IOutletDashboardContext {
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
  fetchAgain: boolean;
}

export enum FormaPagamento {
  CARTAO,
  BOLETO,
  PIX,
}

export enum TipoInscricao {
  OUVINTE,
  PALESTRANTE,
}

export enum TipoCategoria {
  MEDICO,
  RESIDENTE,
  MULTIPROFISSIONAL,
}

export enum StatusPagamento {
  PENDENTE,
  CANCELADO,
  CONCLUIDO,
}
