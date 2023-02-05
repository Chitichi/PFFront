"use client"
import React from "react"
import ListUsers from "./ListUsers"
import ListOrders from "./ListOrders"
import GraphicsDesk from "./GraphicsDesk"

function AdminTools() {

    const [tool, setTool] = React.useState("")
    const [data, setData] = React.useState([])
    const [dataGraphics, setDataGraphics] = React.useState({
        users: [],
        books: [],
        orders: []
    })

    const mount = React.useRef(true)

    function handleTool(e) {
        const newTool = e.target.name
        setTool(newTool)
        setData([])
        mount.current = false
    }

    function bringData() {
        // fetch(process.env.RUTA_BACK+"/users")
        //     .then(response => response.json())
        //     .then(data => data.map(user => ({
        //         id: user._id,
        //         name: user.name,
        //         rol: user.rolAdmin
        //     })))
        // fetch(process.env.RUTA_BACK + "/users")
        //     .then(response => response.json())
        //     .then(data => {
        //         setData(data)
        //     })
        //     .catch(error => console.log(error))
        // switch (tool) {
        //     case "users": {
        //         setData(db.users)
        //         fetch(process.env.RUTA_BACK + "/users")
        //             .then(response => response.json())
        //             .then(data => {
        //                 setData(data)
        //             })
        //             .catch(error => console.log(error))
        //         break
        //     }
        //     case "orders": {
        //         setData(db.orders)
        //         break
        //     }
        // }
        if (tool !== "graphics") {
            fetch(process.env.RUTA_BACK + "/" + tool)
                .then(response => response.json())
                .then(data => {
                    setData(data)
                })
                .catch(error => console.log(error))
        }
        else if (tool === "graphics") {
            // console.log(process.env.RUTA_BACK + "/users")
            fetch(process.env.RUTA_BACK + "/users")
                .then(response => response.json())
                .then(data => {setDataGraphics(dataGraphics => ({
                    ...dataGraphics,
                    users: data
                }))})
                .catch(error => console.log(error))
            fetch(process.env.RUTA_BACK + "/books")
                .then(response => response.json())
                .then(data => setDataGraphics(dataGraphics => ({
                    ...dataGraphics,
                    books: data
                })))
                .catch(error => console.log(error))
            fetch(process.env.RUTA_BACK + "/orders")
                .then(response => response.json())
                .then(data => setDataGraphics(dataGraphics => ({
                    ...dataGraphics,
                    orders: data
                })))
                .catch(error => console.log(error))
        }

    }

    function usersManager() {

    }

    React.useEffect(() => {
        if (!mount.current) {
            bringData()
        }
    }, [tool])

    function showData() {
        console.log(dataGraphics)
    }

    return (
        <>
            <h2>Herramientas del administrador</h2>
            <button onClick={handleTool} name="users">Usuarios</button>
            <button onClick={handleTool} name="books">Libros</button>
            <button onClick={handleTool} name="orders">Ordenes</button>
            <button onClick={handleTool} name="graphics">Estadisticas</button>
            <button onClick={showData} name="showData">Show</button>
            {tool === "users" && data.length ? <ListUsers listUsers={data} /> : null}
            {tool === "orders" && data.length ? <ListOrders listOrders={data} /> : null}
            {/* {tool === "graphics" && dataGraphics.users.length && dataGraphics.orders.length && dataGraphics.books.length? showData():null} */}
            {tool === "graphics" && dataGraphics.users.length && dataGraphics.orders.length && dataGraphics.books.length?
            <GraphicsDesk listOrders={dataGraphics.orders} listUsers={dataGraphics.users} listBooks={dataGraphics.books}/> : null}
            {/* {tool==="orders"? <ListOrders/>:null} */}
        </>
    )
}

export default AdminTools