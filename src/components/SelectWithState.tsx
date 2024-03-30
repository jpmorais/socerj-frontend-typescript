type Props = {
  lista: {
    chave: string | number;
    valor: string;
  }[];
  state: string | number;
  setState: any;
  padrao: string;
};

const SelectWithState = ({ lista, state, setState, padrao }: Props) => {
  return (
    <select
      value={state}
      onChange={(e) => setState(e.target.value)}
      className="select select-bordered w-full max-w-xs"
    >
      <option disabled>{padrao}</option>
      {lista.map((item) => {
        return (
          <option key={item.chave} value={item.valor}>
            {item.valor}
          </option>
        );
      })}
    </select>
  );
};
export default SelectWithState;
