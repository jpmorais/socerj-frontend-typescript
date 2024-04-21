import CardEvento from "../../components/CardEvento";
import Eventos from "../../models/Eventos";
import SocerjLogo from "../../assets/socerj-logo.png";
import Doctors from "../../assets/doctors.svg";

const ListaEventosPage = () => {
  const {
    isPending,
    error,
    data: eventos,
    refetch,
  } = Eventos.getAllEventos({
    sort: "final:desc",
  });

  return (
    <div>
      <div className="w-full h-[100px] bg-gradient-to-r from-base-300 to-base-100 rounded-lg shadow-lg p-8 flex flex-row justify-end items-center">
        <img src={Doctors} className="mr-4 w-[60px]" />
        <h1 className="text-4xl mr-12">Eventos</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-12">
        {" "}
        {eventos?.items.map((item) => {
          return (
            <CardEvento
              key={item.id}
              evento={{
                id: item.id,
                nome: item.evento,
                image: item.imagem || SocerjLogo,
                inicio: item.inicio,
                final: item.final,
                aberto: item.aberto,
                texto: item.texto,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
export default ListaEventosPage;
