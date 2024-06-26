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
  confirmaPassword?: string;
  areaId?: number;
  generoId: number;
  categoriaId: number;
  especialidadeId?: number;
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
  categoria?: {
    categoria: string;
  };
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

  static async getUsuarioByEmail(email: string) {
    const response = await axios.get<IGetAllApiResponse<IUsuario>>(
      `/api/v1/usuarios?filter=email:${email}`
    );
    if (response.data.items.length > 0) {
      return response.data.items[0];
    } else {
      return null;
    }
  }

  static async getUsuarioByCpf(email: string) {
    const response = await axios.get<IGetAllApiResponse<IUsuario>>(
      `/api/v1/usuarios?filter=cpf:${email}`
    );
    if (response.data.items.length > 0) {
      return response.data.items[0];
    } else {
      return null;
    }
  }

  static getUsuario(id: string) {
    const fetchaData = async () => {
      const headers = {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      };

      const response = await axios.get<IUsuario>(`/api/v1/usuarios/${id}`, {
        headers,
      });
      return response.data;
    };

    return useQuery({
      queryKey: ["usuarios", id],
      queryFn: fetchaData,
    });
  }

  static createUsuario({ onSuccess, onError }: IMutateObject) {
    const postData = async (data: IUsuarioPayload) => {
      let dataCorrigida: IUsuarioPayload = {
        ...data,
        generoId:
          data.generoId && typeof data.generoId == "string"
            ? parseInt(data.generoId)
            : data.generoId,
        categoriaId:
          data.categoriaId && typeof data.categoriaId == "string"
            ? parseInt(data.categoriaId)
            : data.categoriaId,
        areaId:
          data.areaId && typeof data.areaId == "string"
            ? parseInt(data.areaId)
            : data.areaId,
        especialidadeId:
          data.especialidadeId && typeof data.especialidadeId == "string"
            ? parseInt(data.especialidadeId)
            : data.especialidadeId,
      };
      const response = await axios.post(`/api/v1/usuarios`, dataCorrigida);
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
      const payloadCorrigido = {
        ...payload,
        generoId:
          data.generoId && typeof data.generoId == "string"
            ? parseInt(data.generoId)
            : data.generoId,
        categoriaId:
          data.categoriaId && typeof data.categoriaId == "string"
            ? parseInt(data.categoriaId)
            : data.categoriaId,
        areaId:
          data.areaId && typeof data.areaId == "string"
            ? parseInt(data.areaId)
            : data.areaId,
        especialidadeId:
          data.especialidadeId && typeof data.especialidadeId == "string"
            ? parseInt(data.especialidadeId)
            : data.especialidadeId,
      };
      const response = await axios.patch(
        `/api/v1/usuarios/${data.id}`,
        payloadCorrigido
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
