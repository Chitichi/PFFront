"use client"
import React from "react"
import ShowListUsers from "./ShowListUsers"
import { useRouter } from "next/navigation"

const propertiesToShow = ["email", "name", "_id"]

function ListUsers({ listUsers }) {

    const [list, setList] = React.useState(listUsers)
    const [listToShow, setListToShow] = React.useState(list)
    const [typeFilter, setTypeFilter] = React.useState("todos")
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
        filterList(input)
    }

    function handleTypeFilter(event) {
        const { value } = event.target
        setTypeFilter(value)
    }

    function filterList(input) {
        switch (typeFilter) {
            case "todos": {
                const newList = list.filter((user) => {
                    const arrayTrue = propertiesToShow.map(prop => user[prop].includes(input) ? true : false)
                    return arrayTrue.includes(true) ? true : false
                })
                setListToShow(newList)
                break
            }
            case "id": {
                const newList = list.filter(user => user._id.includes(input))
                setListToShow(newList)
                break
            }
            case "nombre": {
                const newList = list.filter(user => user.name.includes(input))
                setListToShow(newList)
                break
            }
            case "correo": {
                const newList = list.filter(user => user.email.includes(input))
                setListToShow(newList)
                break
            }
        }
    }

    function filterAdmin() {

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
                <select>
                    <option>True</option>
                    <option>False</option>
                </select>

                <button onClick={goDetailUser}>Ver Detalle</button>

                <ShowListUsers listUsers={listToShow} goDetailUser={goDetailUser} selectUser={selectUser} />
            </div>
        </>
    )
}

export default ListUsers