"use client"
import React from "react"
import ListUsers from "./ListUsers"
import AdminBooks from "./AdminBooks"
import ListOrders from "./ListOrders"
import GraphicsDesk from "./GraphicsDesk"

function AdminTools({orders, users, books, updateBooks}) {

    const [tool, setTool] = React.useState("")
    
    function handleTool(e) {
        const {name} = e.target
        setTool(name)
    }

    return (
        <>
            <h2>Herramientas del administrador</h2>
            <button onClick={handleTool} name="users">Usuarios</button>
            <button onClick={handleTool} name="books">Libros</button>
            <button onClick={handleTool} name="orders">Ordenes</button>
            <button onClick={handleTool} name="graphics">Estadisticas</button>
            {
                tool==="users" ? <ListUsers listUsers={users}/> :
                tool==="books" ? <AdminBooks books={books} updateBooks={updateBooks}/> :
                tool === "orders" ? <ListOrders listOrders={orders} /> :
                tool === "graphics" ? <GraphicsDesk listOrders={orders} listUsers={users} listBooks={books}/> :
                null
            }
          
        </>
    )
}

export default AdminTools