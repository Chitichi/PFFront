"use client";
import React from "react";
import ShowListUsers from "./ShowListUsers";
import { useRouter } from "next/navigation";
import PaginateListItems from "./PaginateListItems";
import Swal from "sweetalert2";

const propertiesToShow = ["email", "name", "_id"];

function ListUsers({ listUsers }) {
  const [list, setList] = React.useState(listUsers);
  const [listToShow, setListToShow] = React.useState(list);
  const [isDeleted, setIsDeleted] = React.useState(false)
  const [user, setUser] = React.useState({})

  const [current, setCurrent] = React.useState(0);

  const [typeFilter, setTypeFilter] = React.useState("todos");
  const [typeFilterAdmin, setTypeFilterAdmin] = React.useState("all");
  const [userSelected, setUserSelected] = React.useState({});
  const [inputSearch, setInputSearch] = React.useState("");
  const router = useRouter();
  const [inputSwitch, setInputSwitch] = React.useState(true)

  const itemPerPage = 10;
  const listToShowPaginate = listToShow.slice(current, current + itemPerPage);

  function goDetailUser(id) {
    router.push(`/admin/userDetail/${id}`);
  }

  function selectUser(id, user) {
    setUser(user)
    setUserSelected({ id, user });
    setIsDeleted(user.isDeleted)
    setInputSwitch(false)
    if (userSelected.id) {
      const rowBefore = document.getElementById(userSelected.id);
      rowBefore.className = "";
    }
    const rowCurrent = document.getElementById(id);
    rowCurrent.className = "bg-warning";
    
    
  }

  function handleSearch(event) {
    const input = event.target.value;
    setInputSearch(input);
    filterUsers(input, typeFilterAdmin, typeFilter);
  }

  function handleTypeFilter(event) {
    const { value } = event.target;
    setTypeFilter(value);
    filterUsers(inputSearch, typeFilterAdmin, value);
  }

  function filterList(list, input, value) {
    if (list.length) {
      switch (value) {
        case "todos": {
          const newList = list.filter((user) => {
            const arrayTrue = propertiesToShow.map((prop) =>
              user[prop].includes(input) ? true : false
            );
            return arrayTrue.includes(true) ? true : false;
          });
          return newList;

        }
        case "id": {
          const newList = list.filter((user) => user._id.includes(input));
          return newList;
        }
        
        case "nombre": {
          const newList = list.filter((user) => user.name.includes(input));
          return newList;
        }
        case "correo": {
          const newList = list.filter((user) => user.email.includes(input));
          return newList;
        }
      }

    }
    return list;
  }

  function filterAdmin(list, type) {
    if (type !== "all") {
      const newList = list.filter((user) => user.rolAdmin.toString() === type);
      return newList;
    } else {
      return list;
    }

  }

  function filterUsers(input, type, value) {
    let newList = filterAdmin(list, type);
    newList = filterList(newList, input, value);
    setListToShow(newList);
  }

  function handleFilterAdmin(event) {
    const { value } = event.target;
    setTypeFilterAdmin(value);
    filterUsers(inputSearch, value, typeFilter);
  }

  function move(event) {
    const moved = event.target.value;
    moved === ">"
      ? setCurrent((current) => current + itemPerPage)
      : setCurrent((current) => current - itemPerPage);
  }

  async function handleEnabled() {
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("isDeleted", !isDeleted);
    setIsDeleted((isDeleted) => (!isDeleted))
    try {
      const response = await fetch(process.env.RUTA_BACK + `/users/${user._id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await response.json()
      Swal.fire({
        title: "Successful change!",
        text: `The user is now ${!isDeleted? "disabled": "enabled"}`,
        icon: "success",
        timer: 3000,
      })

      const res = await fetch(process.env.RUTA_BACK + "/users",{cache: "no-store"})
      const updateUsers = await res.json()
      setListToShow(updateUsers)

    } catch(error) {
      Swal.fire({
        title: "Error",
        text: "Ooops something is wrong!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  return (
    <>
      <div className="container ">
        <h3 className="text-center m-2 ">Lista de usuarios</h3>
        <div className="row justify-content-end">
          <div className="col-2">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              onChange={handleSearch}
            ></input>
          </div>  
          <div className="col-2">
            <select className="form-control" onChange={handleTypeFilter}>
              <option value={"todos"}>All</option>
              <option value={"id"}>Id</option>
              <option value={"nombre"}>Email</option>
              <option value={"correo"}>Email</option>
            </select>
          </div>  
          <div className="col-1">
            <label>Admin: </label>
          </div>
          <div className="col-2">  
            <select className="form-control" onChange={handleFilterAdmin}>
              <option value={"all"}>All</option>
              <option value={"true"}>True</option>
              <option value={"false"}>False</option>
            </select>
          </div>
          <div className="col-2">
            <button
              className="btn btn-outline-dark "
              onClick={() => {
                goDetailUser(userSelected.user._id);
              }}
            >
              Ver Detalle
            </button>
          </div>    
            <div className="col-2 form-check form-check-inline form-switch">
              <input className={`form-check-input ${isDeleted ? "bg-danger" : "bg-success"}`} type={"checkbox"} role={"switch"} id={"flexSwitchCheckDefault"} value={isDeleted} onClick={handleEnabled} checked={isDeleted} disabled={inputSwitch}/>          
              <label for={"flexSwitchCheckDefault"}>{isDeleted? "Disabled":"Enabled"}</label>

              
            </div>
        </div>      
        <PaginateListItems
          current={current}
          itemPerPage={itemPerPage}
          allItems={listToShow.length}
          move={move}
        />
        <ShowListUsers
          listUsers={listToShowPaginate}
          goDetailUser={goDetailUser}
          selectUser={selectUser}
          current={current}
        />
      </div>
    </>
  );

}

export default ListUsers;
