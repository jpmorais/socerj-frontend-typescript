import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import { useEffect } from "react";
import { useDashboardContext } from "../layouts/DashboardLayout";
import toast from "react-hot-toast";
import Especialidades from "../../models/Especialidades";
import { useQueryClient } from "@tanstack/react-query";

const EspecialidadesDelete = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, setIsLoading } = useDashboardContext();

  const onClickClose = () => {
    navigate("..");
  };

  // Get area
  const { id } = useParams();
  const {
    isPending: isPendingGet,
    error,
    data,
  } = Especialidades.getEspecialidade(id!);
  useEffect(() => {
    if (isPendingGet) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    if (error) {
      throw new Error("Falha ao buscar especialidades");
    }
  }, [isPendingGet]);

  // Delete area
  const { mutate, isPending: isPendingPatch } =
    Especialidades.deleteEspecialidade({
      onSuccess: () => {
        toast.success("especialidade excluída com sucesso");
        queryClient.invalidateQueries({ queryKey: ["especialidades"] });
        navigate("..");
      },
      onError: (error: any) => {
        toast.error(
          `falha ao editar especialidade: ${error?.response?.data?.message}`
        );
        navigate("..");
      },
    });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    mutate(id!);
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClickClose}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg my-8">
          Excluir #{data?.id} | {data?.especialidade}
        </h3>
        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={isPendingPatch}
            className="btn btn-error font-semibold text-lg"
          >
            {isPendingPatch ? "Excluindo..." : "Excluir"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default EspecialidadesDelete;
