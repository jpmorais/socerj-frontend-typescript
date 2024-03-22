import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import { useEffect } from "react";
import { useDashboardContext } from "../layouts/DashboardLayout";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import Patrocinadores from "../../models/Patrocinadores";
import Eventos from "../../models/Eventos";

const EventosDelete = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, setIsLoading } = useDashboardContext();

  const onClickClose = () => {
    navigate("..");
  };

  // Get genero
  const { id } = useParams();
  const { isPending: isPendingGet, error, data } = Eventos.getEvento(id!);
  useEffect(() => {
    if (isPendingGet) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    if (error) {
      throw new Error("Falha ao buscar evento");
    }
  }, [isPendingGet]);

  // Delete area
  const { mutate, isPending: isPendingPatch } = Eventos.deleteEvento({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventos"] });
      toast.success("evento excluído com sucesso");
      navigate("..");
    },
    onError: (error: any) => {
      toast.error(`falha ao excluir evento: ${error?.response?.data?.message}`);
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
          Excluir #{data?.id} | {data?.evento}
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
export default EventosDelete;
