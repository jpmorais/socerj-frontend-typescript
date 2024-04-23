import { useState, createContext, useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Lottie from "lottie-react";
import animationLoading from "../../assets/loading.json";
import Sidebar from "../../components/Sidebar";
import { jwtDecode } from "jwt-decode";
import Usuarios, { IUsuario } from "../../models/Usuarios";

interface PainelLayoutProps {}

type ContextType = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  usuarioId: string;
  usuario?: IUsuario | null;
};

const PainelContext = createContext<ContextType>({
  isLoading: false,
  setIsLoading: () => {},
  usuarioId: "",
  usuario: null,
});

const PainelLayout: React.FC<PainelLayoutProps> = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [closedSidebar, setClosedSidebar] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [usuarioId, setUsuarioId] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    const decoded = jwtDecode(token!) as any;
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      navigate("/login");
    }
    setUsuarioId(decoded.usuario);
  }, []);

  const { isPending, error, data } = Usuarios.getUsuario(usuarioId);

  return (
    <PainelContext.Provider
      value={{ isLoading, setIsLoading, usuarioId: usuarioId, usuario: data }}
    >
      <div className="relative">
        {isLoading && (
          <div className="overlay">
            <Lottie animationData={animationLoading} loop={true} />
          </div>
        )}
      </div>
      <div data-theme={theme} className="flex flex-col min-h-screen">
        <Header
          theme={theme}
          setTheme={setTheme}
          closedSidebar={closedSidebar}
          setClosedSidebar={setClosedSidebar}
        />
        <div className="flex flex-row h-full ">
          <div
            className={`transition-all duration-500 ease-in-out w-[250px] ${
              closedSidebar && "ml-[-200px]"
            }`}
          >
            <Sidebar closed={closedSidebar} />
          </div>
          <section className="w-full">
            <Outlet />
          </section>
        </div>
      </div>
    </PainelContext.Provider>
  );
};
export default PainelLayout;

export function useDashboardContext() {
  return useContext(PainelContext);
}
