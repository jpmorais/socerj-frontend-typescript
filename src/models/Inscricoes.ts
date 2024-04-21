import axios from "axios";
import {
  IGetAllApiResponse,
  IGetAllRequestParams,
  IMutateObject,
} from "../types/types";
import { useQuery, useMutation } from "@tanstack/react-query";

export interface IInscricao {
  id: number;
  evento?: {
    evento: string;
  };
  eventoId: number;
  usuario?: {
    email: string;
    cpf: string;
    nome: string;
  };
  usuarioId: string;
  dataInscricao: string;
  tipoInscricao: string;
  cupom?: {};
  cupomId?: number;
  valor?: string | number;
  dataPagamento?: string;
  formaPagamento?: string;
  statusPagamento?: string;
  notaFiscal?: string;
  confirmado?: boolean;
  valorPago?: string | number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IInscricaoPayload extends Omit<IInscricao, "id"> {}

class Inscricoes {
  static getAllInscricoes(params?: IGetAllRequestParams) {
    const fetchaData = async () => {
      const response = await axios.get<IGetAllApiResponse<IInscricao>>(
        `/api/v1/inscricoes?filter=${params?.filter || ""}&sort=${
          params?.sort || ""
        }&limit=${params?.limit || 20}&page=${params?.page || 1}`
      );
      return {
        items: response.data.items,
        totalPages: response.data.totalPages,
      };
    };

    return useQuery({
      queryKey: ["inscricoes", params?.filter, params?.page, params?.limit],
      queryFn: fetchaData,
    });
  }

  static getInscricao(id: string) {
    const fetchaData = async () => {
      const response = await axios.get<IInscricao>(`/api/v1/inscricoes/${id}`);
      return response.data;
    };

    return useQuery({
      queryKey: ["inscricoes", id],
      queryFn: fetchaData,
    });
  }

  static createInscricao({ onSuccess, onError }: IMutateObject) {
    const postData = async (data: IInscricaoPayload) => {
      const response = await axios.post(`/api/v1/inscricoes`, data);
      return response.data;
    };

    return useMutation({
      mutationFn: postData,
      onSuccess: onSuccess,
      onError: onError,
    });
  }

  static updateInscricao({ onSuccess, onError }: IMutateObject) {
    const patchData = async (data: IInscricao) => {
      const { id, ...payload } = data;
      const response = await axios.patch(
        `/api/v1/inscricoes/${data.id}`,
        payload
      );
      return response.data;
    };

    return useMutation({
      mutationFn: patchData,
      onSuccess: onSuccess,
      onError: onError,
    });
  }

  static deleteInscricao({ onSuccess, onError }: IMutateObject) {
    const deleteData = async (id: string) => {
      const response = await axios.delete(`/api/v1/inscricoes/${id}`);
      return response.data;
    };

    return useMutation({
      mutationFn: deleteData,
      onSuccess: onSuccess,
      onError: onError,
    });
  }
}

export default Inscricoes;
