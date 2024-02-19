import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Areas, { IAreaPayload } from "../../models/Areas";
import { useEffect, useRef } from "react";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import { useDashboardContext } from "../layouts/DashboardLayout";

type OutletContextType = {
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
  fetchAgain: boolean;
};

const AreasEdit = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { setFetchAgain } = useOutletContext<OutletContextType>();
  const { isLoading, setIsLoading } = useDashboardContext();

  const onClickClose = () => {
    navigate("..");
  };

  // Get area
  const { id } = useParams();
  const { isPending: isPendingGet, error, data, refetch } = Areas.getArea(id!);
  useEffect(() => {
    if (isPendingGet) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    if (error) {
      throw new Error("Falha ao buscar áreas");
    }
  }, [isPendingGet]);

  useEffect(() => {
    refetch();
  }, [data]);

  // Patch area
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAreaPayload>();

  const { mutate, isPending: isPendingPatch } = Areas.updateArea({
    onSuccess: () => {
      setFetchAgain(true);
      toast.success("área editada com sucesso");
      navigate("..");
    },
    onError: (error: any) => {
      toast.error(`falha ao editar área: ${error?.response?.data?.message}`);
      navigate("..");
    },
  });

  useEffect(() => {
    refetch();
  });

  const onSubmit: SubmitHandler<IAreaPayload> = async (data) => {
    mutate({
      id: parseInt(id!),
      area: data.area,
    });
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClickClose}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg my-8">
          Editar #{data?.id} | {data?.area}
        </h3>
        <div className="flex flex-col gap-3">
          <input
            {...register("area", {
              required: "Área deve ser preenchida",
            })}
            className="input input-bordered w-full"
            defaultValue={data?.area}
          />
          <div className="text-error">
            {errors.area && <p>{errors.area.message}</p>}
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
export default AreasEdit;
