"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useStateContext } from "context/StateContext";

const Cancel = () => {
    const { cartItems,setCartItems } = useStateContext();

    const goBack = () =>{
        setCartItems([]);
        localStorage.removeItem("cartItems")
    }
    return(
        <div className="row " style={{ margin: 200 }}>
      <h1 className="card-title text-center" style={{ marginBottom: 35 }}>
        <strong>Order cancelled!</strong>
      </h1>
      <p className="card-text text-center" style={{ fontSize: 90 }}>
        <i class="bi bi-cart"></i>
      </p>
      
      <div className="row mt-2" style={{ margin: 10 }}>
        <div className="col-lg-4 offset-lg-4">
           <Link href="/"> 
          <button
            type="button"
            className="btn btn-outline-dark"
            style={{ marginLeft: 50 }}
            onClick={goBack}
          >
            Continue Shopping
          </button>
           </Link> 
        </div>
      </div>
    </div>
    )
}

export default Cancel;