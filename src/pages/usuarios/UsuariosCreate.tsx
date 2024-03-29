import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import { useDashboardContext } from "../layouts/DashboardLayout";
import { useQueryClient } from "@tanstack/react-query";
import Usuarios, { IUsuarioPayload } from "../../models/Usuarios";

const UsuariosCreate = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, setIsLoading } = useDashboardContext();

  const onClickClose = () => {
    navigate("..");
  };

  // create evento
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
    <Modal classes="w-11/12 max-w-5xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClickClose}
        >
          ✕
        </button>
        <h2 className="font-bold text-lg my-8">Cadastrar usuário</h2>
        <div className="grid grid-cols-10 gap-x-6">
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
        </div>
        <button
          disabled={isPendingPatch}
          type="submit"
          className="btn btn-primary font-semibold text-lg"
        >
          {isPendingPatch ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </Modal>
  );
};
export default UsuariosCreate;
