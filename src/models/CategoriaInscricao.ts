import axios from "axios";
import {
  IGetAllApiResponse,
  IGetAllRequestParams,
  IMutateObject,
} from "../types/types";
import { useQuery, useMutation } from "@tanstack/react-query";

export interface ICategoriaInscricao {
  id: number;
  eventoId: number;
  categoriaId: number;
  dataLimite: string;
  quantidade?: number;
  valor: number;
  categoria?: {
    categoria: string;
    visivel: boolean;
  };
}

export interface ICategoriaInscricaoPayload
  extends Omit<ICategoriaInscricao, "id"> {}

class CategoriasInscricao {
  static getAllCateriasIncricao(params?: IGetAllRequestParams) {
    const fetchaData = async () => {
      const response = await axios.get<IGetAllApiResponse<ICategoriaInscricao>>(
        `/api/v1/categorias-inscricao?filter=${params?.filter || ""}&sort=${
          params?.sort || ""
        }&limit=${params?.limit || 20}&page=${params?.page || 1}`
      );
      return {
        items: response.data.items,
        totalPages: response.data.totalPages,
      };
    };

    return useQuery({
      queryKey: [
        "categoriasInscricao",
        params?.filter,
        params?.page,
        params?.limit,
        params?.sort,
      ],
      queryFn: fetchaData,
    });
  }

  static getCategoriaInscricao(id: string) {
    const fetchaData = async () => {
      const response = await axios.get<ICategoriaInscricao>(
        `/api/v1/categorias-inscricao/${id}`
      );
      return response.data;
    };

    return useQuery({
      queryKey: ["categoriasInscricao", id],
      queryFn: fetchaData,
    });
  }

  static createCategoriaInscricao({ onSuccess, onError }: IMutateObject) {
    const postData = async (data: ICategoriaInscricaoPayload) => {
      console.log("data", data);
      const response = await axios.post(`/api/v1/categorias-inscricao`, data);
      return response.data;
    };

    return useMutation({
      mutationFn: postData,
      onSuccess: onSuccess,
      onError: onError,
    });
  }

  static updateCategoriaInscricao({ onSuccess, onError }: IMutateObject) {
    const patchData = async (data: ICategoriaInscricao) => {
      const { id, ...payload } = data;
      const response = await axios.patch(
        `/api/v1/categorias-inscricao/${data.id}`,
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

  static deleteCatgoria({ onSuccess, onError }: IMutateObject) {
    const deleteData = async (id: string | number) => {
      const response = await axios.delete(`/api/v1/categorias-inscricao/${id}`);
      return response.data;
    };

    return useMutation({
      mutationFn: deleteData,
      onSuccess: onSuccess,
      onError: onError,
    });
  }
}

export default CategoriasInscricao;
