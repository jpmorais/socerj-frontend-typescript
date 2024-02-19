import { useState, createContext, useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Lottie from "lottie-react";
import animationLoading from "../../assets/loading.json";
import Sidebar from "../../components/Sidebar";

interface DashboardLayoutProps {}

type ContextType = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardContext = createContext<ContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [closedSidebar, setClosedSidebar] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
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
            <DashboardContext.Provider value={{ isLoading, setIsLoading }}>
              <Outlet />
            </DashboardContext.Provider>
          </section>
        </div>
      </div>
    </>
  );
};
export default DashboardLayout;

export function useDashboardContext() {
  return useContext(DashboardContext);
}
