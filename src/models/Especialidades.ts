import axios from "axios";
import {
  IGetAllApiResponse,
  IGetAllRequestParams,
  IMutateObject,
} from "../types/types";
import { useQuery, useMutation } from "@tanstack/react-query";

export interface IEspecialidade {
  id: number;
  especialidade: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IEspecialidadePayload extends Omit<IEspecialidade, "id"> {}

class Especialidades {
  static getAllEspecialidades(params?: IGetAllRequestParams) {
    const fetchaData = async () => {
      const response = await axios.get<IGetAllApiResponse<IEspecialidade>>(
        `/api/v1/especialidades?filter=${params?.filter || ""}&sort=${
          params?.sort || ""
        }&limit=${params?.limit || 20}&page=${params?.page || 1}`
      );
      return {
        items: response.data.items,
        totalPages: response.data.totalPages,
      };
    };

    return useQuery({
      queryKey: ["especialidades", params?.filter, params?.page, params?.limit],
      queryFn: fetchaData,
    });
  }

  static getEspecialidade(id: string) {
    const fetchaData = async () => {
      const response = await axios.get<IEspecialidade>(
        `/api/v1/especialidades/${id}`
      );
      return response.data;
    };

    return useQuery({
      queryKey: ["especialidade", id],
      queryFn: fetchaData,
    });
  }

  static createEspecialidade({ onSuccess, onError }: IMutateObject) {
    const postData = async (data: IEspecialidadePayload) => {
      const response = await axios.post(`/api/v1/especialidades`, data);
      return response.data;
    };

    return useMutation({
      mutationFn: postData,
      onSuccess: onSuccess,
      onError: onError,
    });
  }

  static updateEspecialidade({ onSuccess, onError }: IMutateObject) {
    const patchData = async (data: IEspecialidade) => {
      const { id, ...payload } = data;
      const response = await axios.patch(
        `/api/v1/especialidades/${data.id}`,
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

  static deleteEspecialidade({ onSuccess, onError }: IMutateObject) {
    const deleteData = async (id: string) => {
      const response = await axios.delete(`/api/v1/especialidades/${id}`);
      return response.data;
    };

    return useMutation({
      mutationFn: deleteData,
      onSuccess: onSuccess,
      onError: onError,
    });
  }
}

export default Especialidades;
