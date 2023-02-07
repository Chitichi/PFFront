import React from "react";

const PaginateListItems = ({ current, itemPerPage, allItems, move }) => {
  const nextValue =
    current + itemPerPage > allItems ? allItems : current + itemPerPage;
  return (
    <div>
      <span>
        <div>
          <span>
            {current + 1} - {nextValue} de {allItems}
          </span>
        </div>
        <div>
          {current > 1 ? (
            <input type="button" onClick={move} value="<" />
          ) : (
            <input type="button" onClick={move} value="<" disabled />
          )}
        </div>
        <div>
          {nextValue === allItems ? (
            <input type="button" onClick={move} value=">" disabled />
          ) : (
            <input type="button" onClick={move} value=">" />
          )}
        </div>
      </span>
    </div>
  );
};

export default PaginateListItems;
