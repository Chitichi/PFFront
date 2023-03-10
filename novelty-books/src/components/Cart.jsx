"use client";

import getStripe from "lib/getStripe";
import { useStateContext } from "context/StateContext";
import { useEffect } from "react";


function Cart() {
  const { cartItems, totalPrice ,setTotalPrice, user} = useStateContext();

  const subtotal = cartItems
    ?.map((book) => book.price * book.quantity)
    .reduce((prev, current) => prev + current, 0);
  console.log(subtotal);
  setTotalPrice(subtotal)

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });
    if (response.statusCode === 500) return;

    const data = await response.json();

    stripe.redirectToCheckout({ sessionId: data.id });
  };
  return (
    <div>
      <div className="h-100">
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
              </div>

              {cartItems.length < 1 && (
                <div className="row " style={{ margin: 150 }}>
                  <h1
                    className="card-title text-center"
                    style={{ marginBottom: 35 }}
                  >
                    <strong>Your cart is empty</strong>
                  </h1>
                  <p className="card-text text-center" style={{ fontSize: 90 }}>
                    <i class="bi bi-cart"></i>
                  </p>

                  <div className="row mt-2" style={{ margin: 10 }}>
                    <div className="col-lg-4 offset-lg-4">
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        style={{ marginRight: 10 }}
                      >
                        <a href="/" style={{ textDecoration: 0 }}>
                          Continue Shopping
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {cartItems.length >= 1 &&
                cartItems?.map((item, idx) => (
                  <div key={idx} className="card rounded-3 mb-4">
                    <div className="card-body p-4">
                      <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-md-2 col-lg-2 col-xl-2">
                          <img
                            src={item?.image.secure_url}
                            className="img-fluid rounded-3"
                          />
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-3">
                          <p className="lead fw-normal mb-2">{item?.title}</p>
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                          
                          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h5 className="mb-0">{item?.quantity}</h5>
                          </div>

                          
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                          <h5 className="mb-0">$ {item?.price}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {cartItems.length >= 1 && (
                <div className="cart-bottom">
                  <div className="total">
                    <h3>Subtotal:</h3>
                    <h3>${totalPrice}</h3>
                  </div>
                </div>
              )}

              {cartItems.length >= 1 && user.name&& (
                <div className="card">
                  <div className="card-body">
                    <button
                      type="button"
                      className="btn btn-warning btn-block btn-lg"
                      onClick={handleCheckout}
                    >
                      Proceed to Pay
                    </button>
                  </div>
                </div>
              )}
             {
              !user.name && (
                <div className="card">
                <div className="card-body">
                  <h2 className="text-center">You must be log to pay!</h2>
                </div>
              </div>
              )
             }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
