import Card from "@/components/Card";
import books from "@/books Array/books1";
function Detail({params}) {
    const {ISBN} = params
    const book = books.filter(b => b.isbn13 ==ISBN )
    //const book = books[0]
    const {title,author,pages,price,description,isbn,image} = book[0]

    console.log(book)
  return (
    <>
      <section class="py-5">
        <div class="container px-4 px-lg-5 my-5">
          <div class="row gx-4 gx-lg-5 align-items-center">
            <div class="col-md-6">
              <img
                class="card-img-top mb-5 mb-md-0"
                src={image}
                alt="..."
                style={{height: 500 , width: 400 }}
              />
            </div>
            <div class="col-md-6">
              <div class="small mb-1">{isbn}</div>
              <h1 class="display-5 fw-bolder">{title}</h1>
              <h3>{author}</h3>
              <p>{pages} pages</p>
              <div class="fs-5 mb-5">
                <span>$ {price}</span>
              </div>
              <p class="lead">
                {description}
              </p>
              <div class="d-flex">
                <input
                  class="form-control text-center me-3"
                  id="inputQuantity"
                  type="num"
                  value="1"
                  style={{width: 45}}
                />
                <button
                  class="btn btn-outline-dark flex-shrink-0"
                  type="button"
                >
                  <i class="bi-cart-fill me-1"></i>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-5 bg-light">
        <div class="container px-4 px-lg-5 mt-5">
          <h2 class="fw-bolder mb-4">Related books</h2>
          <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center" /* Aqui se mapean las cards*/>
          {books.map((book) => {
              return (
                <Card
                  title={book.title}
                  image={book.image}
                  price={book.price}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Detail;