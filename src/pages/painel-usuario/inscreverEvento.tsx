import { useNavigate, useParams } from "react-router-dom";
import Eventos from "../../models/Eventos";
import { useDashboardContext } from "../layouts/DashboardLayout";
import CategoriasInscricao from "../../models/CategoriaInscricao";
import { formatarParaDinheiro } from "../../utils/funcoes";
import Doctors from "../../assets/doctors.svg";
import Inscricoes, { IInscricaoPayload } from "../../models/Inscricoes";
import toast from "react-hot-toast";
import { tipoInscricao } from "../../utils/data";
import { TipoInscricao } from "../../types/types";

const InscreverEventoPage = () => {
  const { usuario } = useDashboardContext();
  const navigate = useNavigate();

  // Get evento
  const { id } = useParams();
  const {
    isPending: isPendingGet,
    error,
    data: evento,
  } = Eventos.getEvento(id!);

  // Get categoria inscrição
  const {
    isPending: isPendingCategoria,
    error: errorCategoria,
    data: categoriaInscricao,
  } = CategoriasInscricao.getAllCateriasIncricao(
    {
      filter: `categoriaId=${usuario?.categoriaId},eventoId=${id}`,
    },
    usuario ? true : false
  );

  const { mutate, isPending: isPendingPatch } = Inscricoes.createInscricao({
    onSuccess: () => {
      toast.success("inscrição criado com sucesso");
      navigate("..");
    },
    onError: (error: any) => {
      toast.error(
        `falha ao criar inscrição: ${error?.response?.data?.message}`
      );
      navigate("..");
    },
  });

  const handleInscricao = () => {
    const data = {
      eventoId: parseInt(id!),
      usuarioId: usuario?.id!,
      dataInscricao: new Date().toISOString(),
      tipoInscricao: "PARTICIPANTE",
    };
    console.log(data);
    mutate(data);
  };

  return (
    <div>
      <div className="w-full h-[100px] bg-gradient-to-r from-base-300 to-base-100 rounded-lg shadow-lg p-8 flex flex-row justify-end items-center">
        <img src={Doctors} className="mr-4 w-[60px]" />
        <h1 className="text-4xl mr-12">Eventos</h1>
      </div>
      <div className="card max-w-2xl m-10 mx-auto bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="text-xl mx-auto font-semibold">{evento?.evento}</div>
          <div>Sua categoria: {usuario?.categoria?.categoria}</div>
          <div>
            {formatarParaDinheiro(
              categoriaInscricao?.items[0].valor.toString()!
            )}
          </div>
          <p className="text-error">
            Cupons poderão ser adicionados no momento do pagamento
          </p>
          <button
            onClick={handleInscricao}
            className="btn btn-primary font-semibold text-lg"
          >
            Inscrever
          </button>
        </div>
      </div>{" "}
    </div>
  );
};
export default InscreverEventoPage;
