import { useForm, SubmitHandler } from "react-hook-form";
import Doctors from "../../assets/doctors.svg";

interface FormData {
  area: string;
}

const AreasCreate: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="w-full h-[100px] bg-gradient-to-r from-base-300 to-base-100 rounded-lg shadow-lg p-8 flex flex-row justify-end items-center">
        <img src={Doctors} className="mr-4 w-[60px]" />
        <h1 className="text-4xl mr-12">Área</h1>
      </div>
      <div className="flex flex-row px-10 gap-10 mt-[-10px]">
        <div className="card w-96 bg-base-100 shadow-xl p-5">
          <p className="text-info-content">
            Representa a área de atuação principal do usuário.
          </p>
        </div>
        <div className="card w-full bg-base-100 shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Área</span>
                </div>
                <input
                  {...register("area", {
                    required: "Área deve ser preenchida",
                  })}
                  className="input input-bordered input-primary w-full max-w-xs"
                />
              </label>
              <div className="text-error">
                {errors.area && <p>{errors.area.message}</p>}
              </div>
            </div>
            <input type="submit" />
          </form>
        </div>
      </div>
    </>
  );
};
export default AreasCreate;
