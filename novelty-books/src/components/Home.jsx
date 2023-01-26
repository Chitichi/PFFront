"use client";
import React, { useState } from "react";
import Card from "./Card";
import Link from "next/link";

function Landing({ books }) {
  const [home, setHome] = useState({
    searchInput: "",
    typeSearch: "title",
    genreState: "Todos",
    typeOrder: "abc",
    typeSence: "asc",
    arrayBooks: books,
  });

  const [prices, setPrices] = useState({
    min: -Infinity,
    max: Infinity,
  });

  const listGenre = ["Genero", "Todos", "Fantasy", "Sci-Fiction", "Horror"];

  function changePrice(e) {
    const name = e.target.name;
    const value =
      name === "min" ? e.target.value || -Infinity : e.target.value || Infinity;
    setPrices((priceState) => ({ ...priceState, [name]: value }));
    filterBooks({ ...prices, [name]: value });
  }

  const handleChanges = (e) => {
    const { value, name } = e.target;

    switch (name) {
      case "genreState":
        setHome((prev) => ({ ...prev, [name]: value }));
        filterBooks(prices, value);
      case "typeOrder":
        setHome((prev) => ({ ...prev, [name]: value }));
        orderBooks(value, home.typeSence);
      case "typeSence":
        setHome((prev) => ({ ...prev, [name]: value }));
        orderBooks(home.typeOrder, value);
      default:
        setHome((prev) => ({ ...prev, [name]: value }));
    }
  };

  function orderBooks(type, sence) {
    let booksCopy = [...home.arrayBooks];
    if (type === "abc") {
      booksCopy.sort((a, b) => {
        if (a.title > b.title) return 1;
        if (b.title > a.title) return -1;
        return 0;
      });
      sence === "asc"
        ? setHome({ ...home, arrayBooks: booksCopy })
        : setHome({ ...home, arrayBooks: booksCopy.reverse() });
    } else if (type === "price") {
      booksCopy.sort((a, b) => a.price - b.price);
      sence === "asc"
        ? setHome({ ...home, arrayBooks: booksCopy })
        : setHome({ ...home, arrayBooks: booksCopy.reverse() });
    }
  }

  function filterGenre(genre, books) {
    if (genre === "Todos") {
      return books;
    } else {
      return books.filter((book) => book.genre.includes(genre));
    }
  }

  function filterPrice(value, books) {
    const booksFiltered = books.filter((book) =>
      book.price >= value.min && book.price <= value.max ? true : false
    );
    return booksFiltered;
  }

  function filterBooks(priceToFilter, genreToFilter) {
    const price = priceToFilter || prices;
    const genre = genreToFilter === undefined ? home.genreState : genreToFilter;
    const filter1 = filterPrice(price, books);
    const filter2 = filterGenre(genre, filter1);
    setHome({ ...home, arrayBooks: filter2 });
  }

  React.useEffect(() => {
    filterBooks(prices, home.genreState);
  }, [prices, home.genreState]);

  return (
    <>
      <section className="py-5 bg-light">
        <div className="container px-4 px-lg-5 mt-5">
          <h2 className="fw-bolder mb-4">Popular books</h2>

          <div style={{ margin: 5 }} className="d-flex flex-row-reverse">
            <nav className="navbar bg-body-tertiary">
              <div className="container-fluid">
                <form className="d-flex" role="search">
                  <label>Precio: </label>

                  <input
                    className="form-control me-2"
                    type="search"
                    name="max"
                    placeholder="max"
                    aria-label="Search"
                    onChange={changePrice}
                  ></input>

                  <input
                    className="form-control me-2"
                    type="search"
                    name="min"
                    placeholder="min"
                    aria-label="Search"
                    onChange={changePrice}
                  ></input>

                  <select name="genreState" onChange={handleChanges}>
                    {listGenre.map((genre, index) =>
                      genre !== "Genero" ? (
                        <option key={index} value={genre}>
                          {genre}
                        </option>
                      ) : (
                        <option key={index} value={genre} hidden>
                          {genre}
                        </option>
                      )
                    )}
                  </select>

                  <select name="typeOrder" onChange={handleChanges}>
                    <option hidden>Orden</option>
                    <option value="abc">Alfabetico</option>
                    <option value="price">Price</option>
                  </select>

                  <select name="typeSence" onChange={handleChanges}>
                    <option hidden>Sentido</option>
                    <option value="asc">Ascendente</option>
                    <option value="des">Descendente</option>
                  </select>

                  <input
                    className="form-control me-2"
                    type="search"
                    name="searchInput"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={handleChanges}
                  ></input>

                  <select name="typeSearch" onChange={handleChanges}>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                  </select>
                </form>
              </div>
            </nav>
          </div>

          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {home.arrayBooks
              .filter((item) => {
                return home.searchInput.toLowerCase() === ""
                  ? item
                  : item[home.typeSearch]
                      .toLowerCase()
                      .includes(home.searchInput);
              })
              .map((book, key) => {
                return (
                  <Link href={`/detailBook/${book._id}`} key={key}>
                    <Card
                      key={key}
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
