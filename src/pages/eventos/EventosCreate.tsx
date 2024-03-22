import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useRef } from "react";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import { useDashboardContext } from "../layouts/DashboardLayout";
import { useQueryClient } from "@tanstack/react-query";
import Patrocinadores, {
  IPatrocinadorPayload,
} from "../../models/Patrocinadores";
import Eventos, { IEventoPayload } from "../../models/Eventos";

const EventosCreate = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const { isLoading, setIsLoading } = useDashboardContext();

  const onClickClose = () => {
    navigate("..");
  };

  // create evento
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEventoPayload>();

  const { mutate, isPending: isPendingPatch } = Eventos.createEvento({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventos"] });
      toast.success("evento criado com sucesso");
      navigate("..");
    },
    onError: (error: any) => {
      toast.error(`falha ao criar evento: ${error?.response?.data?.message}`);
      navigate("..");
    },
  });

  const onSubmit: SubmitHandler<IEventoPayload> = async (data) => {
    mutate({
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
        <h2 className="font-bold text-lg my-8">Cadastrar evento</h2>
        <div className="flex flex-col gap-3">
          <label className="input input-bordered flex items-center gap-2">
            Evento
            <input
              {...register("evento", {
                required: "Evento deve ser preenchido",
              })}
              placeholder="evento"
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
              placeholder="início"
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
              placeholder="final"
              className="grow"
            />
          </label>
          <div className="text-error">
            {errors.final && <p>{errors.final.message}</p>}
          </div>
          <label className="input input-bordered flex items-center gap-2">
            Aberto
            <input
              {...register("aberto")}
              placeholder="aberto"
              className="grow"
            />
          </label>
          <button
            disabled={isPendingPatch}
            type="submit"
            className="btn btn-primary font-semibold text-lg"
          >
            {isPendingPatch ? "Cadastrando..." : "Cadastrar"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default EventosCreate;
