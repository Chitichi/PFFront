"use client"
import React, {useState} from "react"
import Card from "./Card";
//import booksArray from "../books Array/books.json";
//import BookCard from "../components/BookCard";
import books from "@/books Array/books1";
import Link from "next/link";

function Landing() {

  const [searchInput, setSearchInput] = useState("");
  const [typeSearch, setTypeSearch] = useState('title');
  const [typeOrder, setTypeOrder] = useState('abc');
  const [typeSence, setTypeSence] = useState("asc");
  const [genre, setGenre] = useState("")
  const [arrayBooks, setArrayBooks] = useState(books)

  const listGenre =[
    "Fantasy",
    "Sci-Fiction",
    "Horror",
  ]

  const changeType = (e) => {
    e.preventDefault();
    setTypeSearch(e.target.value);
  };

  const changeOrder = (e) => {
    e.preventDefault();
    setTypeOrder(e.target.value);
    orderBooks(e.target.value, typeSence)
  };

  const changeSence = (e) => {
    e.preventDefault();
    setTypeSence(e.target.value);
    orderBooks( typeOrder , e.target.value)
  };

  const filterSearch = () => {
    setArrayBooks(arrayBooks => {
      return arrayBooks.filter(book => searchInput.toLowerCase() === ""? true: book[typeSearch].toLowerCase().includes(searchInput))
    })
  }

  function orderBooks(type, sence) {
    let booksCopy = [...arrayBooks]
    if (type === "abc") {
      booksCopy.sort((a, b) => {
        if (a.title > b.title) return 1
        if (b.title > a.title) return -1
        return 0
      })
      sence === "asc"? setArrayBooks(booksCopy) : setArrayBooks(booksCopy.reverse())
    } else if (type === "price") {
      booksCopy.sort((a, b) => a.price - b.price)
      sence === "asc"? setArrayBooks(booksCopy) : setArrayBooks(booksCopy.reverse())
    }
  }

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

          <div style={{ margin: 5 }} class="d-flex flex-row-reverse">
            <nav class="navbar bg-body-tertiary">
              <div class="container-fluid">
                <form class="d-flex" role="search">

                <select name="filter" onChange={(e) => {changeOrder(e)}}>
                    {
                      listGenre.map((genre, index) => <option key={index} value={genre}>{genre}</option>)
                    }
                </select>

                  <select name="filter" onChange={(e) => {
                    changeOrder(e)
                    }}>
                    <option>Orden</option>
                    <option value="abc">Alfabetico</option>
                    <option value="price">Price</option>
                  </select>

                  <select name="filter" onChange={(e) => {
                    changeSence(e)
                    }}>
                    <option>Sentido</option>
                    <option value="asc">Ascendente</option>
                    <option value="des">Descendente</option>
                  </select>

                  <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) => setSearchInput(e.target.value)}
                  ></input>

                  <select name="filter" onChange={(e) => changeType(e)}>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                  </select>
                </form>
              </div>
            </nav>
          </div>

          <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {arrayBooks
              .filter((item) => {
                return searchInput.toLowerCase() === ""
                  ? item
                  : item[typeSearch].toLowerCase().includes(searchInput)
              })
              .map((book) => {
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