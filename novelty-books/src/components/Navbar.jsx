import Link from "next/link";

const isLogged = false;
const Navbar = () => (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container px-4 px-lg-5">
          <img  style={{height: 35 }} src="brand.png" alt=""/>
        <a class="navbar-brand" href="#!">
          Novelty Books
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li class="nav-item">
              <Link  href="/">
                <p class="nav-link active" aria-current="page"  >
                  Home
                </p>
              </Link>
            </li>
            <li class="nav-item">
              <Link href="/about">
                <p class="nav-link" >
                  About
                </p>
              </Link>
            </li>
            <li class="nav-item">
              <Link href="/allProducts">
                <p class="nav-link" href="#!">
                  All Products
                </p>
              </Link>
            </li>
          </ul>
          <form class="d-flex">
          <input class="form-control mr-sm-2" type="search" placeholder="Search Books" aria-label="Search"/>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            <button class="btn btn-outline-dark" type="submit">
              <i class="bi-cart-fill me-1"></i>
              Cart
              <span class="badge bg-dark text-white ms-1 rounded-pill">0</span>
            </button>
            {
              isLogged ?
              <Link href="/">
                  <button  
                    style={{marginLeft: 10}}
                    class="btn btn-outline-dark" 
                    type="submit">
               Logout
             </button>
              
            </Link> :
             <Link href="/login">
             <button   
                  style={{marginLeft: 10}}
                  class="btn btn-outline-dark" 
                  type="submit">
               Login
             </button>
           </Link>
            }
           
            
          </form>
        </div>
      </div>
    </nav>
  );
  
  export default Navbar;