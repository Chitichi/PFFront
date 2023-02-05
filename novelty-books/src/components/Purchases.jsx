"use client"
import React from "react";
import { useStateContext } from "../../context/StateContext"
import { useRouter } from "next/navigation";

const Purchases = ({orders}) => {
    const router = useRouter();
    const {user} = useStateContext();
    const myBooks = user.myPurchases;
  //  console.log(orders, "HOLAAAAAAA SOY TUS ORDENES");
     function back(){
            router.push("/");}

      const myOrder = orders.filter((order) => order.userId === user._id)
      console.log(myOrder, "HOLA PUTO");  


  return (
    
    <div>
        {myOrder.length >= 1 &&
                myOrder.map((item, idx) => (
                  <div key={idx} className="card rounded-3 mb-4">
                    <div className="card-body p-4">
                      <div className="row d-flex justify-content-between align-items-center">
                      {
                        item ? item.booksBought.map((book, idx)=>
                            <div key={idx}>
                            <div className="col-md-2 col-lg-2 col-xl-2">
                          <img
                            src={book.image?.secure_url}
                            className="img-fluid rounded-3"
                          />
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-3">
                            <h3> Title: </h3>
                          <p className="lead fw-normal mb-2">{book.title}</p>
                        </div>


                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h3> Price: </h3>
                          <h5 className="mb-0">$ {book.price}</h5>
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-3">
                        <h3> Pages: </h3>
                          <p className="lead fw-normal mb-2">{book.pageCount}</p>
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-3">
                        <h3> Ahutor: </h3>
                          <p className="lead fw-normal mb-2">{book.author}</p>
                        </div>

                      <div className="col-md-3 col-lg-3 col-xl-3">
                      <h3> Description: </h3>
                          <p className="lead fw-normal mb-2">{book.description}</p>
                        </div>
                        
                        </div>
                        ):null
                      }
    
                  
                      </div>
                    </div>
                  </div>
                ))}
                          <button
                          onClick={back}>
                            Back
                          </button>
                        </div>
    
  )
   
 //   console.log(myBooks, "somos tus libros comprados");
   
   /* return (
      <div>
      <section className="h-100">
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
              </div>

              {cartItems.length < 1 && (
                <div className="row " style={{ margin: 150 }}>
                <h1 className="card-title text-center" style={{ marginBottom: 35 }}>
                  <strong>Your cart is empty</strong>
                </h1>
                <p  className="card-text text-center" style={{fontSize:90}}><i class="bi bi-cart"></i></p>
                
                <div className="row mt-2" style={{ margin: 10 }}>
                  <div className="col-lg-4 offset-lg-4">
                    
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
                          <button
                            className="btn btn-link px-2"
                            onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                          >
                            <i className="fas fa-minus"></i>
                          </button>

                          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h5 className="mb-0">{item?.quantity}</h5>
                          </div>

                          <button
                            className="btn btn-link px-2"
                            onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                          <h5 className="mb-0">$ {item?.price}</h5>
                        </div>
                        <div>
                          <button
                          onClick={back}>
                            Back
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

            </div>
          </div>
        </div>
      </section>
    </div>
    
  );*/

                }

export default Purchases;