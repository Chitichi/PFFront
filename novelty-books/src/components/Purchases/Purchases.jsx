"use client"
import React from "react";
import { useStateContext } from "../../../context/StateContext"
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./Purchases.module.css"


const Purchases = ({orders}) => {
    const router = useRouter();
    const {user} = useStateContext();
    const myBooks = user.myPurchases;


  //  console.log(orders, "HOLAAAAAAA SOY TUS ORDENES");
     function back(){
            router.push("/");}

      const myOrder = orders.filter((order) => order.userId === user._id)



  return (
       <section class="py-5">
        <div class="container px-4 px-lg-5 my-5">
          
            <div class={styles.a}></div>
               {myOrder.length >= 1 &&
                myOrder.map((item, idx) => (
                  <div key={idx} className="card rounded-3 mb-4">
                    <div className="card-body p-4">
                      <div className="row d-flex justify-content-between align-items-center">
                      {
                        item ? item.booksBought.map((book, idx)=>
                            <div key={idx}>
                            <div className="col-md-2 col-lg-2 col-xl-2">
                            <Link href={`/detailMyPurchases/${book._id}`}>
                          <img
                            src={book.image?.secure_url}
                            className="img-fluid rounded-3"
                          />
                          </Link>
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
                       
                        </div>
                        ):null
                      }
  
                      </div>
                    </div>
                  </div>
                ))}
                          <button
                           className="btn btn-outline-dark flex-shrink-0"
                           type="button"
                          onClick={back}>
                            
                            Back
                          </button>
                          </div>
          
        
      </section>
      
    
  )

                }

export default Purchases;