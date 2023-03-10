"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useStateContext } from "context/StateContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  const { cartItems, totalQuantities, setTotalQuantities, user, setUser } =
    useStateContext();
  //const router = useRouter();

  function updateUser() {
    if (typeof window !== "undefined" && !user.name) {
      const userLocalStorage = JSON.parse(localStorage.getItem("user"));
      userLocalStorage ? setUser(userLocalStorage) : null;
    }
  }

  const subQuantities = cartItems
    .map((q) => q?.quantity)
    .reduce((prev, current) => prev + current, 0);

  React.useEffect(() => {
    updateUser();
    setTotalQuantities(subQuantities);
  }, [updateUser]);

  function logout() {
    setUser({});
    localStorage.removeItem("user");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container px-4 px-lg-5">
        <img style={{ height: 35 }} src="brand.png" alt="" />
        Novelty Books
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <Link href={"/"}>
                <button className="btn btn-outline-dark">Home</button>
              </Link>
            </li>
          </ul>
          {!user.name ? ( // si no estamos logueados mostramos el boton para crear cuenta.
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                <li className="nav-item">
                  <Link href="/SignUp">
                    <button className="btn btn-outline-dark" type="submit">
                      SignUp
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          ) : null}
          {user.rolAdmin ? ( // si somos administrador mostramos la ruta para el administrador.
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                <li className="nav-item">
                  <Link href="/admin">
                    <button className="btn btn-outline-dark" type="submit">
                      Admin
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          ) : null}

          <div className="d-flex">
            <Link href="/cart">
              <button className="btn btn-outline-dark" type="submit">
                <i className="bi-cart-fill me-1"></i>
                Cart
                <span className="badge bg-dark text-white ms-1 rounded-pill">
                  {subQuantities}
                </span>
              </button>
            </Link>

            {user.name ? (
              <Link href="/MyProfile">
                <button
                  className="btn btn-outline-dark"
                  type="submit"
                  style={{ marginLeft: 10 }}
                >
                  My Profile
                </button>
              </Link>
            ) : null}
            {user.name ? (
              <Link href="/myPurchases">
                <button
                  className="btn btn-outline-dark"
                  type="submit"
                  style={{ marginLeft: 10 }}
                >
                  Mi Purchases
                </button>
              </Link>
            ) : null}
            {user.rolAdmin ? (
              <Link href="/createBookForm">
                <button className="btn btn-outline-dark" type="submit" style={{ marginLeft: 10 }}>
                  Create Book
                </button>
              </Link>
            ) : null}
            {user.name ? (
              <Link href="/">
                <button
                  onClick={logout}
                  style={{ marginLeft: 10 }}
                  className="btn btn-outline-dark"
                  type="submit"
                >
                  Logout
                </button>
              </Link>
            ) : (
              <Link href="/login">
                <button
                  style={{ marginLeft: 10 }}
                  className="btn btn-outline-dark"
                  type="submit"
                >
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
        <div className="d-flex">
          <img
            src={
              user.image?.secure_url ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            height={45}
            style={{ marginLeft: 10, borderRadius: "50%" }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
