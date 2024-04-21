import { NavLink } from "react-router-dom";
import SocerjLogo from "../../assets/socerj-logo.png";

const RegistradoPage = () => {
  return (
    <div
      className="flex justify-center min-h-screen items-center"
      data-theme="light"
    >
      <div className="card w-[500px] bg-base-100 shadow-xl">
        <figure>
          <img src={SocerjLogo} alt="Socerj logo" />
        </figure>
        <div className="card-body text-center">
          <h2 className="text-2xl font-semibold">Obrigado!</h2>
          <p>Você foi registrado com sucesso no painel Socerj.</p>
          <NavLink to="../login">
            <p className="underline">Clique para ir para o login.</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default RegistradoPage;
