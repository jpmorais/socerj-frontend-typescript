import React, { useRef } from "react";
import { Search } from "lucide-react";

type Props = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const SearchInput = ({ setSearch }: Props) => {
  const refSearch = useRef<HTMLInputElement>(null);
  const refIcon = useRef<SVGSVGElement>(null);

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearch(refSearch.current?.value ?? "");
    }
  };

  return (
    <label className="input input-bordered flex items-center gap-2 w-[400px]">
      <input
        type="text"
        className="grow"
        placeholder="Search"
        ref={refSearch}
        onKeyDown={handleSearch}
      />
      <button
        onClick={() => {
          setSearch(refSearch.current?.value ?? "");
        }}
      >
        <Search size={20} ref={refIcon} />
      </button>
    </label>
  );
};
export default SearchInput;
