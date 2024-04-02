import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import { useDashboardContext } from "../layouts/DashboardLayout";
import { useQueryClient } from "@tanstack/react-query";
import Usuarios, { IUsuarioPayload } from "../../models/Usuarios";
import InputMask from "react-input-mask";
import Categorias from "../../models/Categorias";
import SelectInput from "../../components/SelectInput";
import Areas from "../../models/Areas";
import Especialidades from "../../models/Especialidades";
import Generos from "../../models/Generos";
import { estadosBrasil } from "../../utils/data";

const UsuariosCreate = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, setIsLoading } = useDashboardContext();

  const onClickClose = () => {
    navigate("..");
  };

  // busca categorias
  const { data: categorias } = Categorias.getAllCategorias({
    filter: "",
    sort: "categoria:asc",
  });

  // busca areas
  const { data: areas } = Areas.getAllAreas({
    filter: "",
    sort: "area:asc",
  });

  // busca especialidades
  const { data: especialiadades } = Especialidades.getAllEspecialidades({
    filter: "",
    sort: "especialidade:asc",
  });

  // busca generos
  const { data: generos } = Generos.getAllGeneros({
    filter: "",
    sort: "genero:asc",
  });

  // create usuario
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUsuarioPayload>();

  const { mutate, isPending: isPendingPatch } = Usuarios.createUsuario({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
      toast.success("usuário criado com sucesso");
      navigate("..");
    },
    onError: (error: any) => {
      toast.error(`falha ao criar usuário: ${error?.response?.data?.message}`);
      navigate("..");
    },
  });

  const onSubmit: SubmitHandler<IUsuarioPayload> = async (data) => {
    mutate(data);
  };

  return (
    <Modal classes="w-11/12 max-w-6xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClickClose}
        >
          ✕
        </button>
        <h2 className="font-bold text-xl my-3">Cadastrar usuário</h2>
        <div className="grid grid-cols-10 gap-x-3 gap-y-3">
          <div className="flex flex-col gap-3 col-span-5">
            <label className="input input-bordered flex items-center gap-2">
              Nome
              <input
                {...register("nome", {
                  required: "Nome deve ser preenchido",
                })}
                placeholder="nome"
                className="grow"
              />
            </label>
            <div className="text-error">
              {errors.nome && <p>{errors.nome.message}</p>}
            </div>
          </div>
          <div className="flex flex-col gap-3 col-span-5">
            <label className="input input-bordered flex items-center gap-2">
              Email
              <input
                {...register("email", {
                  required: "Email deve ser preenchido",
                })}
                placeholder="email"
                className="grow"
              />
            </label>
            <div className="text-error">
              {errors.email && <p>{errors.email.message}</p>}
            </div>
          </div>
          <div className="flex flex-col gap-3 col-span-3">
            <label className="input input-bordered flex items-center gap-2">
              CPF
              <InputMask
                {...register("cpf")}
                placeholder="cpf"
                className="grow"
                mask="999.999.999-99"
              />
            </label>
          </div>
          <div className="flex flex-col gap-3 col-span-4">
            <label className="input input-bordered flex items-center gap-2">
              Identidade
              <input
                {...register("identidade")}
                placeholder="identidade"
                className="grow"
              />
            </label>
          </div>
          <div className="flex flex-col gap-3 col-span-3">
            <label className="input input-bordered flex items-center gap-2">
              Celular
              <InputMask
                {...register("celular")}
                placeholder="celular"
                className="grow"
                mask="(99) 99999-9999"
              />
            </label>
          </div>

          <div className="flex flex-col gap-3 col-span-3">
            <label className="input input-bordered flex items-center gap-2">
              Telefone
              <InputMask
                {...register("telefoneComercial")}
                placeholder="telefone comercial"
                className="grow"
                mask="(99) 99999-9999"
              />
            </label>
          </div>
          <div className="flex flex-col gap-3 col-span-5">
            <label className="input input-bordered flex items-center gap-5">
              E-mail profissional
              <input
                {...register("emailProfissional")}
                placeholder="email profisional"
                className="grow"
              />
            </label>
          </div>
          <div className="flex flex-col gap-3 col-span-2">
            <div>
              <SelectInput
                campoId="generoId"
                campoNome="Gênero"
                register={register}
                lista={generos}
                campoChave="id"
                campoValor="genero"
                required={true}
              />
            </div>
            <div className="text-error">
              {errors.generoId && <p>{errors.generoId.message}</p>}
            </div>
          </div>
          <div className="flex flex-col gap-3 col-span-2">
            <label className="input input-bordered flex items-center gap-4">
              Cep
              <InputMask
                {...register("cep")}
                placeholder="cep"
                className="grow"
                mask="99.999-999"
              />
            </label>
          </div>
          <div className="flex flex-col gap-3 col-span-6">
            <label className="input input-bordered flex items-center gap-5">
              Endereço
              <input
                {...register("endereco")}
                placeholder="endereço"
                className="grow"
              />
            </label>
          </div>
          <div className="flex flex-col gap-3 col-span-2">
            <label className="input input-bordered flex items-center gap-2">
              Nº
              <input
                {...register("numero")}
                placeholder="nº"
                className="grow"
              />
            </label>
          </div>
          <div className="flex flex-col gap-3 col-span-3">
            <label className="input input-bordered flex items-center gap-5">
              Complem.
              <input
                {...register("complemento")}
                placeholder="complemento"
                className="grow"
              />
            </label>
          </div>
          <div className="flex flex-col gap-3 col-span-3">
            <label className="input input-bordered flex items-center gap-4">
              Bairro
              <input
                {...register("bairro")}
                placeholder="bairro"
                className="grow"
              />
            </label>
          </div>
          <div className="flex flex-col gap-3 col-span-4">
            <label className="input input-bordered flex items-center gap-4">
              Cidade
              <input
                {...register("cidade")}
                placeholder="cidade"
                className="grow"
              />
            </label>
          </div>
          <div className="flex flex-col gap-3 col-span-3">
            <SelectInput
              campoId="uf"
              campoNome="UF"
              register={register}
              lista={estadosBrasil}
              campoChave="sigla"
              campoValor="nome"
            />
          </div>
          <div className="flex flex-col gap-3 col-span-4">
            <label className="input input-bordered flex items-center gap-4">
              País
              <input
                {...register("pais")}
                placeholder="país"
                className="grow"
              />
            </label>
          </div>
          <div className="flex flex-col gap-3 col-span-3">
            <label className="input input-bordered flex items-center gap-4">
              Nacionalidade
              <input
                {...register("nacionalidade")}
                placeholder="nacionalidade"
                className="grow"
              />
            </label>
          </div>
          <div className="flex flex-col gap-3 col-span-3">
            <label className="input input-bordered flex items-center gap-4">
              Naturalidade
              <input
                {...register("naturalidade")}
                placeholder="naturalidade"
                className="grow"
              />
            </label>
          </div>
        </div>
        <div className="divider">Dados profissionais</div>
        <div className="grid grid-cols-10 gap-x-3 gap-y-3">
          <div className="flex flex-col gap-3 col-span-3">
            <SelectInput
              campoId="categoriaId"
              campoNome="Categoria"
              register={register}
              lista={categorias}
              campoChave="id"
              campoValor="categoria"
              required={false}
            />
          </div>
          <div className="flex flex-col gap-3 col-span-3">
            <SelectInput
              campoId="especialidadeId"
              campoNome="Especialidade"
              register={register}
              lista={especialiadades}
              campoChave="id"
              campoValor="especialidade"
              required={false}
            />
          </div>
          <div className="flex flex-col gap-3 col-span-4">
            <SelectInput
              campoId="areaId"
              campoNome="Área"
              register={register}
              lista={areas}
              campoChave="id"
              campoValor="area"
              required={false}
            />
          </div>
          <div className="flex flex-col gap-3 col-span-3">
            <label className="input input-bordered flex items-center gap-4">
              CRM
              <input {...register("crm")} placeholder="crm" className="grow" />
            </label>
          </div>
          <div className="flex flex-col gap-3 col-span-3">
            <label className="input input-bordered flex items-center gap-4">
              Registro
              <input
                {...register("registroProfissional")}
                placeholder="registro profissional"
                className="grow"
              />
            </label>
          </div>
        </div>
        <button
          disabled={isPendingPatch}
          type="submit"
          className="btn btn-primary font-semibold text-lg mt-6"
        >
          {isPendingPatch ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </Modal>
  );
};
export default UsuariosCreate;
