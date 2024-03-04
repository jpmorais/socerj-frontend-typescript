import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Especialidades, {
  IEspecialidadePayload,
} from "../../models/Especialidades";
import { useQueryClient } from "@tanstack/react-query";

const EspecialidadesCreate: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IEspecialidadePayload>();

  const { mutate, isPending } = Especialidades.createEspecialidade({
    onSuccess: () => {
      toast.success("especialidade criada com sucesso");
      queryClient.invalidateQueries({ queryKey: ["especialidades"] });
      reset();
      navigate(".");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(
        `falha ao criar especialidade: ${error?.response?.data?.message}`
      );
      reset();
    },
  });

  const onSubmit: SubmitHandler<IEspecialidadePayload> = async (data) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row gap-2">
      <div>
        <input
          {...register("especialidade", {
            required: "Especialidade deve ser preenchida",
          })}
          className="input input-bordered w-[300px]"
          placeholder="Especialidade"
        />
        <div className="text-error">
          {errors.especialidade && <p>{errors.especialidade.message}</p>}
        </div>
      </div>
      <button
        disabled={isPending}
        type="submit"
        className="btn btn-primary font-semibold text-lg"
      >
        {isPending ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
};
export default EspecialidadesCreate;
