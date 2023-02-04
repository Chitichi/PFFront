"use client";
import { useStateContext } from "context/StateContext";
import Review from "./Review.jsx";
import styles from "./DetailBook.module.css"

export default function DetailBook({book}) {

const { decQty, incQty, qty, onAdd, user, totalBooks, setTotalBooks } = useStateContext()

  const handleBuyNow = () => {
    onAdd(book, qty);
  }
  
  return (
    <>
      <section class="py-5">
        <div class="container px-4 px-lg-5 my-5">
          <div class={styles.innerWrapper}>
            <div class={styles.a}>
              <img
                className="card-img-top mb-5 mb-md-0"
                src={(book.image && book.image.secure_url) || book.image}
                alt="..."
              />
            </div>
            <div class={styles.b}>
              
              <h1 class="display-5 fw-bolder">{book.title}</h1>
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
            <div class={styles.c}>
                {user.name && <Review user={user} setTotalBooks={setTotalBooks}/>}
            </div>
          </div>
        </div>
      </section>

    </>
  );
}