"use client"
import React from "react"
import ShowListUsers from "./ShowListUsers"
import { useRouter } from "next/navigation"

function ListUsers({ listUsers }) {

    const [list, setList] = React.useState(listUsers)
    const [inputSearch, setInputSearch] = React.useState("")
    const router = useRouter()

    function goDetailUser(id) {
        router.push(`/admin/${id}`)
    }

    function handleSearch(event){
        const input = event.target.value
        setInputSearch(input)
        filter(input)
    }

    function filter(input){
        
    }

    return (
        <>
            <div className="container px-4 px-lg-5 my-5">
                <h3>Lista de usuarios</h3>
                <input type="search" placeholder="Search" onChange={handleSearch}></input>
                <select>
                    <option hidden></option>
                    <option >id</option>
                    <option>nombre</option>
                    <option>correo</option>
                </select>
                <label>Admin: </label>
                <select>
                    <option>True</option>
                    <option>False</option>
                </select>

                <ShowListUsers listUsers={list} goDetailUser={goDetailUser} />
            </div>
        </>
    )
}

export default ListUsers