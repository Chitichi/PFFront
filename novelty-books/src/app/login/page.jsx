"use client";
import { useState } from "react";
import style from "./page.module.css";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useStateContext } from "context/StateContext";
//import { useLocation } from "react-router-dom"
import { useSession, signIn, signOut } from "next-auth/react";

function Login() {
  const { user, setUser } = useStateContext();
  const router = useRouter();
  const [emailUser, setEmailUser] = useState("");
  const [passUser, setPassUser] = useState("");
  //const [, navigation] = useLocation();

  const { data: session } = useSession();

  function saveLocalStorage(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a request to the server to create a new book using the form data

      const res = await fetch(process.env.RUTA_BACK + "/users/login", {
        method: "POST",
        body: JSON.stringify({ email: emailUser, password: passUser }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      //console.log(res, "hola soy tu res")
      const data = await res.json();

      if (data === "User not found") {
        Swal.fire({
          title: "Email not found!",
          text: "Enter a valid e-mail",
          icon: "error",
          timer: 3000,
        });
      } else if (typeof data === "object") {
        setUser(data);
        saveLocalStorage(data);
        router.push(`/`);
      }
    } catch (err) {
      console.log(err);
    }

    // navigation("/");
    //alert ( `${emailUser}, ${passUser}`)
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={style.formulario}>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={emailUser}
            onChange={(e) => setEmailUser(e.target.value)}
          />
          {/* <small id="emailHelp" 
                       className="form-text text-muted">We'll never share your email with anyone else.</small>*/}
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={passUser}
            onChange={(e) => setPassUser(e.target.value)}
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <div className="text-center"></div>

        <div className="text-center">
          <button className={style.button} type="submit" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </form>
      {session ? (
        <div className="text-center">
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <div className="text-center">
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      )}
    </div>
  );
}

export default Login;
