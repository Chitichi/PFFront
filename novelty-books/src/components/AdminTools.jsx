"use client"
import React from "react"
import ListUsers from "./ListUsers"
import AdminBooks from "./AdminBooks"




function AdminTools({books, updateBooks}) {

    const [tool, setTool] = React.useState("")
    const [data, setData] = React.useState([])

    const mount = React.useRef(true)
    
    function handleTool(e) {
        const {name} = e.target
        setTool(name)
    }

    function bringData() {
        // fetch(process.env.RUTA_BACK+"/users")
        //     .then(response => response.json())
        //     .then(data => data.map(user => ({
        //         id: user._id,
        //         name: user.name,
        //         rol: user.rolAdmin
        //     })))
        fetch(process.env.RUTA_BACK+"/users")
            .then(response => response.json())
            .then(data => {
                setData(data)})
            .catch(error => console.log(error))
    }

    function usersManager() {
        
    }

    React.useEffect(() => {
        if(!mount.current) {    
            bringData()
        }
    },[tool])

    function showData() {
        console.log(data)
    }

    return (
        <>
            <h2>Herramientas del administrador</h2>
            <button onClick={handleTool} name="users">Usuarios</button>
            <button onClick={handleTool} name="books">Libros</button>
            <button onClick={handleTool} name="orders">Ordenes</button>
            <button onClick={handleTool} name="statistics">Estadisticas</button>
            {
                tool==="users" && data.length ? <ListUsers listUsers={data}/> :
                tool==="books" ? <AdminBooks books={books} updateBooks={updateBooks}/> :
                null
            }
            
        </>
    )
}

export default AdminTools