import Doctors from "../../assets/doctors.svg";
import React, { useEffect, useState } from "react";
import Areas from "../../models/Areas.ts";
import { useDashboardContext } from "../layouts/DashboardLayout.tsx";
import SearchInput from "../../components/SearchInput.tsx";
import Pagination from "../../components/Pagination.tsx";
import AreasCreate from "./AreasCreate.tsx";
import { FilePenLine, Trash2 } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import SelectPageLimit from "../../components/SelectPageLimit.tsx";

const AreasLista: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const [fetchAgain, setFetchAgain] = useState<boolean>(false);

  const { isLoading, setIsLoading } = useDashboardContext();

  const { isPending, error, data, refetch } = Areas.getAllAreas({
    filter: `area:${search}`,
    limit: limit,
    page: page,
  });

  const navigate = useNavigate();
  const onClickEdit = (id: number) => {
    navigate(`./edit/${id}`);
  };
  const onClickDelete = (id: number) => {
    navigate(`./delete/${id}`);
  };

  useEffect(() => {
    fetchAgain && refetch();
    setFetchAgain(false);
  }, [fetchAgain]);

  useEffect(() => {
    if (isPending) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    if (error) {
      throw new Error("Falha ao buscar áreas");
    }
  }, [isPending]);

  return (
    <>
      <div className="w-full h-[100px] bg-gradient-to-r from-base-300 to-base-100 rounded-lg shadow-lg p-8 flex flex-row justify-end items-center">
        <img src={Doctors} className="mr-4 w-[60px]" />
        <h1 className="text-4xl mr-12">Área</h1>
      </div>
      <div className="flex flex-row px-10 gap-10 mt-[-10px]">
        <div className="card w-[100%] bg-base-100 shadow-xl p-5">
          <div className="flex flex-row justify-between gap-2 my-4 py-4 pr-64 pl-12 shadow-xl">
            <SearchInput setSearch={setSearch} />
            <AreasCreate />
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="w-1/6">#</th>
                  <th className="w-4/6">área</th>
                  <th className="w-1/6">actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.items?.map((area) => (
                  <tr key={area.id}>
                    <td>{area.id}</td>
                    <td>{area.area}</td>
                    <td className="flex flex-row gap-3">
                      <button>
                        <FilePenLine
                          size={20}
                          onClick={() => onClickEdit(area.id)}
                        />
                      </button>
                      <button>
                        <Trash2
                          size={20}
                          onClick={() => onClickDelete(area.id)}
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
            <SelectPageLimit limit={limit} setLimit={setLimit} />
          </div>
        </div>
      </div>
      <Outlet context={{ setFetchAgain }} />
    </>
  );
};

export default AreasLista;
