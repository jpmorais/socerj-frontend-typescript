import axios from "axios";
import {
  IGetAllApiResponse,
  IGetAllRequestParams,
  IMutateObject,
} from "../types/types";
import { useQuery, useMutation } from "@tanstack/react-query";

export interface IGenero {
  id: number;
  genero: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IGeneroPayload extends Omit<IGenero, "id"> {}

class Generos {
  static getAllGeneros(params?: IGetAllRequestParams) {
    const fetchaData = async () => {
      const response = await axios.get<IGetAllApiResponse<IGenero>>(
        `/api/v1/generos?filter=${params?.filter || ""}&sort=${
          params?.sort || ""
        }&limit=${params?.limit || 20}&page=${params?.page || 1}`
      );
      return {
        items: response.data.items,
        totalPages: response.data.totalPages,
      };
    };

    return useQuery({
      queryKey: ["generos", params?.filter, params?.page, params?.limit],
      queryFn: fetchaData,
    });
  }

  static getGenero(id: string) {
    const fetchaData = async () => {
      const response = await axios.get<IGenero>(`/api/v1/generos/${id}`);
      return response.data;
    };

    return useQuery({
      queryKey: ["generos", id],
      queryFn: fetchaData,
    });
  }

  static createGenero({ onSuccess, onError }: IMutateObject) {
    const postData = async (data: IGeneroPayload) => {
      const response = await axios.post(`/api/v1/generos`, data);
      return response.data;
    };

    return useMutation({
      mutationFn: postData,
      onSuccess: onSuccess,
      onError: onError,
    });
  }

  static updateGenero({ onSuccess, onError }: IMutateObject) {
    const patchData = async (data: IGenero) => {
      const { id, ...payload } = data;
      const response = await axios.patch(`/api/v1/generos/${data.id}`, payload);
      return response.data;
    };

    return useMutation({
      mutationFn: patchData,
      onSuccess: onSuccess,
      onError: onError,
    });
  }

  static deleteGenero({ onSuccess, onError }: IMutateObject) {
    const deleteData = async (id: string) => {
      const response = await axios.delete(`/api/v1/generos/${id}`);
      return response.data;
    };

    return useMutation({
      mutationFn: deleteData,
      onSuccess: onSuccess,
      onError: onError,
    });
  }
}

export default Generos;
