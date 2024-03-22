import React, { useRef } from "react";
import { Search } from "lucide-react";

type Props = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  prefix: string;
};

const SearchInput = ({ setSearch, prefix }: Props) => {
  const refSearch = useRef<HTMLInputElement>(null);
  const refIcon = useRef<SVGSVGElement>(null);

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && refSearch.current?.value) {
      setSearch(`${prefix}${refSearch.current?.value}`);
    }
  };

  return (
    <label className="input input-bordered flex items-center gap-2 w-[400px]">
      <input
        type="text"
        className="grow bg-base-100"
        placeholder="Search"
        ref={refSearch}
        onKeyDown={handleSearch}
      />
      <button
        onClick={() => {
          setSearch(`${prefix}${refSearch.current?.value}`);
        }}
      >
        <Search size={20} ref={refIcon} />
      </button>
    </label>
  );
};
export default SearchInput;
