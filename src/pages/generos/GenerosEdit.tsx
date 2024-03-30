import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Areas, { IAreaPayload } from "../../models/Areas";
import { useEffect, useRef } from "react";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import { useDashboardContext } from "../layouts/DashboardLayout";
import { useQueryClient } from "@tanstack/react-query";
import Generos, { IGeneroPayload } from "../../models/Generos";

const GenerosEdit = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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
  } = Generos.getGenero(id!);
  useEffect(() => {
    if (isPendingGet) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    if (error) {
      throw new Error("Falha ao buscar gênero");
    }
  }, [isPendingGet]);

  useEffect(() => {
    refetch();
  }, [data]);

  // Patch area
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IGeneroPayload>();

  const { mutate, isPending: isPendingPatch } = Generos.updateGenero({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["generos"] });
      toast.success("gênero editado com sucesso");
      navigate("..");
    },
    onError: (error: any) => {
      toast.error(`falha ao editar gênero: ${error?.response?.data?.message}`);
      navigate("..");
    },
  });

  useEffect(() => {
    refetch();
  });

  const onSubmit: SubmitHandler<IGeneroPayload> = async (data) => {
    mutate({
      id: parseInt(id!),
      genero: data.genero,
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
          Editar #{data?.id} | {data?.genero}
        </h3>
        <div className="flex flex-col gap-3">
          <input
            {...register("genero", {
              required: "Gênero deve ser preenchido",
            })}
            className="input input-bordered w-full"
            defaultValue={data?.genero}
          />
          <div className="text-error">
            {errors.genero && <p>{errors.genero.message}</p>}
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
export default GenerosEdit;
