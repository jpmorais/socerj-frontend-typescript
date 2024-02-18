import { useForm, SubmitHandler } from "react-hook-form";
import Areas, { AreaPayload } from "../../models/Areas";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const AreasCreate: React.FC = () => {
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AreaPayload>();

  const { mutate, isPending, isSuccess } = Areas.createArea({
    onSuccess: () => {
      navigate(".");
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
  });

  const onSubmit: SubmitHandler<AreaPayload> = async (data) => {
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
          ref={inputRef}
        />
        <div className="text-error">
          {errors.area && <p>{errors.area.message}</p>}
        </div>
      </div>
      <button type="submit" className="btn btn-primary font-semibold text-lg">
        {isPending ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
};
export default AreasCreate;
