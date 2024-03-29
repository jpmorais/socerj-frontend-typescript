import axios from "axios";
import {
  IGetAllApiResponse,
  IGetAllRequestParams,
  IMutateObject,
} from "../types/types";
import { useQuery, useMutation } from "@tanstack/react-query";

export interface IUsuario {
  id: string;
  email: string;
  cpf?: string;
  ativo: boolean;
  password?: string;
  areaId: number;
  generoId: number;
  categoriaId: number;
  especialidadeId: number;
  fotoPerfil?: string;
  nome?: string;
  identidade?: string;
  registro?: string;
  nacionalidade?: string;
  naturalidade?: string;
  celular?: string;
  telefoneComercial?: string;
  emailProfissional?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  pais?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
  crm?: string;
  registroProfissional?: string;
  adimplemente?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUsuarioPayload extends Omit<IUsuario, "id"> {}

class Usuarios {
  static getAllUsuarios(params?: IGetAllRequestParams) {
    const fetchaData = async () => {
      const response = await axios.get<IGetAllApiResponse<IUsuario>>(
        `/api/v1/usuarios?filter=${params?.filter || ""}&sort=${
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
        "usuarios",
        params?.filter,
        params?.page,
        params?.limit,
        params?.sort,
      ],
      queryFn: fetchaData,
    });
  }

  static getUsuario(id: string) {
    const fetchaData = async () => {
      const response = await axios.get<IUsuario>(`/api/v1/usuarios/${id}`);
      return response.data;
    };

    return useQuery({
      queryKey: ["usuarios", id],
      queryFn: fetchaData,
    });
  }

  static createUsuario({ onSuccess, onError }: IMutateObject) {
    const postData = async (data: IUsuarioPayload) => {
      const response = await axios.post(`/api/v1/usuarios`, data);
      return response.data;
    };

    return useMutation({
      mutationFn: postData,
      onSuccess: onSuccess,
      onError: onError,
    });
  }

  static updateUsuario({ onSuccess, onError }: IMutateObject) {
    const patchData = async (data: IUsuario) => {
      const { id, ...payload } = data;
      const response = await axios.patch(
        `/api/v1/usuarios/${data.id}`,
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

  static deleteUsuario({ onSuccess, onError }: IMutateObject) {
    const deleteData = async (id: string) => {
      const response = await axios.delete(`/api/v1/usuarios/${id}`);
      return response.data;
    };

    return useMutation({
      mutationFn: deleteData,
      onSuccess: onSuccess,
      onError: onError,
    });
  }
}

export default Usuarios;
