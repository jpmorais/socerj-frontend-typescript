import axios from "axios";
import {
  IGetAllApiResponse,
  IGetAllRequestParams,
  IMutateObject,
} from "../types/types";
import { useQuery, useMutation } from "@tanstack/react-query";

export interface IArea {
  id: number;
  area: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAreaPayload extends Omit<IArea, "id"> {}

class Areas {
  static getAllAreas(params?: IGetAllRequestParams) {
    const fetchaData = async () => {
      const response = await axios.get<IGetAllApiResponse<IArea>>(
        `/api/v1/areas?filter=${params?.filter || ""}&sort=${
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
        "areas",
        params?.filter,
        params?.page,
        params?.limit,
        params?.sort,
      ],
      queryFn: fetchaData,
    });
  }

  static getArea(id: string) {
    const fetchaData = async () => {
      const response = await axios.get<IArea>(`/api/v1/areas/${id}`);
      return response.data;
    };

    return useQuery({
      queryKey: ["area", id],
      queryFn: fetchaData,
      refetchOnMount: true,
    });
  }

  static createArea({ onSuccess, onError }: IMutateObject) {
    const postData = async (data: IAreaPayload) => {
      const token = localStorage.getItem("token");
      const response = await axios.post(`/api/v1/areas`, data, {
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

  static updateArea({ onSuccess, onError }: IMutateObject) {
    const patchData = async (data: IArea) => {
      const { id, ...payload } = data;
      const token = localStorage.getItem("token");

      const response = await axios.patch(`/api/v1/areas/${data.id}`, payload, {
        headers: { Authorization: `bearer ${token}` },
      });
      return response.data;
    };

    return useMutation({
      mutationFn: patchData,
      onSuccess: onSuccess,
      onError: onError,
    });
  }

  static deleteArea({ onSuccess, onError }: IMutateObject) {
    const deleteData = async (id: string) => {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`/api/v1/areas/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
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

export default Areas;
