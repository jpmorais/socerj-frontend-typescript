import { GraduationCap, Stethoscope, PersonStanding } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const pages = [
  {
    link: "areas",
    text: "áreas",
    icon_lg: <GraduationCap size={32} />,
    icon_sm: <GraduationCap size={24} />,
  },
  {
    link: "especialidades",
    text: "especialidades",
    icon_lg: <Stethoscope size={32} />,
    icon_sm: <Stethoscope size={24} />,
  },
  {
    link: "generos",
    text: "generos",
    icon_lg: <PersonStanding size={32} />,
    icon_sm: <PersonStanding size={24} />,
  },
];

const Sidebar = ({ closed }: { closed: boolean }) => {
  return (
    <div className="relative">
      <div
        className={`transition-opacity duration-500 ${
          closed ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 items-end mr-2 mt-8">
          {pages.map((item) => {
            return (
              <Link
                to={item.link}
                className="flex flex-row gap-4 font-semibold text-lg items-center"
              >
                {item.icon_lg}
              </Link>
            );
          })}
        </div>
      </div>
      <div
        className={`transition-opacity duration-500 ${
          closed ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex flex-col gap-4 mx-4 absolute top-0 left-0">
          {pages.map((item) => {
            return (
              <Link
                to={item.link}
                className="flex flex-row gap-4 font-semibold text-lg items-center"
              >
                {item.icon_sm} {item.text}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
