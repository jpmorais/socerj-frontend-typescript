type Props = {
  clickNext: any;
  clickPrevious: any;
  page: number;
  totalPages: number;
};

const Pagination = ({ clickNext, clickPrevious, page, totalPages }: Props) => {
  return (
    <div className="join">
      <button
        className={`join-item btn ${page === 1 && "btn-disabled"}`}
        onClick={clickPrevious}
      >
        «
      </button>
      <button className="join-item btn">Página {page}</button>
      <button
        className={`join-item btn ${totalPages === page && "btn-disabled"}`}
        onClick={clickNext}
      >
        »
      </button>
    </div>
  );
};
export default Pagination;
