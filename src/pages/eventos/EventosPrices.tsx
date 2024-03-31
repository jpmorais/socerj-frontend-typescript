import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useRef } from "react";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import { useDashboardContext } from "../layouts/DashboardLayout";
import Eventos, { IEventoPayload } from "../../models/Eventos";
import CategoriasInscricao, {
  ICategoriaInscricaoPayload,
} from "../../models/CategoriaInscricao";
import CardPrice from "../../components/CardPrice";
import SelectInput from "../../components/SelectInput";
import Categorias from "../../models/Categorias";
import { useQueryClient } from "@tanstack/react-query";
import InputMask from "react-input-mask";
import { dateToISO } from "../../utils/funcoes";

const EventosPrices = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { id } = useParams();
  const { isLoading, setIsLoading } = useDashboardContext();

  const { isPending: isPendingGet, error, data } = Eventos.getEvento(id!);

  // pega categorias inscricao
  const {
    isPending: isPendingGetCategoriasInscricao,
    error: errorCategoriasInscricao,
    data: categoriasInscricao,
  } = CategoriasInscricao.getAllCateriasIncricao({ filter: `eventoId=${id}` });

  // pega categorias
  const {
    isPending: isPendingGetCategorias,
    error: errorCategorias,
    data: categorias,
  } = Categorias.getAllCategorias();

  useEffect(() => {
    if (isPendingGet) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    if (error) {
      throw new Error("Falha ao buscar evento");
    }
  }, [isPendingGet]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICategoriaInscricaoPayload>();

  const { mutate, isPending } = CategoriasInscricao.createCategoriaInscricao({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categoriasInscricao"] });
      toast.success("inscrição para categoria criada com sucesso");
      reset();
    },
    onError: (error: any) => {
      toast.error(
        `falha ao criar inscrição para categoria: ${error?.response?.data?.message}`
      );
      reset();
    },
  });

  const onSubmit: SubmitHandler<ICategoriaInscricaoPayload> = async (data) => {
    mutate({
      ...data,
      eventoId: parseInt(id!),
      dataLimite: dateToISO(data.dataLimite),
    });
  };

  const onClickClose = () => {
    navigate("..");
  };

  return (
    <Modal classes="w-11/12 max-w-4xl">
      <button
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        onClick={onClickClose}
      >
        ✕
      </button>
      <h2 className="font-bold text-lg my-8">
        Tabela de valores {data?.evento}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-3 gap-x-3 gap-y-4"
      >
        <SelectInput
          campoId="categoriaId"
          campoNome="Categoria"
          register={register}
          lista={categorias}
          campoChave="id"
          campoValor="categoria"
        />
        <div>
          <label className="input input-bordered flex items-center gap-2">
            Valor
            <input
              {...register("valor", {
                required: "Valor deve ser preenchido",
              })}
              placeholder="valor"
              className="grow"
            />
          </label>
          <div className="text-error">
            {errors.valor && <p>{errors.valor.message}</p>}
          </div>
        </div>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            Data
            <InputMask
              {...register("dataLimite", {
                required: "Data Limite deve ser preenchido",
              })}
              placeholder="data limite"
              className="grow"
              mask="99/99/9999"
            />
          </label>
          <div className="text-error">
            {errors.valor && <p>{errors.valor.message}</p>}
          </div>
        </div>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            Quantidade
            <input
              {...register("quantidade")}
              placeholder="quantidade"
              className="grow"
            />
          </label>
        </div>
        <div></div>
        <button
          disabled={isPending}
          type="submit"
          className="btn btn-primary font-semibold text-lg"
        >
          {isPending ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
      <div className="divider">Valores já cadastrados</div>
      <div className="grid grid-cols-3 mt-4 gap-2">
        {categoriasInscricao?.items.map((item) => {
          return (
            <CardPrice
              categoria={item.categoria?.categoria || ""}
              price={item.valor}
              dataLimite={item.dataLimite}
              quantidade={item.quantidade}
              deletar={true}
              categoriaInscricaoId={item.id}
            />
          );
        })}
      </div>
    </Modal>
  );
};
export default EventosPrices;
