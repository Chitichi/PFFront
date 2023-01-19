import Card from "@/components/Card";

function Detail() {
  return (
    <>
      <section class="py-5">
        <div class="container px-4 px-lg-5 my-5">
          <div class="row gx-4 gx-lg-5 align-items-center">
            <div class="col-md-6">
              <img
                class="card-img-top mb-5 mb-md-0"
                src="https://m.media-amazon.com/images/I/516ZPBaER1L.jpg"
                alt="..."
              />
            </div>
            <div class="col-md-6">
              <div class="small mb-1">ISBN</div>
              <h1 class="display-5 fw-bolder">Title</h1>
              <h3>Author</h3>
              <p>350 pages</p>
              <div class="fs-5 mb-5">
                <span>$45.00</span>
              </div>
              <p class="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium at dolorem quidem modi. Nam sequi consequatur
                obcaecati excepturi alias magni, accusamus eius blanditiis
                delectus ipsam minima ea iste laborum vero?
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
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
          </div>
        </div>
      </section>
    </>
  );
}

export default Detail;
