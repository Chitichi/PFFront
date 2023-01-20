import Card from "./Card";
//import booksArray from "../books Array/books.json";
//import BookCard from "../components/BookCard";
import books from "@/books Array/books1";
import Link from "next/link";

function Landing() {
  return (
    <>
      <header class="bg-dark py-5">
        <div class="container px-4 px-lg-5 my-5">
          <div class="text-center text-white">
            <h1 class="display-4 fw-bolder">Novelty Books</h1>
            <p class="lead fw-normal text-white-50 mb-0">
              With this shop hompeage template
            </p>
          </div>
        </div>
      </header>

      <section class="py-5 bg-light">
        <div class="container px-4 px-lg-5 mt-5">
          <h2 class="fw-bolder mb-4">Popular books</h2>
          <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {books.map((book) => {
              return (
                <Link href={`/detailBook/${book.isbn13}`}>
                  <Card
                    title={book.title}
                    author={book.author}
                    image={book.image}
                    price={book.price}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Landing;
