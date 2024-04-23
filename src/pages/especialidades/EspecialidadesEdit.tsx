import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useRef } from "react";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import { useDashboardContext } from "../layouts/DashboardLayout";
import Especialidades, {
  IEspecialidadePayload,
} from "../../models/Especialidades";
import { useQueryClient } from "@tanstack/react-query";

const EspecialidadesEdit = () => {
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
  } = Especialidades.getEspecialidade(id!);
  useEffect(() => {
    if (isPendingGet) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    if (error) {
      throw new Error("Falha ao buscar especialidades");
    }
  }, [isPendingGet]);

  // Patch area
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEspecialidadePayload>();

  const { mutate, isPending: isPendingPatch } =
    Especialidades.updateEspecialidade({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["especialidades"] });
        toast.success("especialidade editada com sucesso");
        navigate("..");
      },
      onError: (error: any) => {
        toast.error(
          `falha ao editar especialidade: ${error?.response?.data?.message}`
        );
        navigate("..");
      },
    });

  useEffect(() => {
    refetch();
  });

  const onSubmit: SubmitHandler<IEspecialidadePayload> = async (data) => {
    mutate({
      id: parseInt(id!),
      especialidade: data.especialidade,
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
          Editar #{data?.id} | {data?.especialidade}
        </h3>
        <div className="flex flex-col gap-3">
          <input
            {...register("especialidade", {
              required: "Especialidade deve ser preenchida",
            })}
            className="input input-bordered w-full"
            defaultValue={data?.especialidade}
          />
          <div className="text-error">
            {errors.especialidade && <p>{errors.especialidade.message}</p>}
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
export default EspecialidadesEdit;
