"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useStateContext } from "context/StateContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
 // const {profile} = params;

  const { totalQuantities , user, setUser } = useStateContext();
  const router = useRouter();
 //const user = pathName.includes("profile") ? pathName.slice(9) : null
  function redirectHome(){
   if (user.name){
    router.push(`/profile/${user.name}`);
   } else {
    router.push("/");
   }
  }


  function logout(){
    setUser({});
  } 


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
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li class="nav-item">
              <button 
              onClick={redirectHome}
              class="btn btn-outline-dark"
              >
                <p class="nav-link active" aria-current="page"  >
                  Home
                </p>
              </button>
            </li>
           
          </ul>
          {
             Object.keys(user).length === 0 ? // si no estamos logueados mostramos el boton para crear cuenta.
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li class="nav-item">
              <Link  href="/SignUp">
                <p className="nav-link active" aria-current="page"  >
                  SignUp
                </p>
              </Link>
            </li>
           
          </ul>
          </div> : null
          }
       

          <form className="d-flex">
            <Link href="/cart">
              <button className="btn btn-outline-dark" type="submit">
                <i className="bi-cart-fill me-1"></i>
                Cart
                <span className="badge bg-dark text-white ms-1 rounded-pill">{totalQuantities}</span>
              </button>
            </Link>
            {
              pathName === "/login" || pathName === "/SignUp" ? null :
              pathName !== "/" ?
              <Link href="/">
                  <button  
                    onClick={logout}
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
          {
          pathName === `/profile/${user.name}`? 
          <Link href="/miPerfil">
            <button>
              Mi Perfil
            </button>
          </Link> : null
          


          }
           
            
          </form>
        </div>
      </div>
    </nav>
  )
};
  
  export default Navbar;