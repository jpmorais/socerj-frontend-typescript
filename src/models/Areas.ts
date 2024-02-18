// AreasModel.ts
import axios from "axios";
import {
  IGetAllApiResponse,
  IGetAllRequestParams,
  IMutateObject,
} from "../types/types";
import { useQuery, useMutation } from "@tanstack/react-query";

export interface Area {
  id: number;
  area: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AreaPayload extends Omit<Area, "id"> {}

class Areas {
  static getAllAreas(params?: IGetAllRequestParams) {
    const fetchaData = async () => {
      const response = await axios.get<IGetAllApiResponse<Area>>(
        `/api/v1/areas?filter=${params?.filter || ""}&sort=${
          params?.sort || ""
        }&limit=${params?.limit || 20}&page=${params?.page || 1}`
      ); // Substitua pelo seu endpoint real
      return {
        items: response.data.items,
        totalPages: response.data.totalPages,
      };
    };

    return useQuery({
      queryKey: ["areas", params?.filter, params?.page],
      queryFn: fetchaData,
    });
  }

  static getArea(id: string) {
    const fetchaData = async () => {
      console.log(`Fetching uma vez...`);
      const response = await axios.get<Area>(`/api/v1/areas/${id}`);
      return response.data;
    };

    return useQuery({
      queryKey: ["area", id],
      queryFn: fetchaData,
    });
  }

  static createArea({ onSuccess, onError }: IMutateObject) {
    const postData = async (data: AreaPayload) => {
      const response = await axios.post(`/api/v1/areas`, data);
      return response.data;
    };

    return useMutation({
      mutationFn: postData,
      onSuccess: onSuccess,
      onError: onError,
    });
  }

  static updateArea({ onSuccess, onError }: IMutateObject) {
    const patchData = async (data: Area) => {
      const response = await axios.patch(`/api/v1/areas/${data.id}`, {
        area: data.area,
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
      const response = await axios.delete(`/api/v1/areas/${id}`);
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
