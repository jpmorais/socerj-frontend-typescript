import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useRef } from "react";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import { useDashboardContext } from "../layouts/DashboardLayout";
import { useQueryClient } from "@tanstack/react-query";
import Eventos, { IEventoPayload } from "../../models/Eventos";
import InputMask from "react-input-mask";
import { ISOToDate, dateToISO } from "../../utils/funcoes";

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
      inicio: dateToISO(data.inicio),
      final: dateToISO(data.final),
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
            <InputMask
              {...register("inicio", {
                required: "Início deve ser preenchido",
              })}
              defaultValue={ISOToDate(data?.inicio!)}
              className="grow"
              mask="99/99/9999"
            />
          </label>
          <div className="text-error">
            {errors.inicio && <p>{errors.inicio.message}</p>}
          </div>
          <label className="input input-bordered flex items-center gap-2">
            Final
            <InputMask
              {...register("final", {
                required: "Final deve ser preenchido",
              })}
              defaultValue={ISOToDate(data?.final!)}
              className="grow"
              mask="99/99/9999"
            />
          </label>
          <div className="text-error">
            {errors.final && <p>{errors.final.message}</p>}
          </div>
          <label className="input input-bordered flex items-center gap-2">
            Aberto
            <input
              type="checkbox"
              {...register("aberto")}
              className="checkbox"
              defaultChecked={data?.aberto}
            />{" "}
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
