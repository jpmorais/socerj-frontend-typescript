import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import { useDashboardContext } from "../layouts/DashboardLayout";
import { useQueryClient } from "@tanstack/react-query";
import Inscricoes, { IInscricaoPayload } from "../../models/Inscricoes";
import InputMask from "react-input-mask";
import { ISOToDate, dateToISO } from "../../utils/funcoes";
import SelectInput from "../../components/SelectInput";
import {
  formaPagamento,
  listaFormaPagamento,
  listaStatusPagamento,
  listaTipoInscricao,
} from "../../utils/data";
import Usuarios from "../../models/Usuarios";
import Cupons from "../../models/Cupons";

const InscricoesEdit = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, setIsLoading } = useDashboardContext();

  const onClickClose = () => {
    navigate("..");
  };

  // Get inscricao
  const { id } = useParams();
  const {
    isPending: isPendingGet,
    error,
    data: inscricao,
    refetch,
  } = Inscricoes.getInscricao(id!);
  useEffect(() => {
    if (isPendingGet) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    if (error) {
      throw new Error("Falha ao buscar inscrição");
    }
  }, [isPendingGet]);

  useEffect(() => {
    refetch();
  }, [inscricao]);

  // busca cupoms
  const { data: cupons } = Cupons.getAllCupons({
    filter: `eventoId=${inscricao?.eventoId}`,
    sort: "cupom:asc",
  });

  // Patch inscricao
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInscricaoPayload>();

  const { mutate, isPending: isPendingPatch } = Inscricoes.updateInscricao({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inscricoes"] });
      toast.success("inscrições editado com sucesso");
      navigate("..");
    },
    onError: (error: any) => {
      toast.error(
        `falha ao editar inscrição: ${error?.response?.data?.message}`
      );
      navigate("..");
    },
  });

  useEffect(() => {
    refetch();
  });

  const onSubmit: SubmitHandler<IInscricaoPayload> = async (data) => {
    console.log(data);
    mutate({
      id: parseInt(id!),
      ...data,
      formaPagamento: data.formaPagamento ? data.formaPagamento : undefined,
      cupomId: data.cupomId ? data.cupomId : undefined,
      dataPagamento: data.dataPagamento
        ? dateToISO(data.dataPagamento)
        : undefined,
      dataInscricao: dateToISO(data.dataInscricao),
      valorPago:
        data.valorPago && typeof data.valorPago === "string"
          ? parseFloat(data.valorPago)
          : undefined,
      valor:
        data.valor && typeof data.valor === "string"
          ? parseFloat(data.valor)
          : undefined,
    });
  };

  return (
    <Modal classes="w-11/12 max-w-4xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClickClose}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg my-8">
          Editar #{inscricao?.id} | {inscricao?.usuario?.email} |{" "}
          {inscricao?.evento?.evento}
        </h3>
        <div className="grid grid-cols-10 gap-x-3 gap-y-3">
          <div className="flex flex-col gap-3 col-span-4">
            <label className="input input-bordered flex items-center gap-2">
              Data Inscrição
              <InputMask
                {...register("dataInscricao", {
                  required: "Data de Inscrição deve ser preenchido",
                })}
                defaultValue={ISOToDate(inscricao?.dataInscricao!)}
                className="grow"
                mask="99/99/9999"
              />
            </label>
            <div className="text-error">
              {errors.dataInscricao && <p>{errors.dataInscricao.message}</p>}
            </div>
          </div>
          <div className="flex flex-col gap-3 col-span-4">
            <label className="input input-bordered flex items-center gap-2">
              Data Pagamento
              <InputMask
                {...register("dataPagamento")}
                defaultValue={
                  inscricao?.dataPagamento &&
                  ISOToDate(inscricao?.dataPagamento)
                }
                className="grow"
                mask="99/99/9999"
              />
            </label>
            <div className="text-error"></div>
          </div>
          <div className="flex flex-col gap-3 col-span-4">
            <label className="input input-bordered flex items-center gap-2">
              Valor inscrição
              <input
                {...register("valor", {
                  pattern: /^\d{1,3}(,\d{3})*(,\d{2})?$/,
                })}
                defaultValue={inscricao?.valor}
                className="grow"
              />
            </label>
            <div className="text-error">
              {errors.valor && <span>Por favor, insira um valor decimal.</span>}
            </div>
          </div>
          <div className="flex flex-col gap-3 col-span-4">
            <label className="input input-bordered flex items-center gap-2">
              Valor pago
              <input
                {...register("valorPago", {
                  pattern: /^\d{1,3}(,\d{3})*(,\d{2})?$/,
                })}
                defaultValue={inscricao?.valorPago}
                className="grow"
              />
            </label>
            <div className="text-error">
              {errors.valor && <span>Por favor, insira um valor decimal.</span>}
            </div>
          </div>
          <div className="flex flex-col gap-3 col-span-4">
            <label className="input input-bordered flex items-center gap-2">
              Nota Fiscal
              <input
                {...register("notaFiscal")}
                defaultValue={inscricao?.notaFiscal}
                className="grow"
              />
            </label>
          </div>
          <div className="flex flex-col gap-3 col-span-3">
            <div>
              <SelectInput
                lista={listaTipoInscricao}
                campoNome="Tipo de Inscrição"
                campoId="tipoInscricao"
                campoChave="valor"
                campoValor="valor"
                register={register}
                required={true}
                defaultValue={inscricao?.tipoInscricao}
              />
            </div>
            <div className="text-error">
              {errors.tipoInscricao && <p>{errors.tipoInscricao.message}</p>}
            </div>
          </div>
          <div className="flex flex-col gap-3 col-span-3">
            <div>
              <SelectInput
                lista={listaFormaPagamento}
                campoNome="Forma de pagamento"
                campoId="formaPagamento"
                campoChave="valor"
                campoValor="valor"
                register={register}
                defaultValue={inscricao?.formaPagamento}
              />
            </div>
            <div className="text-error">
              {errors.formaPagamento && <p>{errors.formaPagamento.message}</p>}
            </div>
          </div>
          <div className="flex flex-col gap-3 col-span-3">
            <div>
              <SelectInput
                lista={listaStatusPagamento}
                campoNome="Status do pagamento"
                campoId="statusPagamento"
                campoChave="valor"
                campoValor="valor"
                register={register}
                defaultValue={inscricao?.statusPagamento}
              />
            </div>
            <div className="text-error">
              {errors.statusPagamento && (
                <p>{errors.statusPagamento.message}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3 col-span-3">
            <div>
              <SelectInput
                lista={cupons}
                campoNome="Cupom"
                campoId="cupomId"
                campoChave="id"
                campoValor="cupom"
                register={register}
                defaultValue={inscricao?.cupomId}
              />
            </div>
            <div className="text-error">
              {errors.tipoInscricao && <p>{errors.tipoInscricao.message}</p>}
            </div>
          </div>
          <div className="flex flex-col gap-3 col-span-3">
            <label className="input input-bordered flex items-center gap-6">
              Confirmado
              <input
                type="checkbox"
                {...register("confirmado")}
                className="checkbox"
                defaultChecked={inscricao?.confirmado}
              />{" "}
            </label>
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
export default InscricoesEdit;
