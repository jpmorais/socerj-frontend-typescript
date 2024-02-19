import { useForm, SubmitHandler } from "react-hook-form";
import Areas, { IAreaPayload } from "../../models/Areas";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AreasCreate: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAreaPayload>();

  const { mutate, isPending } = Areas.createArea({
    onSuccess: () => {
      toast.success("área criada com sucesso");
      reset();
      navigate(".");
    },
    onError: (error: any) => {
      toast.error(`falha ao criar área: ${error?.response?.data?.message}`);
      reset();
    },
  });

  const onSubmit: SubmitHandler<IAreaPayload> = async (data) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row gap-2">
      <div>
        <input
          {...register("area", {
            required: "Área deve ser preenchida",
          })}
          className="input input-bordered w-[300px]"
          placeholder="Área"
        />
        <div className="text-error">
          {errors.area && <p>{errors.area.message}</p>}
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
export default AreasCreate;
