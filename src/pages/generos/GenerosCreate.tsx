import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import Generos, { IGeneroPayload } from "../../models/Generos";

const GenerosCreate: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IGeneroPayload>();

  const { mutate, isPending } = Generos.createGenero({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["generos"] });
      toast.success("gênero criado com sucesso");
      reset();
      navigate(".");
    },
    onError: (error: any) => {
      toast.error(`falha ao criar gênero: ${error?.response?.data?.message}`);
      reset();
    },
  });

  const onSubmit: SubmitHandler<IGeneroPayload> = async (data) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row gap-2">
      <div>
        <input
          {...register("genero", {
            required: "Área deve ser preenchida",
          })}
          className="input input-bordered w-[300px]"
          placeholder="Gênero"
        />
        <div className="text-error">
          {errors.genero && <p>{errors.genero.message}</p>}
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
export default GenerosCreate;
