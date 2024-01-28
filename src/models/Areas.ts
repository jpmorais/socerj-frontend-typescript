// AreasModel.ts
import axios from "axios";

export interface Area {
  id: number;
  area: string;
}

interface ApiResponse {
  success: boolean;
  items: Area[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}

interface AreasRequestParams {
  filter?: string;
  sort?: string;
  limit?: number;
  page?: number;
}

class Areas {
  static async getAllAreas(params?: AreasRequestParams): Promise<Area[]> {
    try {
      const response = await axios.get<ApiResponse>(
        `/api/v1/areas?filter=${params?.filter || ""}&sort=${
          params?.sort || ""
        }&limit=${params?.limit || 20}&page=${params?.page || 1}`
      ); // Substitua pelo seu endpoint real
      return response.data.items;
    } catch (error) {
      console.error("Erro ao buscar áreas:", error);
      throw error;
    }
  }

  // Adicione outros métodos conforme necessário
}

export default Areas;
