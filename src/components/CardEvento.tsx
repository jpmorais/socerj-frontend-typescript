import { NavLink } from "react-router-dom";
import { ISOToDate } from "../utils/funcoes";

type Props = {
  evento: {
    id: number;
    nome: string;
    image: string;
    inicio: string;
    final: string;
    aberto: boolean;
    texto?: string;
  };
};

const CardEvento = ({
  evento: { nome, image, inicio, final, aberto, texto, id },
}: Props) => {
  return (
    <div className="card w-80 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt={nome} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{nome}</h2>
        <div className="flex flex-row gap-2">
          <div className="text-sm">
            {ISOToDate(inicio)} - {ISOToDate(final)}
          </div>

          {aberto ? (
            <div className="badge badge-primary">ABERTO</div>
          ) : new Date(inicio).getTime() > Date.now() ? (
            <div className="badge badge-secondary">BREVE</div>
          ) : (
            <div className="badge badge-error">ENCERRADO</div>
          )}
        </div>
        <p className="text-base-content text-sm p-2">{texto}</p>
        <div className="card-actions justify-end">
          {aberto && new Date(inicio).getTime() > Date.now() && (
            <NavLink to={`../inscrever/${id}`}>
              <button className="btn btn-primary text-lg font-semibold">
                Inscrever
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};
export default CardEvento;
