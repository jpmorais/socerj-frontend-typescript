import CardEvento from "../../components/CardEvento";
import Eventos from "../../models/Eventos";
import SocerjLogo from "../../assets/socerj-logo.png";
import Doctors from "../../assets/doctors.svg";
import { useDashboardContext } from "../layouts/DashboardLayout";
import Inscricoes from "../../models/Inscricoes";
import SearchInput from "../../components/SearchInput";
import { NavLink } from "react-router-dom";
import Sort from "../../components/Sort";
import Pagination from "../../components/Pagination";
import { formatarParaDinheiro } from "../../utils/funcoes";

const ListaInscricoesPage = () => {
  const { usuario } = useDashboardContext();

  // Pega eventos que o usuário está inscrito
  const { data: inscricoes } = Inscricoes.getInscricoesByUser(
    usuario?.id!,
    usuario?.id ? true : false
  );

  return (
    <>
      <div className="w-full h-[100px] bg-gradient-to-r from-base-300 to-base-100 rounded-lg shadow-lg p-8 flex flex-row justify-end items-center">
        <img src={Doctors} className="mr-4 w-[60px]" />
        <h1 className="text-4xl mr-12">Inscrições</h1>
      </div>
      <div className="flex flex-row px-10 gap-10 mt-[-10px]">
        <div className="card w-[100%] bg-base-100 shadow-xl p-5">
          <div className="flex flex-row justify-between gap-2 my-4 py-4 pr-24 pl-12 shadow-xl"></div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="w-1/12">#</th>
                  <th className="w-4/12 flex flex-row gap-2">evento</th>
                  <th className="w-2/12">valor</th>
                  <th className="w-1/12">status pgt.</th>
                  <th className="w-1/12">confirmado</th>
                  <th className="w-3/12">ações</th>{" "}
                </tr>
              </thead>
              <tbody>
                {inscricoes?.items?.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.evento?.evento}</td>
                    <td>{formatarParaDinheiro(item.valor as string)}</td>
                    <td>{item.statusPagamento}</td>
                    <td>{item.confirmado ? "sim" : "não"}</td>
                    <td className="flex flex-row gap-3">
                      <button className="btn btn-primary">Pagar</button>
                      <button className="btn btn-error">Cancelar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default ListaInscricoesPage;
