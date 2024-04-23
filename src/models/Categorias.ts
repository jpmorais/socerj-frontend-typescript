import axios from "axios";
import {
  IGetAllApiResponse,
  IGetAllRequestParams,
  IMutateObject,
} from "../types/types";
import { useQuery, useMutation } from "@tanstack/react-query";

export interface ICategoria {
  id: number;
  categoria: string;
  tipo: string;
  visivel: boolean;
}

export interface ICategoriaPayload extends Omit<ICategoria, "id"> {}

class Categorias {
  static getAllCategorias(params?: IGetAllRequestParams) {
    const fetchaData = async () => {
      const response = await axios.get<IGetAllApiResponse<ICategoria>>(
        `/api/v1/categorias?filter=${params?.filter || ""}&sort=${
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
        "categorias",
        params?.filter,
        params?.page,
        params?.limit,
        params?.sort,
      ],
      queryFn: fetchaData,
    });
  }

  static getCategoria(id: string) {
    const fetchaData = async () => {
      const response = await axios.get<ICategoria>(`/api/v1/categorias/${id}`);
      return response.data;
    };

    return useQuery({
      queryKey: ["categorias", id],
      queryFn: fetchaData,
    });
  }

  static createCategoria({ onSuccess, onError }: IMutateObject) {
    const postData = async (data: ICategoriaPayload) => {
      const token = localStorage.getItem("token");
      const response = await axios.post(`/api/v1/categorias`, data, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      return response.data;
    };

    return useMutation({
      mutationFn: postData,
      onSuccess: onSuccess,
      onError: onError,
    });
  }

  static updateCategoria({ onSuccess, onError }: IMutateObject) {
    const patchData = async (data: ICategoria) => {
      const { id, ...payload } = data;
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `/api/v1/categorias/${data.id}`,
        payload,
        { headers: { Authorization: `bearer ${token}` } }
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
    const deleteData = async (id: string) => {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`/api/v1/categorias/${id}`, {
        headers: { Authorization: `bearer ${token}` },
      });
      return response.data;
    };

    return useMutation({
      mutationFn: deleteData,
      onSuccess: onSuccess,
      onError: onError,
    });
  }
}

export default Categorias;
