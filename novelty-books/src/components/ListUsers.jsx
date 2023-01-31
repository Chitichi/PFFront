"use client"
import React from "react"
import ShowList from "./ShowList"

function ListUsers({listUsers}) {

    const [list, setList] = React.useState(listUsers)

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
           
            <ShowList listUsers={listUsers}/>
        </>
    )
}

export default ListUsers