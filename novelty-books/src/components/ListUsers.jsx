"use client"
import React from "react"
import ShowListUsers from "./ShowListUsers"
import { useRouter } from "next/navigation"

const propertiesToShow = ["email", "name", "_id"]

function ListUsers({ listUsers }) {

    const [list, setList] = React.useState(listUsers)
    const [listToShow, setListToShow] = React.useState(list)
    const [typeFilter, setTypeFilter] = React.useState("todos")
    const [typeFilterAdmin, setTypeFilterAdmin] = React.useState("all")
    const [userSelected, setUserSelected] = React.useState({})
    const [inputSearch, setInputSearch] = React.useState("")
    const router = useRouter()

    function goDetailUser() {
        router.push(`/admin/${userSelected.user._id}`)
    }

    function selectUser(id, user) {
        setUserSelected({ id, user })
        if (userSelected.id) {
            const rowBefore = document.getElementById(userSelected.id)
            rowBefore.className = ""
        }
        const rowCurrent = document.getElementById(id)
        rowCurrent.className = "bg-warning"
    }

    function handleSearch(event) {
        const input = event.target.value
        setInputSearch(input)
        filterUsers(input, typeFilterAdmin, typeFilter)
    }

    function handleTypeFilter(event) {
        const { value } = event.target
        setTypeFilter(value)
        filterUsers(inputSearch, typeFilterAdmin, value)
    }

    function filterList(list, input , value) {
        if (list.length) {
            switch (value) {
                case "todos": {
                    const newList = list.filter((user) => {
                        const arrayTrue = propertiesToShow.map(prop => user[prop].includes(input) ? true : false)
                        return arrayTrue.includes(true) ? true : false
                    })
                    return newList
                }
                case "id": {
                    const newList = list.filter(user => user._id.includes(input))
                    return newList
                }
                case "nombre": {
                    const newList = list.filter(user => user.name.includes(input))
                    return newList
                }
                case "correo": {
                    const newList = list.filter(user => user.email.includes(input))
                    return newList
                }
            }
        }
        return list

    }

    function filterAdmin(list, type) {
        if (type !== "all") {
            const newList = list.filter(user => user.rolAdmin.toString() === type)
            return newList
        } else {
            return list
        }

    }

    function filterUsers(input, type, value) {
        let newList = filterAdmin(list, type)
        newList = filterList(newList, input, value)
        setListToShow(newList)
    }

    function handleFilterAdmin(event) {
        const { value } = event.target
        setTypeFilterAdmin(value)
        filterUsers(inputSearch, value, typeFilter)
    }

    return (
        <>
            <div className="container px-4 px-lg-5 my-5">
                <h3>Lista de usuarios</h3>
                <input type="search" placeholder="Search" onChange={handleSearch}></input>
                <select onChange={handleTypeFilter}>
                    <option value={"todos"}>todos</option>
                    <option value={"id"}>id</option>
                    <option value={"nombre"}>nombre</option>
                    <option value={"correo"}>correo</option>
                </select>
                <label>Admin: </label>
                <select onChange={handleFilterAdmin}>
                    <option value={"all"}>All</option>
                    <option value={"true"}>True</option>
                    <option value={"false"}>False</option>
                </select>

                <button onClick={goDetailUser}>Ver Detalle</button>

                <ShowListUsers listUsers={listToShow} goDetailUser={goDetailUser} selectUser={selectUser} />
            </div>
        </>
    )
}

export default ListUsers