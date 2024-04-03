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
  onChange?: any;
  disabled?: boolean;
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
  onChange,
  disabled,
}: Props) => {
  return (
    <label className="form-control w-full">
      <select
        disabled={disabled}
        defaultValue={defaultValue}
        className="select select-bordered w-full"
        {...register(campoId, {
          onChange: onChange,
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
