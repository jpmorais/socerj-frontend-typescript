import { ArrowDownFromLine, ArrowUpFromLine } from "lucide-react";

type Props = {
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
};
const Sort = ({ sort, setSort, sortBy }: Props) => {
  const sortArray = sort.split(":");
  let sortDirection;
  if (sortArray.length == 1) {
    sortDirection = "asc";
  } else {
    sortDirection = sortArray[1];
  }

  return (
    <>
      {sortDirection == "asc" && (
        <button onClick={() => setSort(`${sortBy}:desc`)}>
          <ArrowDownFromLine size={16} />
        </button>
      )}
      {sortDirection == "desc" && (
        <button onClick={() => setSort(`${sortBy}:asc`)}>
          <ArrowUpFromLine size={16} />
        </button>
      )}
    </>
  );
};
export default Sort;
