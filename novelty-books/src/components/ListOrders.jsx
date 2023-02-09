"use client";
import React from "react";
import ShowListOrders from "./ShowListOrders/ShowListOrders";
import { useRouter } from "next/navigation";
import PaginateListItems from "./PaginateListItems";


const propertiesToShow = ["userId", "_id", "total"];

function ListOrders({ listOrders }) {

  const list = listOrders;
  const [listToShow, setListToShow] = React.useState(list);
  const [typeFilter, setTypeFilter] = React.useState("todos");
  const [typeFilterStatus, setTypeFilterStatus] = React.useState("all");
  const [orderSelected, setOrderSelected] = React.useState({});
  const [inputSearch, setInputSearch] = React.useState("");
  const router = useRouter();
  const [current, setCurrent] = React.useState(0);

  const itemPerPage = 10;
  const listToShowPaginate = listToShow.slice(current, current + itemPerPage);

  function goDetailOrder(id) {
    router.push(`/admin/orderDetail/${id}`);
  }

  function selectOrder(id, order) {
    setOrderSelected({ id, order });
    if (orderSelected.id) {
      const rowBefore = document.getElementById(orderSelected.id);
      rowBefore.className = "";

    }
    const rowCurrent = document.getElementById(id);
    rowCurrent.className = "bg-warning";
  }

  function handleSearch(event) {
    const input = event.target.value;
    setInputSearch(input);
    filterOrders(input, typeFilterStatus, typeFilter);
  }

  function handleTypeFilter(event) {
    const { value } = event.target;
    setTypeFilter(value);
    filterOrders(inputSearch, typeFilterStatus, value);
  }

  function filterList(list, input, value) {
    if (list.length) {
      switch (value) {
        case "todos": {
          const newList = list.filter((order) => {
            const arrayTrue = propertiesToShow.map((prop) =>
              order[prop] && order[prop].toString().includes(input)
                ? true
                : false
            );
            return arrayTrue.includes(true) ? true : false;
          });
          return newList;

        }
        case "id": {
          const newList = list.filter((order) => order._id.includes(input));
          return newList;
        }
        
        case "userID": {
          const newList = list.filter((order) => order.userId.includes(input));
          return newList;
        }
        case "books": {
          const newList = list.filter((order) =>
            order.booksBought.includes(input)
          );
          return newList;
        }
        case "total": {
          const newList = list.filter((order) =>
            order.total.toString().includes(input)
          );
          return newList;
        }
      }
    }

    return list;
  }

  function filterStatus(list, type) {
    // if (type !== "all") {
    //     const newList = list.filter(order => order.rolAdmin.toString() === type)
    //     return newList
    // } else {
    //     return list
    // }
    return list;
  }

  function filterOrders(input, type, value) {
    let newList = filterStatus(list, type);
    newList = filterList(newList, input, value);
    setListToShow(newList);
  }

  function handleFilterStatus(event) {
    const { value } = event.target;
    setTypeFilterStatus(value);
    filterOrders(inputSearch, value, typeFilter);
  }

  function move(event) {
    const moved = event.target.value;
    moved === ">"
      ? setCurrent((current) => current + itemPerPage)
      : setCurrent((current) => current - itemPerPage);
  }

  return (
    <>
      <div className="container ">
        <h3 className="text-center m-2 ">Lista de ordenes</h3>
        <div className="row justify-content-end">  
        
            <div className="col-3">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                onChange={handleSearch}
              ></input>
            </div>
            <div className="col-2">
              <select  className="form-control" onChange={handleTypeFilter}>
                <option value={"todos"}>All</option>
                <option value={"id"}>Id</option>
                <option value={"userID"}>UserID</option>
                <option value={"books"}>Books</option>
                <option value={"total"}>Total</option>
              </select>
            </div>
            <div className="col-1">
              <label >Status: </label>
            </div>
            <div className="col-2">
              <select className="form-control" onChange={handleFilterStatus}>
                <option value={"all"}>All</option>
                <option value={"true"}>Entregado</option>
                <option value={"false"}>Pendiente</option>
              </select>
            </div>  
      
          <div className="col-2">
            <button
              className="btn btn-outline-dark "
              onClick={() => {
                goDetailOrder(orderSelected.order._id);
              }}
            >
              Ver Detalle
            </button>
          </div>
        </div>
      
        <PaginateListItems
          current={current}
          itemPerPage={itemPerPage}
          allItems={listToShow.length}
          move={move}
        />
        <ShowListOrders
          listOrders={listToShowPaginate}
          goDetailOrder={goDetailOrder}
          selectOrder={selectOrder}
          current={current}
        />
      </div>
    </>
  );

}

export default ListOrders;
