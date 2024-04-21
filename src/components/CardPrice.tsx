import CategoriasInscricao from "../models/CategoriaInscricao";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  converterDataParaFormatoBrasileiro,
  formatarParaDinheiro,
} from "../utils/funcoes";

type Props = {
  categoria: string;
  price: string | number;
  dataLimite: string;
  quantidade?: number;
  deletar?: boolean;
  categoriaInscricaoId: number | string;
};

const CardPrice = ({
  categoria,
  price,
  dataLimite,
  quantidade,
  deletar,
  categoriaInscricaoId,
}: Props) => {
  // Delete area

  const queryClient = useQueryClient();

  const { mutate, isPending } = CategoriasInscricao.deleteCatgoria({
    onSuccess: () => {
      toast.success("inscrição para categoria excluída com sucesso");
      queryClient.invalidateQueries({ queryKey: ["categoriasInscricao"] });
    },
    onError: (error: any) => {
      toast.error(
        `falha ao editar inscrição para categoria: ${error?.response?.data?.message}`
      );
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    mutate(categoriaInscricaoId);
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title">{categoria}</h2>
        <p>{formatarParaDinheiro(price.toString())}</p>
        <p>{converterDataParaFormatoBrasileiro(dataLimite)}</p>
        <p>Quantidade: {quantidade || "(aberto)"}</p>
        {deletar && (
          <button
            className="btn btn-error text-white text-lg"
            disabled={isPending}
            onClick={handleSubmit}
          >
            {isPending ? "Excluindo..." : "Excluir"}
          </button>
        )}
      </div>
    </div>
  );
};
export default CardPrice;
