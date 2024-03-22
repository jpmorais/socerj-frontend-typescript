import {
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import { useDashboardContext } from "../layouts/DashboardLayout";
import { useQueryClient } from "@tanstack/react-query";
import Patrocinadores, {
  IPatrocinadorPayload,
} from "../../models/Patrocinadores";
import Eventos, { IEventoPayload } from "../../models/Eventos";
import Cupons, { ICupomPayload } from "../../models/Cupons";

const CuponsCreate = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const { isLoading, setIsLoading } = useDashboardContext();

  const [isPercentual, setIsPercentual] = useState(true);

  const onClickClose = () => {
    navigate("..");
  };

  // busca eventos
  const { data: eventos } = Eventos.getAllEventos({
    filter: "",
    sort: "evento:asc",
  });

  // busca patrocinadores
  const { data: patrocinadores } = Patrocinadores.getAllPatrocinadores({
    filter: "",
    sort: "patrocinador:asc",
  });

  // create cupom
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICupomPayload>();

  const { mutate, isPending: isPendingPatch } = Cupons.createCupom({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cupons"] });
      toast.success("cupom criado com sucesso");
      navigate("..");
    },
    onError: (error: any) => {
      toast.error(`falha ao criar cupom: ${error?.response?.data?.message}`);
      navigate("..");
    },
  });

  const onSubmit: SubmitHandler<ICupomPayload> = async (data) => {
    console.log("data", data);

    mutate({
      eventoId: data.eventoId,
      patrocinadorId: data.patrocinadorId,
      qtd: data.qtd,
      valorDesconto: data.valorDesconto,
      percDesconto: data.percDesconto,
      isPercentual: isPercentual,
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
        <h2 className="font-bold text-lg my-8">Cadastrar cupons</h2>
        <div className="flex flex-col gap-3">
          <label className="input input-bordered flex items-center gap-2">
            Quantidade
            <input
              {...register("qtd", {
                required: "Qtd deve ser preenchido",
              })}
              placeholder="quantidade"
              className="grow"
            />
          </label>
          <div className="text-error">
            {errors.qtd && <p>{errors.qtd.message}</p>}
          </div>
          <label className="form-control w-full -mt-4">
            <div className="label">
              <span className="label-text">Evento</span>
            </div>
            <select
              className="select select-bordered w-full"
              {...register("eventoId", {
                required: "Evento deve ser preenchido",
              })}
            >
              <option disabled>Evento</option>
              {eventos?.items.map((evento) => {
                return (
                  <option key={evento.id} value={evento.id}>
                    {evento.evento}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Patrocinador</span>
            </div>
            <select
              className="select select-bordered w-full"
              {...register("patrocinadorId", {
                required: "Patrocinador deve ser preenchido",
              })}
            >
              <option disabled>Patrocinador</option>
              {patrocinadores?.items.map((patrocinador) => {
                return (
                  <option key={patrocinador.id} value={patrocinador.id}>
                    {patrocinador.patrocinador}
                  </option>
                );
              })}
            </select>
          </label>
          <div className="flex flex-row gap-3 my-3">
            <input
              type="radio"
              name="percValor"
              className="radio"
              checked={isPercentual}
              onClick={() => setIsPercentual(true)}
            />{" "}
            Percentual
            <input
              type="radio"
              name="percValor"
              className="radio ml-10"
              checked={!isPercentual}
              onClick={() => setIsPercentual(false)}
            />{" "}
            Valor Fixo
          </div>
          {isPercentual && (
            <>
              <label className="input input-bordered flex items-center gap-2 max-w-xs">
                <input
                  type="text"
                  className="grow"
                  {...register("percDesconto")}
                />
                <div>%</div>
              </label>
            </>
          )}
          {!isPercentual && (
            <>
              <label className="input input-bordered flex items-center gap-2 max-w-xs">
                <div>R$</div>
                <input
                  type="text"
                  className="grow"
                  {...register("valorDesconto")}
                />
              </label>
            </>
          )}

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
export default CuponsCreate;
