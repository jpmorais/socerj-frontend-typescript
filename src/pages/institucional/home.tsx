import { NavLink } from "react-router-dom";
import SocerjLogo from "../../assets/socerj-logo.png";

const HomePage = () => {
  return (
    <div
      className="flex flex-col gap-6 justify-center min-h-screen items-center"
      data-theme="light"
    >
      <img src={SocerjLogo} alt="Socerj logo" />
      <div className="flex flex-row gap-6">
        <NavLink to="./login">
          <button className="btn btn-primary">Login</button>
        </NavLink>
        <NavLink to="./register">
          <button className="btn btn-primary">Registro</button>
        </NavLink>
      </div>
    </div>
  );
};
export default HomePage;
