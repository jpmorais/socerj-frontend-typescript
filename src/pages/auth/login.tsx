import { UserRound, LockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";
import SocerjLogo from "../../assets/socerj-logo.png";

type IAuth = {
  email?: string;
  password: string;
  cpf?: string;
};

const LoginPage = () => {
  const [usuario, setUsuario] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEmail, setIsEmail] = useState<boolean>(true);
  const [showError, setShowError] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const postData = async (data: IAuth) => {
    const response = await axios.post(`/api/v1/auth/login`, data);
    return response.data;
  };

  const onSuccess = (data: any) => {
    localStorage.setItem("token", data.token);
    navigate("/dashboard");
  };

  const onError = (data: any) => {
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 2000);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: postData,
    onSuccess: onSuccess,
    onError: onError,
  });

  const handleChangeOption = () => {
    setIsEmail(!isEmail);
    setUsuario("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email: isEmail ? usuario : undefined,
      password: password,
      cpf: isEmail ? undefined : usuario,
    };
    mutate(data);
  };

  return (
    <div
      className="flex justify-center min-h-screen items-center"
      data-theme="light"
    >
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <div className="p-6 flex flex-col gap-4 justify-center">
          <img src={SocerjLogo} alt="Socerj Logo" />
          <p>
            Não é registrado?{" "}
            <NavLink to="../register" className="text-blue underline">
              registre-se
            </NavLink>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="card-body gap-6">
            <h2 className="card-title text-3xl">Acesse o painel</h2>
            <div className="flex flex-row items-center gap-4">
              CPF{" "}
              <input
                type="checkbox"
                className="toggle"
                onChange={handleChangeOption}
                checked={isEmail}
              />{" "}
              E-mail
            </div>
            <label className="input input-bordered flex items-center gap-2">
              <UserRound />
              <InputMask
                type="text"
                className="grow bg-base-100"
                placeholder={isEmail ? "E-mail" : "CPF"}
                mask={isEmail ? "" : "999.999.999-99"}
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <LockKeyhole />
              <input
                type="password"
                className="grow bg-base-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button className="btn btn-primary">
              {isPending ? "Autenticando..." : "Login"}
            </button>
            <div className={`text-error ${showError ? "block" : "invisible"}`}>
              Usuário não encontrado ou senha inválida
            </div>
          </div>
        </form>
      </div>{" "}
    </div>
  );
};
export default LoginPage;
