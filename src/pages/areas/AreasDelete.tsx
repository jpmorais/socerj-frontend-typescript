import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Areas, { AreaPayload } from "../../models/Areas";
import { useEffect, useRef } from "react";
import Modal from "../../components/Modal";

type OutletContextType = {
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
  fetchAgain: boolean;
};

const AreasDelete = () => {
  const navigate = useNavigate();
  const { setFetchAgain } = useOutletContext<OutletContextType>();

  const onClickClose = () => {
    navigate("..");
  };

  // Get area
  const { id } = useParams();
  const { isPending: isPendingGet, error, data } = Areas.getArea(id!);

  // Delete area
  const { mutate, isPending: isPendingPatch } = Areas.deleteArea({
    onSuccess: () => {
      setFetchAgain(true);
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
          Excluir #{data?.id} | {data?.area}
        </h3>
        <div className="flex flex-col gap-3">
          <button type="submit" className="btn btn-error font-semibold text-lg">
            {isPendingPatch ? "Excluindo..." : "Excluir"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default AreasDelete;
