"use client";

import getStripe from "lib/getStripe";
import { useStateContext } from "context/StateContext";
import { Link } from "react-router-dom";

function Cart() {
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });
    console.log("Libros", cartItems);
    if (response.statusCode === 500) return;

    const data = await response.json();

    stripe.redirectToCheckout({ sessionId: data.id });
  };
  return (
    <>
      <section className="h-100">
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
              </div>

              {cartItems.length < 1 && (
                <div class="row " style={{ margin: 150 }}>
                <h1 class="card-title text-center" style={{ marginBottom: 35 }}>
                  <strong>Your cart is empty</strong>
                </h1>
                <p  class="card-text text-center" style={{fontSize:90}}><i class="bi bi-cart"></i></p>
                
                <div class="row mt-2" style={{ margin: 10 }}>
                  <div class="col-lg-4 offset-lg-4">
                    
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        style={{ marginRight: 10 }}
                       
                      >
                        <a href="/" style={{textDecoration: 0}}>Continue Shopping</a>
                      </button>
                    
                  </div>
                </div>
              </div>
              )}

              {cartItems.length >= 1 &&
                cartItems.map((item, idx) => (
                  <div key={idx} class="card rounded-3 mb-4">
                    <div class="card-body p-4">
                      <div class="row d-flex justify-content-between align-items-center">
                        <div class="col-md-2 col-lg-2 col-xl-2">
                          <img
                            src={item.image}
                            className="img-fluid rounded-3"
                            alt="Cotton T-shirt"
                          />
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-3">
                          <p className="lead fw-normal mb-2">{item.title}</p>
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                          <button
                            className="btn btn-link px-2"
                            onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                          >
                            <i className="fas fa-minus"></i>
                          </button>

                          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h5 className="mb-0">{item.quantity}</h5>
                          </div>

                          <button
                            className="btn btn-link px-2"
                            onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                          <h5 className="mb-0">$ {item.price}</h5>
                        </div>
                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                          <a href="#!" className="text-danger">
                            <i className="fas fa-trash fa-lg"></i>
                          </a>
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

              {cartItems.length >= 1 && (
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
