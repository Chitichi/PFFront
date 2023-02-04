"use client";
import React from "react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import styles from "./SignUpForm.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { SHA256 } from "crypto-js";

const validacion = (input) => {
  let errores = {};
  if (!input.name) errores.name = "Name required";
  if (input.name.length > 50)
    errores.name = "The name must contain up to 50 characters";

  if (
    !/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/.test(
      input.email
    )
  )
    errores.email = "Invalid email format";
  if (!input.password) errores.password = "Password required";
  if (input.password.length < 6)
    errores.password = "The password must contain at least 6 characters";

  return errores;
};

function SignUpForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [botonOff, setBotonOff] = useState(true);
  const [errores, setErrores] = useState({ name: "" });
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
  });
  const [userSession, setUserSession] = useState({ ...session });

  function encrypt(data) {
    return SHA256(data).toString();
  }

  useEffect(() => {
    if (Object.keys(errores).length === 0) {
      setBotonOff(false);
    } else {
      setBotonOff(true);
    }
  }, [errores]);

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrores(
      validacion({
        //primero hago de setear el input, y despues le digo seteame el estado errores pasandole la función validate y lo renderizo abajo en cada input,abajo de onchange(handlechange)en el caso de que suceda
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userSession = session
      ? {
          name: session.user.name,
          email: session.user.email,
          password: encrypt(session.user.email),
        }
      : {
          ...input,
        };

    try {
      // Send a request to the server to create a new book using the form data
      const response = await fetch(process.env.RUTA_BACK + "/users/signup", {
        method: "POST",
        body: JSON.stringify(userSession),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 400) {
          Swal.fire({
            title: "Oops! error",
            text: "Error user register already with that email.",
            icon: "error",
            timer: 3000,
          });
          return;
        } else {
          Swal.fire({
            title: "Oops! error",
            text: "An unexpected error occurred.",
            icon: "error",
            timer: 3000,
          });
          return;
        }
      }

      Swal.fire({
        title: "User created",
        text: "Your user was created successfully!",
        icon: "success",
        timer: 3000,
      });
      router.push("/");
    } catch (err) {
      Swal.fire({
        title: "Oops! error",
        text: "An error occurred while sending the request.",
        icon: "error",
        timer: 3000,
      });
      return;
    }
  };

  const overSubmit = () => {
    if (session) {
      setInput({
        name: session.user.name,
        email: session.user.email,
        password: encrypt(session.user.email),
      });
    }
  };
  useEffect(() => {
    overSubmit();
  }, []);

  return (
    <form className={styles.userForm} onSubmit={(e) => handleSubmit(e)}>
      {session ? (
        <div className="text-center">
          <h4>You will create your account as</h4>
          <img src={session.user.image} height="100px" />
          <h2>{session.user.name}</h2>
        </div>
      ) : (
        <>
          <div>
            <label className={styles.formControl}>Name:</label>
            <input
              className={styles.formControl}
              onChange={(e) => handleChange(e)}
              type="text"
              placeholder="name..."
              value={input.name}
              name="name"
            />
            {errores.name && ( //pregunto si está errors.name y si está hago un parrafo con ese error(errors.name)
              <p>{errores.name}</p>
            )}
          </div>
          <div>
            <label className={styles.formControl}>Email:</label>
            <input
              className={styles.formControl}
              onChange={(e) => handleChange(e)}
              type="text"
              placeholder="email..."
              value={input.email}
              name="email"
            />
            {errores.email && <p>{errores.email}</p>}
          </div>
          <div>
            <label className={styles.formControl}>Password:</label>
            <input
              className={styles.formControl}
              onChange={(e) => handleChange(e)}
              type="password"
              placeholder="password..."
              value={input.password}
              name="password"
            />
            {errores.password && <p>{errores.password}</p>}
          </div>
          <div>
            <label className={styles.formControl}>Address:</label>
            <input
              className={styles.formControl}
              onChange={(e) => handleChange(e)}
              type="text"
              placeholder="address..."
              value={input.address}
              name="address"
            />
            {errores.address && <p>{errores.address}</p>}
          </div>
          <div>
            <label className={styles.formControl}>Phone Number:</label>
            <input
              className={styles.formControl}
              onChange={(e) => handleChange(e)}
              type="number"
              placeholder="phoneNumber..."
              value={input.phoneNumber}
              name="phoneNumber"
            />
            {errores.phoneNumber && <p>{errores.phoneNumber}</p>}
          </div>
        </>
      )}

      <div>
        {session ? (
          <div className="text-center">
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        ) : (
          <div className="text-center">
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in With Google/GitHub</button>
          </div>
        )}
        <div className="text-center">
          <button
            className={styles.buttonControl}
            onClick={handleSubmit}
            type="submit"

            //   disabled={botonOff}
          >
            Create User
          </button>
        </div>
      </div>
    </form>
  );
}

export default SignUpForm;
