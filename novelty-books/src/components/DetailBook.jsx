"use client";
// import Card from "@/components/Card";
// import { usePathname } from "next/navigation";


// const fetchBook = (id) => {
//   return fetch(`http://localhost:3001/books/${id}`)
//     .then(res => res.json())
//     // .catch(error => alert(error.message))
// }
import { useStateContext } from "context/StateContext";
export default function DetailBook({ book }) {
  // const {ISBN} = params
  // const book = books.filter(b => b._id ==ISBN )
  //const book = books[0]
  // const pathname = usePathname().slice(12)


  // const book = await fetchBook(pathname)

  //     const book = {
  //         _id: "63cde73486593e4087ab7b20",
  //   publishDate: "2023-01-23",
  //   title: "Foundation",
  //   author: "Isaac Asimov",
  //   genre: [
  //     "Sci-Fiction"
  //   ],
  //   description: "The Galactic Empire has prospered for twelve thousand years. Nobody suspects that the heart of the thriving Empire is rotting, until psychohistorian Hari Seldon uses his new science to foresee its terrible fate.",
  //   pageCount: 1200,
  //   price: 18.3,
  //   image: "https://m.media-amazon.com/images/I/41YPF4kFjLL._SX326_BO1,204,203,200_.jpg"
  //     }

  //     // const {title,author,pageCount,price,description,image} = book

  //     console.log(book)
  const { decQty, incQty, qty, onAdd } = useStateContext()
  const handleBuyNow = () => {
    onAdd(book, qty);

  }
  return (
    <>
      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <img
                className="card-img-top mb-5 mb-md-0"
                src={(book.image && book.image.secure_url) || book.image}
                alt="..."
                style={{ height: 500, width: 400 }}
              />
            </div>
            <div className="col-md-6">

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
          </div>
        </div>
      </section>

    </>
  );
}