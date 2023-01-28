"use client";

import getStripe from "lib/getStripe";
import { useStateContext } from "context/StateContext";

function Cart () {
  const { totalPrice, totalQuantities, cartItems, toggleCartItemQuanitity, onRemove } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });
    console.log("Libros",cartItems)
    if(response.statusCode === 500) return;
    
    const data = await response.json();

    stripe.redirectToCheckout({ sessionId: data.id });
  }
    return(
        <>
            <section class="h-100">
        <div class="container h-100 py-5">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-10">
              <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="fw-normal mb-0 text-black">Shopping Cart</h3>
              </div>

              
            {cartItems.map((item) => (<div class="card rounded-3 mb-4">
                  <div class="card-body p-4">
                    <div class="row d-flex justify-content-between align-items-center">
                      <div class="col-md-2 col-lg-2 col-xl-2">
                        <img
                          src={item.image}
                          class="img-fluid rounded-3"
                          alt="Cotton T-shirt"
                        />
                      </div>
                      <div class="col-md-3 col-lg-3 col-xl-3">
                        <p class="lead fw-normal mb-2">{item.title}</p>

                      </div>
                      <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <button
                          class="btn btn-link px-2"
                          onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                        >
                          <i class="fas fa-minus"></i>
                        </button>

                        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                          
                         <h5 class="mb-0">x {item.quantity}</h5>
                        </div>

                        <button
                          class="btn btn-link px-2"
                          onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                        >
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                      <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h5 class="mb-0">$ {item.price}</h5>
                      </div>
                      <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                        <a href="#!" class="text-danger">
                          <i class="fas fa-trash fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>))    }
              
                {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
          </div>
        )}

              <div class="card">
                <div class="card-body">
                  <button
                    type="button"
                    class="btn btn-warning btn-block btn-lg"
                    onClick={handleCheckout}
                  >
                    Proceed to Pay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
    )
}

export default Cart;