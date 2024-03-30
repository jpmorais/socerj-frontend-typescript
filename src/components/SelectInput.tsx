type Props = {
  campoId: string;
  campoNome: string;
  lista:
    | {
        items: any[];
        totalPages?: number;
      }
    | undefined;
  register: any;
  campoChave: string;
  campoValor: string;
  required?: boolean;
  defaultValue?: string | number;
};

const SelectInput = ({
  campoId,
  campoNome,
  lista,
  register,
  campoChave,
  campoValor,
  required,
  defaultValue,
}: Props) => {
  return (
    <label className="form-control w-full">
      <select
        defaultValue={defaultValue}
        className="select select-bordered w-full"
        {...register(campoId, {
          required: required ? `${campoNome} deve ser preenchido` : false,
        })}
      >
        <option value="" disabled selected>
          {campoNome}
        </option>
        {lista?.items.map((item) => {
          return (
            <option key={item[campoChave]} value={item[campoChave]}>
              {item[campoValor]}
            </option>
          );
        })}
      </select>
    </label>
  );
};
export default SelectInput;
