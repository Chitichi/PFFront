"use client";
import { useState } from "react";
import style from "./page.module.css";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useStateContext } from "context/StateContext";
import { useSession, signIn, signOut } from "next-auth/react";
import { SHA256 } from "crypto-js";
import Link from "next/link";

function Login() {
  const { user, setUser } = useStateContext();
  const router = useRouter();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { data: session } = useSession();
  const [userSession, setUserSession] = useState({ ...session });

  function encrypt(data) {
    return SHA256(data).toString();
  }

  function saveLocalStorage(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userSession = session
      ? {
          email: session.user.email,
          password: encrypt(session.user.email),
        }
      : {
          ...input,
        };
    try {
      // Send a request to the server to create a new book using the form data

      const res = await fetch(process.env.RUTA_BACK + "/users/login", {
        method: "POST",
        body: JSON.stringify(userSession),
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
      Swal.fire({
        title: "error",
        text: "invalid email or password",
        icon: "error",
        timer: 3000,
      });
      console.log(err);
    }

    // navigation("/");
    //alert ( `${emailUser}, ${passUser}`)
  };
  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.formulario}>
        {session ? (
          <div className="text-center">
            <h4>You will log in as</h4>
            <img src={session.user.image} height="100px" />
            <h2>{session.user.name}</h2>
          </div>
        ) : (
          <>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={input.email}
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={input.password}
                name="password"
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {session ? (
          <div className="text-center">
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        ) : (
          <div className="text-center">
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in with Google/GitHub</button>
          </div>
        )}
        <div className="text-center">
          <button className={style.button} type="submit" onClick={handleSubmit}>
            Login
          </button>
        </div>
        <div>
          <Link href={"/enterEmail"}>
            <h5> Did you forget your password?</h5>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
