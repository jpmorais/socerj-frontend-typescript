import { useEffect, useState } from "react";
import SocerjLogo from "../../assets/socerj-logo.png";
import SelectInput from "../../components/SelectInput";
import Categorias from "../../models/Categorias";
import Usuarios, { IUsuarioPayload } from "../../models/Usuarios";
import { useForm, SubmitHandler } from "react-hook-form";
import InputMask from "react-input-mask";
import Generos from "../../models/Generos";
import { useQueryClient } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [enabledButton, setEnabledButton] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // create usuario
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUsuarioPayload>();

  const password = watch("password");

  // busca generos
  const { data: generos, isPending: isPendingGenero } = Generos.getAllGeneros({
    filter: "",
    sort: "genero:desc",
  });

  // busca categorias
  const { data: categorias, isPending: isPendingCategoria } =
    Categorias.getAllCategorias({
      filter: "",
      sort: "categoria:desc",
    });

  const { mutate, isPending: isPendingPatch } = Usuarios.createUsuario({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
      navigate("/registrado");
    },
    onError: (error: any) => {
      setErrorMessage("Falha ao realizar o registro.");
    },
  });

  const onSubmit: SubmitHandler<IUsuarioPayload> = async (data) => {
    mutate(data);
  };

  return (
    <div
      className="flex justify-center min-h-screen items-center"
      data-theme="light"
    >
      <div className="card lg:card-side bg-base-100 shadow-xl lg:w-[800px]">
        <div className="p-6 flex flex-col gap-4 justify-center lg:w-[350px]">
          <img src={SocerjLogo} alt="Socerj Logo" />
          <p>
            Já é registrado?{" "}
            <NavLink to="../login" className="text-blue underline">
              faça login
            </NavLink>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="card-body gap-2 w-full">
            <h1 className="text-2xl font-semibold">Registre-se na socerj</h1>
            <div className="flex flex-col gap-3">
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
            <div className="flex flex-col gap-3">
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
                {errors.nome && <p>{errors.nome.message}</p>}
              </div>
            </div>
            <div className="flex flex-col gap-3 max-w-[300px]">
              <label className="input input-bordered flex items-center gap-2">
                Password
                <input
                  {...register("password", {
                    required: "Password deve ser preenchido",
                  })}
                  type="password"
                  className="grow"
                />
              </label>
              <div className="text-error">
                {errors.password && <p>{errors.password.message}</p>}
              </div>
            </div>
            <div className="flex flex-col gap-3 ">
              <label className="input input-bordered flex items-center gap-2">
                Confirma password
                <input
                  {...register("confirmaPassword", {
                    required: "Confirmar Password deve ser preenchido",
                    validate: (value) =>
                      value === password || "As senhas não coincidem",
                  })}
                  type="password"
                  className="grow"
                />
              </label>
              <div className="text-error">
                {errors.confirmaPassword && (
                  <p>{errors.confirmaPassword.message}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-3 max-w-[300px]">
              <label className="input input-bordered flex items-center gap-2">
                CPF
                <InputMask
                  {...register("cpf")}
                  placeholder="cpf (opcional para estrangeiros)"
                  className="grow"
                  mask="999.999.999-99"
                />
              </label>
              <div className="text-error">
                <p></p>
              </div>
            </div>
            <div className="flex flex-col gap-3 max-w-[300px]">
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
            </div>
            <div className="flex flex-col gap-3 max-w-[300px]">
              <div>
                <SelectInput
                  campoId="categoriaId"
                  campoNome="Categoria"
                  register={register}
                  lista={categorias}
                  campoChave="id"
                  campoValor="categoria"
                  required={true}
                />
              </div>
            </div>
            <button
              className="btn btn-primary"
              disabled={isPendingCategoria || isPendingGenero}
            >
              Enviar
            </button>
            <div className="text-danger">{errorMessage}</div>
          </div>
        </form>
      </div>{" "}
    </div>
  );
};
export default RegisterPage;
