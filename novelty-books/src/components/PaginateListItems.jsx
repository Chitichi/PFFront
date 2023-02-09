import React from "react";

const PaginateListItems = ({ current, itemPerPage, allItems, move }) => {
  const nextValue =
    current + itemPerPage > allItems ? allItems : current + itemPerPage;
  return (
    <div className="container text-center m-2">
      <div className="row justify-content-end">
        
        <div className="col-4">
          {current > 1 ? (
            <button className="btn btn-outline-dark " type="button" onClick={move} value="<" ><i class="bi bi-arrow-left"></i></button>
          ) : (
            <button className="btn btn-outline-dark " type="button" onClick={move} value="<" disabled ><i class="bi bi-arrow-left"></i></button>
          )}
        </div>
         <div className="col-4">
            <h2>
              {current + 1} - {nextValue} of {allItems}
            </h2>
          </div>
        <div className="col-4">
          {nextValue === allItems ? (
            <button className="btn btn-outline-dark " type="button" onClick={move} value=">" disabled ><i class="bi bi-arrow-right"></i></button>
          ) : (
            <button className="btn btn-outline-dark " type="button" onClick={move} value=">" ><i class="bi bi-arrow-right"></i></button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaginateListItems;
