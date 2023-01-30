"use client"
import React from "react";
import { useStateContext } from "../../../context/StateContext";
import { useRouter } from "next/navigation";




function myPurchases() {
    const router = useRouter();
    const {user} = useStateContext();
    const myBooks = user.myPurchases;
    
    function back(){
        if (user.name) {
            router.push(`/profile/${user.name}`);
          } else {
            router.push("/");
          }
        }
    
 //   console.log(myBooks, "somos tus libros comprados");
   
    return (
        <div>
            <h1>Hola somos tus libros</h1>
            <button
            onClick={back}
            >Back</button>
         </div>
         
                    )
    }
    

export default myPurchases;