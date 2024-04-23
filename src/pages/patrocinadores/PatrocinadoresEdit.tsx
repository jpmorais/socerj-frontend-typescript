import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useRef } from "react";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import { useDashboardContext } from "../layouts/DashboardLayout";
import { useQueryClient } from "@tanstack/react-query";
import Generos, { IGeneroPayload } from "../../models/Generos";
import Patrocinadores, {
  IPatrocinadorPayload,
} from "../../models/Patrocinadores";

const PatrocinadoresEdit = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const { isLoading, setIsLoading } = useDashboardContext();

  const onClickClose = () => {
    navigate("..");
  };

  // Get patrocinador
  const { id } = useParams();
  const {
    isPending: isPendingGet,
    error,
    data,
    refetch,
  } = Patrocinadores.getPatrocinador(id!);
  useEffect(() => {
    if (isPendingGet) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    if (error) {
      throw new Error("Falha ao buscar patrocinador");
    }
  }, [isPendingGet]);

  useEffect(() => {
    refetch();
  });

  // edit patrocinaodr
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPatrocinadorPayload>();

  const { mutate, isPending: isPendingPatch } =
    Patrocinadores.updatePatrocinador({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["patrocinadores"] });
        toast.success("patrocinador editado com sucesso");
        navigate("..");
      },
      onError: (error: any) => {
        toast.error(
          `falha ao editar patrocinador: ${error?.response?.data?.message}`
        );
        navigate("..");
      },
    });

  const onSubmit: SubmitHandler<IPatrocinadorPayload> = async (data) => {
    mutate({
      id: parseInt(id!),
      patrocinador: data.patrocinador,
      contato: data.contato,
      telefone: data.telefone,
      email: data.email,
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
          Editar #{data?.id} | {data?.patrocinador}
        </h3>
        <div className="flex flex-col gap-3">
          <label className="input input-bordered flex items-center gap-2">
            Patrocinador
            <input
              {...register("patrocinador", {
                required: "Patrocinador deve ser preenchido",
              })}
              defaultValue={data?.patrocinador}
              className="grow bg-base-100"
            />
          </label>
          <div className="text-error">
            {errors.patrocinador && <p>{errors.patrocinador.message}</p>}
          </div>
          <label className="input input-bordered flex items-center gap-2">
            Contato
            <input
              {...register("contato", {
                required: "Contato deve ser preenchido",
              })}
              defaultValue={data?.contato}
              className="grow bg-base-100"
            />
          </label>
          <div className="text-error">
            {errors.contato && <p>{errors.contato.message}</p>}
          </div>
          <label className="input input-bordered flex items-center gap-2">
            Email
            <input
              {...register("email", {
                required: "Email deve ser preenchido",
              })}
              defaultValue={data?.email}
              className="grow bg-base-100"
            />
          </label>
          <div className="text-error">
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <label className="input input-bordered flex items-center gap-2">
            Telefone
            <input
              {...register("telefone")}
              defaultValue={data?.telefone}
              className="grow bg-base-100"
            />
          </label>

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
export default PatrocinadoresEdit;
