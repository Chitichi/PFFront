"use client";
import React from "react";
import { useStateContext } from "../../context/StateContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./Purchases.module.css";

const Purchases = ({ orders }) => {
  const router = useRouter();
  const { user } = useStateContext();
  const myBooks = user.myPurchases;

  function back() {
    router.push("/");
  }

  const myOrder = orders.filter((order) => order.userId === user._id);

  return (

    <section>

      <div>
        {myOrder.length >= 1 &&
          myOrder.map((item, idx) => (
            <div className={styles.compras} key={idx}>
              <h1 className={styles.h1}>Order N° {idx + 1}</h1>
              <div>
                <div>
                  {item
                    ? item.booksBought.map((book, idx) => (
                        <div className={styles.libro} key={idx}>
                          <div>
                            <Link href={`/detailMyPurchases/${book._id}`}>
                              <img className={styles.img}src={book.image?.secure_url} />
                            </Link>
                          </div>
                          <div className={styles.detalles}>
                          <div>
                            <h3><strong> Title: </strong> {book.title} </h3>
                          </div>

                          <div>
                            <h3><strong> Price: </strong> $ {book.price} </h3>
                          
                          </div>
                          <div>
                            <h3><strong> Pages: </strong> {book.pageCount} </h3>
                            
                          </div>
                          <div>
                            <h3><strong> Author:</strong> {book.author} </h3>
                            
                          </div>
                          <div>
                            <h3><strong> Quantity:</strong> {book.quantity}</h3>
                            
                          </div>
                        </div>
                        </div>

                      ))
                    : null}
                </div>
              </div>
            </div>
          ))}
          <div className="text-center">
        <button 
        className="btn btn-outline-dark m-2"
        type="button" onClick={back}>
          Back
        </button>
        </div>
      </div>
    </section>
  );
};

export default Purchases;
