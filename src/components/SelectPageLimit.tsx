import React from "react";

type Props = {
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const itemsLimite = [5, 10, 20, 50];

const SelectPageLimit = ({ limit, setLimit, setPage }: Props) => {
  const handleSelect = (e: any) => {
    setPage(1);
    setLimit(e.target.value);
  };

  return (
    <select
      value={limit}
      onChange={handleSelect}
      className="select select-bordered w-full max-w-xs"
    >
      <option disabled>Quantidade</option>
      {itemsLimite.map((item) => {
        return (
          <option key={item} value={item}>
            {item}
          </option>
        );
      })}
    </select>
  );
};
export default SelectPageLimit;
