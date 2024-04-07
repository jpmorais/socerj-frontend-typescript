import { UserRound, LockKeyhole } from "lucide-react";
import { useState } from "react";
import InputMask from "react-input-mask";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

type IAuth = {
  email?: string;
  password: string;
  cpf?: string;
};

const LoginPage = () => {
  const [usuario, setUsuario] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEmail, setIsEmail] = useState<boolean>(true);

  const postData = async (data: IAuth) => {
    const response = await axios.post(`/api/v1/auth/login`, data);
    return response.data;
  };

  const onSuccess = (data: any) => {
    console.log(data);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: postData,
    onSuccess: onSuccess,
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
    console.log(data);
    mutate(data);
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
            alt="Album"
          />
        </figure>
        <form onSubmit={handleSubmit}>
          <div className="card-body gap-4">
            <h2 className="card-title">Acesse o painel</h2>
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
          </div>
        </form>
      </div>{" "}
    </div>
  );
};
export default LoginPage;
