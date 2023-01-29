"use client";
import React, { useState } from "react";
import Card from "./Card";
import Link from "next/link";
import styles from './Home.module.css'
import { useStateContext } from "../../context/StateContext";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

function Landing({ books }) {
  const { user } = useStateContext();
  const router = useRouter();
  const pathName = usePathname();

  if (user.name && !pathName.includes("profile")) {
    router.push(`/profile/${user.name}`)
  }

  const [home, setHome] = useState({
    searchInput: "",
    typeSearch: "title",
    genreState: "Todos",
    arrayBooks: books,
  });

  const [prices, setPrices] = useState({
    min: -Infinity,
    max: Infinity,
  });

  const [orderSence, setOrderSence] = useState(['abc', 'as'])

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
      default:
        setHome((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleOrder = (e) => {
    const { id } = e.target;
    const [valueOrder, valueSence] = id.split(",")
    setOrderSence([valueOrder, valueSence]);
    orderBooks(orderSence[0], valueSence);
  };

  function orderBooks(type, sence) {
    console.log(type, sence)
    let booksCopy = [...home.arrayBooks];
    if (type === "abc") {
      booksCopy.sort((a, b) => {
        if (a.title > b.title) return 1;
        if (b.title > a.title) return -1;
        return 0;
      });
      sence === "as"
        ? setHome({ ...home, arrayBooks: booksCopy })
        : setHome({ ...home, arrayBooks: booksCopy.reverse() });
    } else if (type === "price") {
      booksCopy.sort((a, b) => a.price - b.price);
      sence === "as"
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


  // fw-bolder mb-4
  return (
    <>
      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">{
              user.name ? `Welcome ${user.name}` : "Novelty Books"
            }</h1>
          </div>
        </div>
      </header>

      <section className="py-5 bg-light">
        <h2 className={`fw-bolder mb-4 ${styles.popularBooks}`}> Popular books</h2>
        <div className={`container px-lg-5 mt-5 ${styles.gridWrapper}`}>

          <div className={`d-flex flex-row-reverse ${styles.gridFilters}`}>
            <nav className="navbar bg-body-tertiary">
              <div className="container-fluid">
                <form className="d-flex" role="search">
                  <label>Precio:

                    <div className={styles.pricesDiv}>
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
                    </div>
                  </label>
                  <div className={styles.genreOrderSence}>
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

                    <ul className={`${styles["nested-dropdowns"]}`}>
                      <li>
                        <div >
                          Ordenar por: 
                          {orderSence[0]==="abc" && orderSence[1]==="as"?" A-Z":null}
                          {orderSence[0]==="abc" && orderSence[1]==="des"?" Z-A":null}
                          {orderSence[0]==="price" && orderSence[1]==="as"?" Z-A":null}
                          {orderSence[0]==="price" && orderSence[1]==="des"?" Z-A":null}
                          <i className="bi bi-caret-down-square-fill" style={{position:"absolute",right: 5}}></i>
                        </div>
                        <ul>
                          <li onClick={handleOrder} id="abc,as" className="typeSence">A-Z</li>
                          <li onClick={handleOrder} id="abc,des" className="typeSence">Z-A</li>

                          <li onClick={handleOrder} id="price,as" className="typeSence">Menor precio</li>
                          <li onClick={handleOrder} id="price,des" className="typeSence">Mayor precio</li>
                        </ul>
                      </li>
                    </ul>

                  </div>

                  <div className={styles.searchDiv}>
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
                  </div>
                </form>
              </div>
            </nav>
          </div>

          <div
            className={`row gx-3 gx-lg-5 row-cols-xl-3 justify-content-center" ${styles.gridCards}`}
          >
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
                  <Link href={`/detailBook/${book._id}`} key={key} className={styles.link}>
                    <Card
                      key={key}
                      title={book.title}
                      author={book.author}
                      image={book.image.secure_url || book.image}
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
