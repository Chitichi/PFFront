"use client"


import React from "react";
import styles from "./AdminBooks.module.css"

const fetchBooksUpdate = async (id, requestOptions) => {
    try{
        const res = await fetch(process.env.RUTA_BACK+"/books/"+id, requestOptions);
          return await res.json();
    }catch(error){
         return error.message
    }
}

export default function AdminBooks({books, updateBooks}){


    const [newStock, setNewStock] = React.useState(0)

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json '},
        body: JSON.stringify({stock: newStock})
    }

    const handleChange = (e) => {
        const {value} = e.target
        setNewStock(value)
    }

    async function handleClick(e){
        const {id} = e.target
        updateBooks(id, requestOptions)
    }

    return(
        <div className={styles.wrapper}>
            {
                books.map((book, idx) => (
                    <div key={idx} className={styles.bookWrapper}>
                        <div>
                            <img src={book.image.secure_url}/>
                        </div>
                        <h4>{book.title}</h4>
                        <h5><span>{book.stock}</span> <div>Units in Stock</div></h5>
                        <div>
                            <input id={book._id} placeholder="Enter the stock available" onChange={handleChange}/>
                            <button id={book._id} onClick={handleClick}>Update Stock</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}