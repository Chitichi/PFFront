"use client";
import { useStateContext } from "context/StateContext";
import React from "react";
import styles from "./DetailBook.module.css"
import Review from "../ReviewFolder/Review";
import ReviewsList from "../ReviewsList/ReviewsList";

export default function DetailBook({isbn, book, updateBook}) {

const { decQty, incQty, qty, onAdd, user, totalBooks, setTotalBooks } = useStateContext()

  const handleBuyNow = () => {
    onAdd(book, qty);
  }

  const [comment, setComment] = React.useState({

  })

  React.useEffect(() => {
    updateBook(isbn)
  }, [])
  
  return (
    <>
      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className={styles.innerWrapper}>
            <div className={styles.a}>
              <img
                className="card-img-top mb-5 mb-md-0"
                src={(book.image && book.image.secure_url) || book.image}
                alt="..."
              />
            </div>
            <div className={styles.b}>
              
              <h1 className="display-5 fw-bolder">{book.title}</h1>
              <h3>{book.author}</h3>
              <p>{book.pageCount} pages</p>
              <div className="fs-5 mb-5">
                <span>$ {book.price}</span>
              </div>
              <p className="lead">
                {book.description}
              </p>
              <div className="quantity">

                <h3>Quantity:</h3>
                <p className="quantity-desc">
                  <span onClick={decQty}><i className="bi bi-dash m-3"></i></span>
                  <span ><strong>{qty}</strong> </span>
                  <span onClick={incQty}><i className="bi bi-plus m-3"></i></span>
                </p>
              </div>
              <div className="d-flex">

                <button
                  className="btn btn-outline-dark flex-shrink-0"
                  type="button"
                  onClick={() => onAdd(book, qty)}
                >
                  <i className="bi-cart-fill me-1"></i>
                  Add to cart
                </button>
              </div>
            </div>
            <div className={styles.c}>
                {user.name && <Review idBook={book._id} user={user} updateBook={updateBook} setComment={setComment}/>}
            </div>
            <div className={styles.d}>
                <ReviewsList ratings={book} comment={comment}/>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}