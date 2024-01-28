import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

interface DashboardLayoutProps {}

const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  const [theme, setTheme] = useState("dark");
  const [closedSidebar, setClosedSidebar] = useState(false);

  return (
    <div data-theme={theme} className="flex flex-col h-screen">
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
          Sidebar
        </div>
        <section className="w-full bg-base-200">
          <Outlet />
        </section>
      </div>
    </div>
  );
};
export default DashboardLayout;
