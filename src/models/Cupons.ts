import axios from "axios";
import {
  IGetAllApiResponse,
  IGetAllRequestParams,
  IMutateObject,
} from "../types/types";
import { useQuery, useMutation } from "@tanstack/react-query";

export interface ICupom {
  id: number;
  cupom: string;
  valorDesconto?: number | string;
  percDesconto?: number | string;
  patrocinadorId: number | string;
  eventoId: number | string;
  qtd?: number | string;
  isPercentual?: boolean;
  patrocinador?: {
    patrocinador?: string;
  };
  evento?: {
    evento?: string;
  };
}

export interface ICupomPayload extends Omit<ICupom, "id" | "cupom"> {}

class Cupons {
  static getAllCupons(params?: IGetAllRequestParams) {
    const fetchaData = async () => {
      const response = await axios.get<IGetAllApiResponse<ICupom>>(
        `/api/v1/cupons?filter=${params?.filter || ""}&sort=${
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
        "cupons",
        params?.filter,
        params?.page,
        params?.limit,
        params?.sort,
      ],
      queryFn: fetchaData,
    });
  }

  static getCupom(id: string) {
    const fetchaData = async () => {
      const response = await axios.get<ICupom>(`/api/v1/cupons/${id}`);
      return response.data;
    };

    return useQuery({
      queryKey: ["cupons", id],
      queryFn: fetchaData,
    });
  }

  static createCupom({ onSuccess, onError }: IMutateObject) {
    const postData = async (data: ICupomPayload) => {
      const payload: ICupomPayload = {
        qtd: typeof data.qtd === "string" ? parseInt(data.qtd) : data.qtd,
        eventoId:
          typeof data.eventoId === "string"
            ? parseInt(data.eventoId)
            : data.eventoId,
        patrocinadorId:
          typeof data.patrocinadorId === "string"
            ? parseInt(data.patrocinadorId)
            : data.patrocinadorId,
      };
      if (data.isPercentual) {
        payload.percDesconto =
          typeof data.percDesconto === "string"
            ? parseInt(data.percDesconto)
            : data.percDesconto;
      } else {
        payload.valorDesconto =
          typeof data.valorDesconto === "string"
            ? parseFloat(data.valorDesconto)
            : data.valorDesconto;
      }
      console.log("payload", payload);
      const response = await axios.post(`/api/v1/cupons`, payload);
      return response.data;
    };

    return useMutation({
      mutationFn: postData,
      onSuccess: onSuccess,
      onError: onError,
    });
  }

  static deleteCupom({ onSuccess, onError }: IMutateObject) {
    const deleteData = async (id: string) => {
      const response = await axios.delete(`/api/v1/cupons/${id}`);
      return response.data;
    };

    return useMutation({
      mutationFn: deleteData,
      onSuccess: onSuccess,
      onError: onError,
    });
  }
}

export default Cupons;
