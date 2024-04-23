import axios from "axios";
import {
  IGetAllApiResponse,
  IGetAllRequestParams,
  IMutateObject,
} from "../types/types";
import { useQuery, useMutation } from "@tanstack/react-query";

export interface IPatrocinador {
  id: number;
  patrocinador: string;
  email: string;
  contato: string;
  telefone: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPatrocinadorPayload extends Omit<IPatrocinador, "id"> {}

class Patrocinadores {
  static getAllPatrocinadores(params?: IGetAllRequestParams) {
    const fetchaData = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get<IGetAllApiResponse<IPatrocinador>>(
        `/api/v1/patrocinadores?filter=${params?.filter || ""}&sort=${
          params?.sort || ""
        }&limit=${params?.limit || 20}&page=${params?.page || 1}`,
        { headers: { Authorization: `bearer ${token}` } }
      );
      return {
        items: response.data.items,
        totalPages: response.data.totalPages,
      };
    };

    return useQuery({
      queryKey: ["patrocinadores", params?.filter, params?.page, params?.limit],
      queryFn: fetchaData,
    });
  }

  static getPatrocinador(id: string) {
    const fetchaData = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get<IPatrocinador>(
        `/api/v1/patrocinadores/${id}`,
        { headers: { Authorization: `bearer ${token}` } }
      );
      return response.data;
    };

    return useQuery({
      queryKey: ["patrocinadores", id],
      queryFn: fetchaData,
    });
  }

  static createPatrocinador({ onSuccess, onError }: IMutateObject) {
    const postData = async (data: IPatrocinadorPayload) => {
      const token = localStorage.getItem("token");
      const response = await axios.post(`/api/v1/patrocinadores`, data, {
        headers: { Authorization: `bearer ${token}` },
      });
      return response.data;
    };

    return useMutation({
      mutationFn: postData,
      onSuccess: onSuccess,
      onError: onError,
    });
  }

  static updatePatrocinador({ onSuccess, onError }: IMutateObject) {
    const patchData = async (data: IPatrocinador) => {
      const { id, ...payload } = data;
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `/api/v1/patrocinadores/${data.id}`,
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

  static deletePatrocinador({ onSuccess, onError }: IMutateObject) {
    const deleteData = async (id: string) => {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`/api/v1/patrocinadores/${id}`, {
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

export default Patrocinadores;
