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
import Eventos, { IEventoPayload } from "../../models/Eventos";

const EventosEdit = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const { isLoading, setIsLoading } = useDashboardContext();

  const onClickClose = () => {
    navigate("..");
  };

  // Get evento
  const { id } = useParams();
  const {
    isPending: isPendingGet,
    error,
    data,
    refetch,
  } = Eventos.getEvento(id!);
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

  useEffect(() => {
    refetch();
  }, [data]);

  useEffect(() => {
    refetch();
  });

  // edit evento
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEventoPayload>();

  const { mutate, isPending: isPendingPatch } = Eventos.updateEvento({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventos"] });
      toast.success("evento editado com sucesso");
      navigate("..");
    },
    onError: (error: any) => {
      toast.error(`falha ao editar evento: ${error?.response?.data?.message}`);
      navigate("..");
    },
  });

  const onSubmit: SubmitHandler<IEventoPayload> = async (data) => {
    mutate({
      id: parseInt(id!),
      evento: data.evento,
      inicio: data.inicio,
      final: data.final,
      aberto: data.aberto,
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
          Editar #{data?.id} | {data?.evento}
        </h3>
        <div className="flex flex-col gap-3">
          <label className="input input-bordered flex items-center gap-2">
            Evento
            <input
              {...register("evento", {
                required: "Evento deve ser preenchido",
              })}
              defaultValue={data?.evento}
              className="grow"
            />
          </label>
          <div className="text-error">
            {errors.evento && <p>{errors.evento.message}</p>}
          </div>
          <label className="input input-bordered flex items-center gap-2">
            Início
            <input
              {...register("inicio", {
                required: "Início deve ser preenchido",
              })}
              defaultValue={data?.inicio}
              className="grow"
            />
          </label>
          <div className="text-error">
            {errors.inicio && <p>{errors.inicio.message}</p>}
          </div>
          <label className="input input-bordered flex items-center gap-2">
            Final
            <input
              {...register("final", {
                required: "Final deve ser preenchido",
              })}
              defaultValue={data?.final}
              className="grow"
            />
          </label>
          <div className="text-error">
            {errors.final && <p>{errors.final.message}</p>}
          </div>
          <label className="input input-bordered flex items-center gap-2">
            Aberto
            <input {...register("aberto")} className="grow" />
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
export default EventosEdit;
