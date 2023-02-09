"use client"
import React from "react"
import ListUsers from "./ListUsers"
import AdminBooks from "./AdminBooks/AdminBooks"
import ListOrders from "./ListOrders"
import GraphicsDesk from "./GraphicsDesk"

function AdminTools({orders, users, books, updateBooks, filterByTitle}) {

    const [tool, setTool] = React.useState("graphics")

    
    function handleTool(e) {
        const {name} = e.target
        setTool(name)
    }

    return (
        <div className="container">
            <h2 className="text-center m-2 ">Admin Tools</h2>
            <div className="container text-center">
                <button className="btn btn-outline-dark m-3"onClick={handleTool} name="users">Users</button>
                <button className="btn btn-outline-dark m-3"onClick={handleTool} name="orders">Orders</button>
                <button className="btn btn-outline-dark m-3"onClick={handleTool} name="books">Books</button>    
                <button className="btn btn-outline-dark m-3"onClick={handleTool} name="graphics">Statistics</button>
            </div>
            {
                tool==="users" ? <ListUsers listUsers={users}/> :
                tool==="books" ? <AdminBooks books={books} updateBooks={updateBooks} filterByTitle={filterByTitle}/> :
                tool === "orders" ? <ListOrders listOrders={orders} /> :
                tool === "graphics" ? <GraphicsDesk listOrders={orders} listUsers={users} listBooks={books}/> :
                null
            }
          
        </div>
    )
}

export default AdminTools