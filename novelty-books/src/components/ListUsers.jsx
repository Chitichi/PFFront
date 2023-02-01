"use client"
import React from "react"
import ShowListUsers from "./ShowListUsers"
import {useRouter} from "next/navigation"

function ListUsers({listUsers}) {

    const [list, setList] = React.useState(listUsers)
    const router = useRouter()

    function goDetailUser(id) {
        router.push(`/admin/${id}`)
    }

    return (
        <>
            <h3>Lista de usuarios</h3>
            <input type="search" placeholder="Search"></input>
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
           
            <ShowListUsers listUsers={listUsers} goDetailUser={goDetailUser}/>
        </>
    )
}

export default ListUsers