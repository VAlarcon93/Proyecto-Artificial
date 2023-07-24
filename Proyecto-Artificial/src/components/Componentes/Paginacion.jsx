export const Paginacion = ({
  dataPage,
  currentPage,
  setCurrentPage,
  totalData,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalData/ dataPage); i++) {
    pageNumbers.push(i);
  }

  //mover botones anterior y siguiente
  const onPrevPage = () => {
    if(currentPage === 1){
        setCurrentPage(1);
    }else{
    setCurrentPage(currentPage - 1);}
  };

  const onNextPage = () => {
    if(currentPage >= pageNumbers.length){
        setCurrentPage(pageNumbers.length);
    } else
    {setCurrentPage(currentPage + 1);}
  };

  const onSpecificpage = (n) => {
    setCurrentPage(n);
  };

  return (
    <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
      <div className="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200">
        <button
          className={
            "flex items-center pt-3 text-black hover:text-black cursor-pointer ${...currentPage <= 1 ? 'invisible'' : ' '}"
          }
          onClick={onPrevPage}
        >
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.1665 4H12.8332"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.1665 4L4.49984 7.33333"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.1665 4.00002L4.49984 0.666687"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-sm ml-3 font-medium leading-none text-black hover:text-black ">
            Anterior
          </p>
        </button>
        <div className="sm:flex hidden text-black">
          {pageNumbers.map((numeroPagina) => (
            <button
              key={numeroPagina}
              className={
                "items-center hidden px-4 py-2 mx-1 text-black transition-colors duration-300 transform bg-white bg-opacity-25 rounded-md sm:flex  hover:bg-black hover:text-white ${numeroPagina === currentPage ? 'fill-current' : '' "
              }
              onClick={() => onSpecificpage(numeroPagina)}
            >
              {numeroPagina}
            </button>
          ))}
        </div>
        <button
          className={
            "flex items-center pt-3 text-black hover:text-black  cursor-pointer ${ currentPage >= pageNumbers.length ? 'hidden' : ''}"
          }
          onClick={onNextPage}
        >
          <p className="text-sm font-medium leading-none mr-3 hover:text-black  ">Siguiente</p>
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.1665 4H12.8332"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.5 7.33333L12.8333 4"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.5 0.666687L12.8333 4.00002"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
