"use client"
import React from "react";
import { useStateContext } from "../../../context/StateContext";

    function myPurchases() {
    const {user} = useStateContext();
    const myBooks = user.myPurchases;
  
    console.log(myBooks, "somos tus libros comprados");
   
    return (
        <div>
            <h1>Hola somos tus libros</h1>
         </div>
                    )
    }
    

export default myPurchases;