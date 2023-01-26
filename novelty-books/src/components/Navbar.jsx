"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useStateContext } from "context/StateContext";

const Navbar = () => {
  const pathName = usePathname();
 // const {profile} = params;

  const { totalQuantities} = useStateContext();

 const user = pathName.includes("profile") ? pathName.slice(9) : null
 
   


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container px-4 px-lg-5">
          <img  style={{height: 35 }} src="brand.png" alt=""/>
        <a className="navbar-brand" href="#!">
          Novelty Books
        </a>
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
              <Link  href="/">
                <p className="nav-link active" aria-current="page"  >
                  Home
                </p>
              </Link>
            </li>
           
          </ul>
          {
            !user && // si no estamos logueados mostramos el boton para crear cuenta.
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li class="nav-item">
              <Link  href="/SignUp">
                <p class="nav-link active" aria-current="page"  >
                  SignUp
                </p>
              </Link>
            </li>
           
          </ul>
          </div>
          }
          {
            user &&
          <label style={{paddingRight:20}}>
            Welcome {user}
          </label> 
            }

          <form class="d-flex">
            <Link href="/cart">
              <button class="btn btn-outline-dark" type="submit">
                <i class="bi-cart-fill me-1"></i>
                Cart
                <span class="badge bg-dark text-white ms-1 rounded-pill">{totalQuantities}</span>
              </button>
            </Link>
            {
              pathName === "/login" ? null :
              pathName !== "/" ?
              <Link href="/">
                  <button  
                    style={{marginLeft: 10}}
                    className="btn btn-outline-dark" 
                    type="submit">
               Logout
             </button>
          
              
            </Link> :
             <Link href="/login">
             <button   
                  style={{marginLeft: 10}}
                  className="btn btn-outline-dark" 
                  type="submit">
               Login
             </button>
           </Link>
            }
           
            
          </form>
        </div>
      </div>
    </nav>
  )
};
  
  export default Navbar;