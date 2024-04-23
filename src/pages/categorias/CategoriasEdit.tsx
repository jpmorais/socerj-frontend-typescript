import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useRef } from "react";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import { useDashboardContext } from "../layouts/DashboardLayout";
import { useQueryClient } from "@tanstack/react-query";
import Categorias, { ICategoriaPayload } from "../../models/Categorias";
import { tiposCategoria } from "../../utils/data";

const CategoriasEdit = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const { isLoading, setIsLoading } = useDashboardContext();

  const onClickClose = () => {
    navigate("..");
  };

  // Get area
  const { id } = useParams();
  const {
    isPending: isPendingGet,
    error,
    data,
    refetch,
  } = Categorias.getCategoria(id!);
  useEffect(() => {
    if (isPendingGet) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    if (error) {
      throw new Error("Falha ao buscar categorias");
    }
  }, [isPendingGet]);

  // Patch area
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategoriaPayload>();

  const { mutate, isPending: isPendingPatch } = Categorias.updateCategoria({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
      toast.success("categoria editada com sucesso");
      navigate("..");
    },
    onError: (error: any) => {
      toast.error(
        `falha ao editar categoria: ${error?.response?.data?.message}`
      );
      navigate("..");
    },
  });

  const onSubmit: SubmitHandler<ICategoriaPayload> = async (data) => {
    mutate({
      id: parseInt(id!),
      categoria: data.categoria,
      tipo: data.tipo,
      visivel: data.visivel,
    });
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClickClose}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg my-8">
          Editar #{data?.id} | {data?.categoria}
        </h3>
        <div className="flex flex-col gap-3">
          <label className="input input-bordered flex items-center gap-2">
            Categoria
            <input
              {...register("categoria", {
                required: "Categoria deve ser preenchido",
              })}
              defaultValue={data?.categoria}
              className="grow bg-base-100"
            />
          </label>
          <div className="text-error">
            {errors.categoria && <p>{errors.categoria.message}</p>}
          </div>
          <label className="form-control w-full -mt-4">
            <div className="label">
              <span className="label-text">Tipo</span>
            </div>
            <select
              className="select select-bordered w-full"
              {...register("tipo")}
              defaultValue={data?.tipo}
            >
              <option disabled>Tipo</option>
              {tiposCategoria.map((tipo) => {
                return (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                );
              })}
            </select>
          </label>
          <div className="flex flex-row gap-3 items-center my-4">
            <input
              type="checkbox"
              className="toggle toggle-lg toggle-success"
              {...register("visivel")}
              defaultChecked={data?.visivel}
            />
            <div>Visível</div>
          </div>
          <button
            disabled={isPendingPatch}
            type="submit"
            className="btn btn-primary font-semibold text-lg"
          >
            {isPendingPatch ? "Editando..." : "Editar"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default CategoriasEdit;
