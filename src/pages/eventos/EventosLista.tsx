import Doctors from "../../assets/doctors.svg";
import React, { useEffect, useState } from "react";
import { useDashboardContext } from "../layouts/DashboardLayout.tsx";
import SearchInput from "../../components/SearchInput.tsx";
import Pagination from "../../components/Pagination.tsx";
import { FilePenLine, Trash2 } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import SelectPageLimit from "../../components/SelectPageLimit.tsx";
import Sort from "../../components/Sort.tsx";
import Generos from "../../models/Generos.ts";
import Patrocinadores from "../../models/Patrocinadores.ts";
import Eventos from "../../models/Eventos.ts";

const EventosLista: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [sort, setSort] = useState<string>("");

  const { isLoading, setIsLoading } = useDashboardContext();

  const { isPending, error, data, refetch } = Eventos.getAllEventos({
    filter: search,
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
      throw new Error("Falha ao buscar eventos");
    }
  }, [isPending]);

  return (
    <>
      <div className="w-full h-[100px] bg-gradient-to-r from-base-300 to-base-100 rounded-lg shadow-lg p-8 flex flex-row justify-end items-center">
        <img src={Doctors} className="mr-4 w-[60px]" />
        <h1 className="text-4xl mr-12">Eventos</h1>
      </div>
      <div className="flex flex-row px-10 gap-10 mt-[-10px]">
        <div className="card w-[100%] bg-base-100 shadow-xl p-5">
          <div className="flex flex-row justify-between gap-2 my-4 py-4 pr-24 pl-12 shadow-xl">
            <SearchInput setSearch={setSearch} prefix="evento:" />
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
                  <th className="w-1/8">#</th>
                  <th className="w-3/8 flex flex-row gap-2">
                    evento
                    <Sort sort={sort} setSort={setSort} sortBy="evento" />
                  </th>
                  <th className="w-1/8">inicio</th>
                  <th className="w-1/8">final</th>
                  <th className="w-1/8">aberto</th>
                  <th className="w-1/8">ações</th>{" "}
                </tr>
              </thead>
              <tbody>
                {data?.items?.map((evento) => (
                  <tr key={evento.id}>
                    <td>{evento.id}</td>
                    <td>{evento.evento}</td>
                    <td>{evento.inicio}</td>
                    <td>{evento.final}</td>
                    <td>{evento.aberto ? "sim" : "não"}</td>
                    <td className="flex flex-row gap-3">
                      <button>
                        <FilePenLine
                          size={20}
                          onClick={() => onClickEdit(evento.id)}
                        />
                      </button>
                      <button>
                        <Trash2
                          size={20}
                          onClick={() => onClickDelete(evento.id)}
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

export default EventosLista;
