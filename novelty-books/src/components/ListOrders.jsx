"use client"
import React from "react"
import ShowListOrders from "./ShowListOrders"
import { useRouter } from "next/navigation"

const propertiesToShow = ["booksBought", "userId", "_id", "total"]

function ListOrders({ listOrders }) {

    const list = listOrders
    const [listToShow, setListToShow] = React.useState(list)
    const [typeFilter, setTypeFilter] = React.useState("todos")
    const [typeFilterStatus, setTypeFilterStatus] = React.useState("all")
    const [orderSelected, setOrderSelected] = React.useState({})
    const [inputSearch, setInputSearch] = React.useState("")
    const router = useRouter()

    function goDetailUser() {
        router.push(`/admin/${orderSelected.user._id}`)
    }

    function selectOrder(id, user) {
        setOrderSelected({ id, user })
        if (orderSelected.id) {
            const rowBefore = document.getElementById(orderSelected.id)
            rowBefore.className = ""
        }
        const rowCurrent = document.getElementById(id)
        rowCurrent.className = "bg-warning"
    }

    function handleSearch(event) {
        const input = event.target.value
        setInputSearch(input)
        filterOrders(input, typeFilterStatus, typeFilter)
    }

    function handleTypeFilter(event) {
        const { value } = event.target
        setTypeFilter(value)
        filterOrders(inputSearch, typeFilterStatus, value)
    }

    function filterList(list, input , value) {
        if (list.length) {
            switch (value) {
                case "todos": {
                    const newList = list.filter(order => {
                        const arrayTrue = propertiesToShow.map(prop => order[prop].toString().includes(input) ? true : false)
                        return arrayTrue.includes(true) ? true : false
                    })
                    return newList
                }
                case "id": {
                    const newList = list.filter(order => order._id.includes(input))
                    return newList
                }
                case "userID": {
                    const newList = list.filter(order => order.userId.includes(input))
                    return newList
                }
                case "books": {
                    const newList = list.filter(order => order.booksBought.includes(input))
                    return newList
                }
                case "total": {
                    const newList = list.filter(order => order.total.toString().includes(input))
                    return newList
                }
            }
        }
        return list

    }

    function filterStatus(list, type) {
        // if (type !== "all") {
        //     const newList = list.filter(order => order.rolAdmin.toString() === type)
        //     return newList
        // } else {
        //     return list
        // }
        return list
    }

    function filterOrders(input, type, value) {
        let newList = filterStatus(list, type)
        newList = filterList(newList, input, value)
        setListToShow(newList)
    }

    function handleFilterStatus(event) {
        const { value } = event.target
        setTypeFilterStatus(value)
        filterOrders(inputSearch, value, typeFilter)
    }

    return (
        <>
            <div className="container px-4 px-lg-5 my-5">
                <h3>Lista de ordenes</h3>
                <input type="search" placeholder="Search" onChange={handleSearch}></input>
                <select onChange={handleTypeFilter}>
                    <option value={"todos"}>todos</option>
                    <option value={"id"}>id</option>
                    <option value={"userID"}>userID</option>
                    <option value={"books"}>books</option>
                    <option value={"total"}>total</option>
                </select>
                <label>Status: </label>
                <select onChange={handleFilterStatus}>
                    <option value={"all"}>All</option>
                    <option value={"true"}>Entregado</option>
                    <option value={"false"}>Pendiente</option>
                </select>

                <button onClick={goDetailUser}>Ver Detalle</button>

                <ShowListOrders listOrders={listToShow} goDetailUser={goDetailUser} selectOrder={selectOrder} />
            </div>
        </>
    )
}

export default ListOrders