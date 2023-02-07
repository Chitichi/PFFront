"use client"
import React from "react";
import styles from "./AdminBooks.module.css"


export default function AdminBooks({books, updateBooks, filterByTitle}){


    const [newStock, setNewStock] = React.useState(0)
    const [searchInput, setSearchInput] = React.useState("")

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json '},
        body: JSON.stringify({stock: newStock})
    }

    const handleChange = (e) => {
        const {value} = e.target
        setNewStock(value)
    }

    const handleChangeInput = (e) => {
        const {value} = e.target
        setSearchInput(value)
        filterByTitle(value)
    }

    async function handleClick(e){
        const {id} = e.target
        updateBooks(id, requestOptions)
        const input = document.getElementById(id)
        input.value = ""
    }

    return(
        <div>
            <div className={`input-group ${styles.searchInput}`}>
                <div className="input-group-addon">
                    <i class="bi bi-search"></i>
                </div>
                <input
                    onChange={handleChangeInput}
                    value={searchInput}
                    placeholder={`Search by Title`}
                />
            </div>
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
        </div>
    )
}