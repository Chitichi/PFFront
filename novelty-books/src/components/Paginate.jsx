import React from 'react'
import s from "../components/Pagination.module.css"

const Paginate = ({booksPerPage, allBooks, pagination}) => {
  const pageNumbers = [];
console.log(allBooks)
  for (let i = 0; i < Math.ceil(allBooks.length / booksPerPage); i++) {
    pageNumbers.push(i + 1);

  }
 
  

  return (
    <nav>
      <ul className={s.ul}>
        {
          pageNumbers.map((number) => (
            <p key={number}>
              <button className={s.number} onClick={() => pagination(number)}>
                {number}
              </button>
            </p>
          ))
        }
      </ul>
    </nav>
  );
};

export default Paginate;
