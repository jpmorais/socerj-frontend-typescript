import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import { useDashboardContext } from "../layouts/DashboardLayout";
import { useQueryClient } from "@tanstack/react-query";
import Inscricoes, { IInscricaoPayload } from "../../models/Inscricoes";
import Eventos from "../../models/Eventos";
import SelectInput from "../../components/SelectInput";
import InputMask from "react-input-mask";
import { FormEvent, useState } from "react";
import Usuarios, { IUsuario } from "../../models/Usuarios";
import { listaTipoInscricao, tipoInscricao } from "../../utils/data";
import Cupons from "../../models/Cupons";

const InscricoesCreate = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, setIsLoading } = useDashboardContext();

  const [email, setEmail] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [usuario, setUsuario] = useState<IUsuario | null>();
  const [eventoId, setEventoId] = useState();

  const onClickClose = () => {
    navigate("..");
  };

  // busca eventos
  const { data: eventos } = Eventos.getAllEventos({
    filter: "",
    sort: "evento:asc",
  });

  const { data: cupons } = Cupons.getAllCupons({
    filter: eventoId && `eventoId=${eventoId},inscricao:null`,
    sort: "cupom:asc",
  });

  // create inscricao
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInscricaoPayload>();

  const { mutate, isPending: isPendingPatch } = Inscricoes.createInscricao({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inscricoes"] });
      toast.success("inscrição criado com sucesso");
      navigate("..");
    },
    onError: (error: any) => {
      toast.error(
        `falha ao criar inscrição: ${error?.response?.data?.message}`
      );
      navigate("..");
    },
  });

  const buscaUsuario = async () => {
    let usuario;
    if (email) {
      usuario = await Usuarios.getUsuarioByEmail(email);
    } else if (cpf) {
      usuario = await Usuarios.getUsuarioByCpf(cpf);
    }
    setUsuario(usuario);
  };

  const onSubmit: SubmitHandler<IInscricaoPayload> = async (data) => {
    console.log({ ...data, usuarioId: usuario?.id });
    mutate({ ...data, usuarioId: usuario?.id! });
  };

  return (
    <Modal classes="w-11/12 max-w-5xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClickClose}
        >
          ✕
        </button>
        <h2 className="font-bold text-xl my-3">Cadastrar inscrição</h2>
        <div className="flex flex-row my-4 items-center gap-3 border p-4 border-gray-300 rounded-lg">
          <div className="text-lg font-semibold">Buscar usuário</div>
          <label className="input input-bordered flex items-center gap-5 w-[350px]">
            E-mail
            <input
              placeholder="email"
              className="grow"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <div className="divider lg:divider-horizontal">OU</div>
          <label className="input input-bordered flex items-center gap-5 w-[200px]">
            CPF
            <InputMask
              placeholder="cpf"
              mask="999.999.999-99"
              className="grow"
              onChange={(e) => setCpf(e.target.value)}
            />
          </label>
          <button
            type="button"
            onClick={buscaUsuario}
            className="btn btn-primary text-lg ml-auto"
          >
            Buscar
          </button>
        </div>
        <div className="flex flex-row my-4 items-center gap-3 border p-4 border-gray-300 rounded-lg">
          <div className="text-lg font-semibold mr-10">Usuário </div>
          <div className="w-full ">
            {usuario ? (
              <div className="flex flex-row gap-x-6">
                <div>
                  <strong>Nome:</strong> {usuario.nome}
                </div>{" "}
                <div>
                  <strong> Email:</strong> {usuario.email}
                </div>{" "}
                <div>
                  <strong>CPF:</strong> {usuario.cpf}
                </div>
              </div>
            ) : (
              "usuário não selecionado"
            )}
          </div>
        </div>
        <div
          className={`grid grid-cols-10 gap-x-3 gap-y-3 ${
            !usuario && "hidden"
          }`}
        >
          <div className="flex flex-col gap-3 col-span-4">
            <div>
              <SelectInput
                lista={eventos}
                campoNome="Evento"
                campoId="eventoId"
                campoChave="id"
                campoValor="evento"
                register={register}
                required={true}
                onChange={(e: any) => {
                  setEventoId(e.target.value);
                }}
              />
            </div>
            <div className="text-error">
              {errors.eventoId && <p>{errors.eventoId.message}</p>}
            </div>
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
              />
            </div>
            <div className="text-error">
              {errors.tipoInscricao && <p>{errors.tipoInscricao.message}</p>}
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
                disabled={!eventoId}
              />
            </div>
          </div>
          <div>
            <button className="btn btn-primary text-lg font-semibold">
              Cadastrar
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
export default InscricoesCreate;
