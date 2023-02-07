"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useStateContext } from "context/StateContext";

const Success = () => {
  const { cartItems, user,setCartItems } = useStateContext();

  const totalPrice = cartItems.map(book => book.price * book.quantity).reduce((prev,current) => prev + current,0);
  console.log("Precio Total: ",totalPrice);

  const orders = {
    userId: user._id,
    email: user.email,
    booksBought: cartItems,
    total: totalPrice
  };
  console.log(orders)
  const sentOrder= async() => {

    const response= await fetch(process.env.RUTA_BACK +'/orders',{
      method: "POST",
      body: JSON.stringify(orders),
      headers: {"Content-type": "application/json"}
    })
    
    const data = await response.json();

    console.log("Orders", data);
    setCartItems([]);
    localStorage.removeItem("cartItems")
  }

  return (
    <div className="row " style={{ margin: 200 }}>
      <h1 className="card-title text-center" style={{ marginBottom: 35 }}>
        <strong>Thank you for your order!</strong>
      </h1>
      <p className="card-text text-center" style={{ fontSize: 90 }}>
        <i className="bi bi-cart-check-fill"></i>
      </p>
      <p className="card-text text-center">
        <strong>Check your email inbox for the receipt.</strong>
      </p>
      <div className="row mt-2" style={{ margin: 10 }}>
        <div className="col-lg-4 offset-lg-4">
           <Link href="/"> 
          <button
            type="button"
            className="btn btn-outline-dark"
            style={{ marginLeft: 50 }}
            onClick={sentOrder}
          >
            Continue Shopping
          </button>
           </Link> 
        </div>
      </div>
    </div>
  );
};

export default Success;
