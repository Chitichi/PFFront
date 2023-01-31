"use client"
import React from "react"
import ListUsers from "./ListUsers"

function AdminTools() {

    const [tool, setTool] = React.useState("")

    function handleTool(e) {
        console.log(e.target.name)
        setTool(e.target.name)
    }

    function bringData() {
        fetch(process.env.RUTA_BACK+"/users")
            .then(response => response.json())
            .then(data => data.map(user => ({
                id: user._id,
                name: user.name,
                rol: user.rolAdmin
            })))
    }

    function usersManager() {
        
    }

    return (
        <>
            <h2>Herramientas del administrador</h2>
            <button onClick={handleTool} name="users">Usuarios</button>
            <button onClick={handleTool} name="books">Libros</button>
            <button onClick={handleTool} name="orders">Ordenes</button>
            <button onClick={handleTool} name="statistics">Estadisticas</button>
            {tool==="users"?<ListUsers/>:null}
            
        </>
    )
}

export default AdminTools