import React, { Dispatch, SetStateAction } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useDashboardContext } from "../pages/layouts/DashboardLayout";
import UserMenu from "../components/UserMenu";
import Avatar from "./Avatar";

interface HeaderProps {
  theme: string;
  setTheme: Dispatch<SetStateAction<any>>;
  closedSidebar: boolean;
  setClosedSidebar: Dispatch<SetStateAction<any>>;
}

const Header: React.FC<HeaderProps> = ({
  theme,
  setTheme,
  closedSidebar,
  setClosedSidebar,
}) => {
  const { usuario } = useDashboardContext();

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
    } else {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <div className="navbar bg-base-100 w-full flex flex-row justify-between">
      <div className="flex flex-row align-middle">
        <h1 className="text-4xl font-bold text-blue-500 tracking-wider mb-3">
          SOCERJ
        </h1>
        <div className="ml-8">
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              onClick={() => setClosedSidebar(!closedSidebar)}
            />
            <Menu className="swap-off" />
            <X className="swap-on" />
          </label>{" "}
        </div>
      </div>
      <div>
        <div className="flex flex-row gap-6 items-center">
          <UserMenu>
            <Avatar letter={usuario?.nome?.charAt(0)} />
          </UserMenu>
          <label className="swap swap-rotate">
            <input type="checkbox" onClick={changeTheme} />
            <Sun className="swap-off" />
            <Moon className="swap-on" />
          </label>{" "}
        </div>
      </div>
    </div>
  );
};
export default Header;
