import { useState } from "react";

interface PaginationProps {
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
}

const PAGES_NUMBERS = 6;

const Pagination: React.FC<PaginationProps> = ({
  postsPerPage,
  totalPosts,
  paginate,
}) => {
  const pageNumbers: number[] = [];
  const [pagesOffset, setPagesOffset] = useState(0);
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <div className="flex w-full">
        <button
          onClick={() => {
            setPagesOffset((prev) => {
              if (prev <= 0) return prev;
              return prev - 1;
            });
          }}
          className="bg-blue-100 cursor-pointer text-blue-400 border-blue-400 border-2 rounded-md px-4"
        >
          {"<"}
        </button>
        <ul className="flex w-[60%] m-auto">
          {pageNumbers.map((number, index: number) => {
            if (number === pagesOffset + 2 && pagesOffset > 0)
              return (
                <>
                  <li
                    key={number + 1}
                    className="w-[9.5%] bg-blue-100 cursor-pointer ml-2 text-center text-blue-400 border-blue-400 border-2 rounded-md"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <a href="#!">...</a>
                  </li>
                </>
              );
            if (
              number === PAGES_NUMBERS + pagesOffset + 1 &&
              pagesOffset + PAGES_NUMBERS + 2 < pageNumbers.length - 1
            )
              return (
                <>
                  <li
                    key={number}
                    className="w-[9.5%] bg-blue-100 cursor-pointer ml-2 text-center text-blue-400 border-blue-400 border-2 rounded-md"
                    onClick={(e) => {
                      e.preventDefault();
                      paginate(number);
                      setPagesOffset(() => {
                        console.log({ index });
                        if (index + PAGES_NUMBERS + 2 >= pageNumbers.length)
                          return pageNumbers.length - 3 - PAGES_NUMBERS;
                        if (!index) return 0;
                        return index - 2;
                      });
                    }}
                  >
                    <a href="#!">{number}</a>
                  </li>
                  <li
                    key={number + 1}
                    className="w-[9.5%] bg-blue-100 cursor-pointer ml-2 text-center text-blue-400 border-blue-400 border-2 rounded-md"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <a href="#!">...</a>
                  </li>
                </>
              );
            const addLast =
              pagesOffset + PAGES_NUMBERS + 2 >= pageNumbers.length - 1 ? 2 : 0;
            if (
              index === pageNumbers.length - 1 ||
              index === 0 ||
              (number <= PAGES_NUMBERS + pagesOffset + addLast &&
                number - 1 > pagesOffset)
            )
              return (
                <li
                  key={number}
                  className="w-[9.5%] bg-blue-100 cursor-pointer ml-2 text-center text-blue-400 border-blue-400 border-2 rounded-md"
                  onClick={(e) => {
                    e.preventDefault();
                    paginate(number);
                    setPagesOffset(() => {
                      console.log({ index });
                      if (index + PAGES_NUMBERS + 2 >= pageNumbers.length)
                        return pageNumbers.length - 3 - PAGES_NUMBERS;
                      if (!index) return 0;
                      return index - 2;
                    });
                  }}
                >
                  <a href="#!">{number}</a>
                </li>
              );
          })}
        </ul>
        <button
          onClick={() => {
            setPagesOffset((prev) => {
              if (prev + PAGES_NUMBERS + 2 >= pageNumbers.length - 1)
                return prev;
              return prev + 1;
            });
          }}
          className="bg-blue-100  cursor-pointer text-blue-400 border-blue-400 border-2 rounded-md px-4"
        >
          {">"}
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
