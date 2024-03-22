import Doctors from "../../assets/doctors.svg";
import React, { useEffect, useState } from "react";
import { useDashboardContext } from "../layouts/DashboardLayout.tsx";
import SearchInput from "../../components/SearchInput.tsx";
import Pagination from "../../components/Pagination.tsx";
import { FilePenLine, Trash2 } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import SelectPageLimit from "../../components/SelectPageLimit.tsx";
import Sort from "../../components/Sort.tsx";
import Eventos from "../../models/Eventos.ts";
import Cupons, { ICupom } from "../../models/Cupons.ts";
import Patrocinadores from "../../models/Patrocinadores.ts";

const CuponsLista: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [sort, setSort] = useState<string>("");
  const [patrocinadorId, setPatrocinadorId] = useState("");
  const [eventoId, setEventoid] = useState("");

  const { isLoading, setIsLoading } = useDashboardContext();

  // busca eventos
  const { data: eventos } = Eventos.getAllEventos({
    filter: "",
    sort: "evento:asc",
  });

  // busca patrocinadores
  const { data: patrocinadores } = Patrocinadores.getAllPatrocinadores({
    filter: "",
    sort: "patrocinador:asc",
  });

  const { isPending, error, data, refetch } = Cupons.getAllCupons({
    filter: `${patrocinadorId && `patrocinadorId=${patrocinadorId}`},${
      eventoId && `eventoId=${eventoId}`
    },${search}`,
    limit: limit,
    page: page,
    sort: sort,
  });

  const navigate = useNavigate();
  const onClickEdit = (id: number) => {
    navigate(`./edit/${id}`);
  };
  const onClickDelete = (id: number) => {
    navigate(`./delete/${id}`);
  };

  useEffect(() => {
    if (isPending) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    if (error) {
      throw new Error("Falha ao buscar cupons");
    }
  }, [isPending]);

  return (
    <>
      <div className="w-full h-[100px] bg-gradient-to-r from-base-300 to-base-100 rounded-lg shadow-lg p-8 flex flex-row justify-end items-center">
        <img src={Doctors} className="mr-4 w-[60px]" />
        <h1 className="text-4xl mr-12">Cupons</h1>
      </div>
      <div className="flex flex-row px-10 gap-10 mt-[-10px]">
        <div className="card w-[100%] bg-base-100 shadow-xl p-5">
          <div className="flex flex-row justify-between gap-2 my-4 py-4 pr-24 pl-12 shadow-xl">
            <SearchInput setSearch={setSearch} prefix="cupom:" />
            <select
              className="select select-bordered w-full"
              onChange={(e) => setPatrocinadorId(e.target.value)}
            >
              <option value="">Selecione o patrocinador</option>
              {patrocinadores?.items.map((patrocinador) => {
                return (
                  <option key={patrocinador.id} value={patrocinador.id}>
                    {patrocinador.patrocinador}
                  </option>
                );
              })}
            </select>
            <select
              className="select select-bordered w-full"
              onChange={(e) => setEventoid(e.target.value)}
            >
              <option value="">Selecione o evento</option>
              {eventos?.items.map((evento) => {
                return (
                  <option key={evento.id} value={evento.id}>
                    {evento.evento}
                  </option>
                );
              })}
            </select>
            <NavLink to="./create">
              <button className="btn btn-primary font-semibold text-lg">
                Cadastrar
              </button>
            </NavLink>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="w-1/6">#</th>
                  <th className="w-1/6 flex flex-row gap-2">
                    cupom
                    <Sort sort={sort} setSort={setSort} sortBy="cupom" />
                  </th>
                  <th className="w-1/6">evento</th>
                  <th className="w-1/6">patrocinador</th>
                  <th className="w-1/6">valor</th>
                  <th className="w-1/6">ações</th>
                </tr>
              </thead>
              <tbody>
                {data?.items?.map((cupom) => (
                  <tr key={cupom.id}>
                    <td>{cupom.id}</td>
                    <td>{cupom.cupom}</td>
                    <td>{cupom.evento?.evento}</td>
                    <td>{cupom.patrocinador?.patrocinador}</td>
                    <td>{showValorCupom(cupom)}</td>
                    <td className="flex flex-row gap-3">
                      <button>
                        <FilePenLine
                          size={20}
                          onClick={() => onClickEdit(cupom.id)}
                        />
                      </button>
                      <button>
                        <Trash2
                          size={20}
                          onClick={() => onClickDelete(cupom.id)}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-row mt-6 mb-12 justify-between mr-24">
            <Pagination
              clickPrevious={() => setPage(page - 1)}
              clickNext={() => setPage(page + 1)}
              page={page}
              totalPages={data?.totalPages || 0}
            />
            <SelectPageLimit
              limit={limit}
              setLimit={setLimit}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default CuponsLista;

function showValorCupom(cupom: ICupom) {
  if (cupom.valorDesconto) {
    return `R$ ${cupom.valorDesconto}`;
  } else {
    return `${cupom.percDesconto}%`;
  }
}
