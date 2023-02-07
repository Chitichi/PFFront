"use client";
import styles from "./DetailBook.module.css"
import { useRouter } from "next/navigation";

export default function DetailBook({book}) {
    const router = useRouter();
    function back(){
        router.push("/myPurchases");}
 
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
    
              </div>
            </div>
              <button
                          onClick={back}
                          className="btn btn-outline-dark flex-shrink-0"
                          type="button">
                            
                            Back
                          </button>
           
          </div>
      
      </section>

    </>
  );
}