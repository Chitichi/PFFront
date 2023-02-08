import React from "react";
import style from "../components/Pagination.module.css";

const Paginate = ({ booksPerPage, allBooks, pagination }) => {
  const pageNumbers = [];
  
  for (let i = 0; i < Math.ceil(allBooks.length / booksPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav>
      <ul className={style.ul}>
        {pageNumbers.map((number) => (
          <p key={number}>
            <button className="btn btn-outline-dark btn-lg" onClick={() => pagination(number)}>
              {number}
            </button>
          </p>
        ))}
      </ul>
    </nav>
  );
};

export default Paginate;
