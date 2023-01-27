"use client"
import React, { useState } from "react"
import Card from "./Card";
//import booksArray from "../books Array/books.json";
//import BookCard from "../components/BookCard";
// import books from "@/books Array/books1";
import Link from "next/link";
import { useStateContext } from "../../context/StateContext";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

function Landing({books}) {
  const {user} = useStateContext();
  const router = useRouter();
  const pathName = usePathname();

  if(user.name && !pathName.includes("profile")) {
     router.push(`/profile/${user.name}`)}


  const [searchInput, setSearchInput] = useState("");
  const [typeSearch, setTypeSearch] = useState('title');
  const [genreState, setGenre] = useState("")
  const [priceState, setPrice] = useState({ min: -Infinity, max: Infinity })
  const [typeOrder, setTypeOrder] = useState('abc');
  const [typeSence, setTypeSence] = useState("asc");
  const [arrayBooks, setArrayBooks] = useState(books)
  
  const listGenre = [
    "Genero",
    "Todos",
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
    orderBooks(typeOrder, e.target.value)
  };

  const filterSearch = () => {
    setArrayBooks(arrayBooks => {
      return arrayBooks.filter(book => searchInput.toLowerCase() === "" ? true : book[typeSearch].toLowerCase().includes(searchInput))
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
      sence === "asc" ? setArrayBooks(booksCopy) : setArrayBooks(booksCopy.reverse())
    } else if (type === "price") {
      booksCopy.sort((a, b) => a.price - b.price)
      sence === "asc" ? setArrayBooks(booksCopy) : setArrayBooks(booksCopy.reverse())
    }
  }

  const changeGenre = (e) => {
    e.preventDefault()
    setGenre(e.target.value)
    filterBooks(priceState, e.target.value)
  }

  function filterGenre(genre, books) {
    if (genre === "Todos") {
      return books
    } else {
      return books.filter(book => book.genre.includes(genre))
    }
  }

  function changePrice(e) {
    const name = e.target.name
    const value = name === "min" ? e.target.value || -Infinity : e.target.value || Infinity
    setPrice(priceState => ({ ...priceState, [name]: value }))
    filterBooks({ ...priceState, [name]: value })
  }

  function filterPrice(value, books) {
    const booksFiltered = books.filter((book) => book.price >= value.min && book.price <= value.max ? true : false)
    return booksFiltered
  }

  function filterBooks(priceToFilter, genreToFilter) {
    const price = priceToFilter || priceState
    const genre = genreToFilter === undefined ? genreState : genreToFilter
    const filter1 = filterPrice(price, books)
    const filter2 = filterGenre(genre, filter1)
    setArrayBooks(filter2)

  }

  return (
    <>
      <header class="bg-dark py-5">
        <div class="container px-4 px-lg-5 my-5">
          <div class="text-center text-white">
            <h1 class="display-4 fw-bolder">{
              user.name ? `Welcome ${user.name}`: "Novelty Books"
            }</h1>
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

                  <label>Precio: </label>

                  <input
                    class="form-control me-2"
                    type="search"
                    name="max"
                    placeholder="max"
                    aria-label="Search"
                    onChange={(e) => changePrice(e)}
                  ></input>
                  
                  <input
                    class="form-control me-2"
                    type="search"
                    name="min"
                    placeholder="min"
                    aria-label="Search"
                    onChange={(e) => changePrice(e)}
                  ></input>

                  <select name="filter" onChange={(e) => { changeGenre(e) }}>
                    {
                      listGenre.map((genre, index) => genre !== "Genero"? <option key={index} value={genre}>{genre}</option>: <option key={index} value={genre} hidden>{genre}</option>)
                    }
                  </select>

                  <select name="filter" onChange={(e) => {
                    changeOrder(e)
                  }}>
                    <option hidden>Orden</option>
                    <option value="abc">Alfabetico</option>
                    <option value="price">Price</option>
                  </select>

                  <select name="filter" onChange={(e) => {
                    changeSence(e)
                  }}>
                    <option hidden>Sentido</option>
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
            {
              arrayBooks.filter((item) => {
                return searchInput.toLowerCase() === "" ?
                  item :
                  item[typeSearch].toLowerCase().includes(searchInput)
              })
                .map((book) => {
                  return (
                    <Link href={`/detailBook/${book._id}`}>
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
