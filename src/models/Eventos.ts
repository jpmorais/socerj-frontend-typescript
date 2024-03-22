import axios from "axios";
import {
  IGetAllApiResponse,
  IGetAllRequestParams,
  IMutateObject,
} from "../types/types";
import { useQuery, useMutation } from "@tanstack/react-query";

export interface IEvento {
  id: number;
  evento: string;
  inicio: string;
  final: string;
  aberto: boolean;
  imagem?: string;
  texto?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IEventoPayload extends Omit<IEvento, "id"> {}

class Eventos {
  static getAllEventos(params?: IGetAllRequestParams) {
    const fetchaData = async () => {
      const response = await axios.get<IGetAllApiResponse<IEvento>>(
        `/api/v1/eventos?filter=${params?.filter || ""}&sort=${
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
        "eventos",
        params?.filter,
        params?.page,
        params?.limit,
        params?.sort,
      ],
      queryFn: fetchaData,
    });
  }

  static getEvento(id: string) {
    const fetchaData = async () => {
      const response = await axios.get<IEvento>(`/api/v1/eventos/${id}`);
      return response.data;
    };

    return useQuery({
      queryKey: ["eventos", id],
      queryFn: fetchaData,
    });
  }

  static createEvento({ onSuccess, onError }: IMutateObject) {
    const postData = async (data: IEventoPayload) => {
      const response = await axios.post(`/api/v1/eventos`, data);
      return response.data;
    };

    return useMutation({
      mutationFn: postData,
      onSuccess: onSuccess,
      onError: onError,
    });
  }

  static updateEvento({ onSuccess, onError }: IMutateObject) {
    const patchData = async (data: IEvento) => {
      const { id, ...payload } = data;
      const response = await axios.patch(`/api/v1/eventos/${data.id}`, payload);
      return response.data;
    };

    return useMutation({
      mutationFn: patchData,
      onSuccess: onSuccess,
      onError: onError,
    });
  }

  static deleteEvento({ onSuccess, onError }: IMutateObject) {
    const deleteData = async (id: string) => {
      const response = await axios.delete(`/api/v1/eventos/${id}`);
      return response.data;
    };

    return useMutation({
      mutationFn: deleteData,
      onSuccess: onSuccess,
      onError: onError,
    });
  }
}

export default Eventos;
