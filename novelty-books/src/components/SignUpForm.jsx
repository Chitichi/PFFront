"use client";
import React from "react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useStateContext } from "../../context/StateContext";
import styles from "./SignUpForm.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { SHA256 } from "crypto-js";
import FormData from "form-data";

const validacion = (input) => {
  let errores = {};
  if (!input.name) errores.name = "Name required";
  if (input.name.length > 50)
    errores.name = "The name must contain up to 50 characters";
  //   if (!/^[a-zA-Z\s]+$/.test(input.name))
  //     errores.name = "Invalid name, only characters allowed";
  if (
    !/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/.test(
      input.email
    )
  )
    errores.email = "Invalid email format";
  if (!input.password) errores.password = "Password required";
  if (input.password.length < 6)
    errores.password = "The password must contain at least 6 characters";
  //   if (!/^[a-zA-Z\s]+$/.test(input.address))
  //     errores.address = "Invalid address, only characters allowed";
  //   if (!input.phoneNumber) errores.phoneNumber = "Phone Number required";
  //   if (input.phoneNumber.length < 11 || input.phoneNumber.length > 25)
  //     errores.phoneNumber = "The phone number must contain 11 to 25 characters";
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
    phoneNumber: 0,
  });
  const [userSession, setUserSession] = useState({ ...session });
  //   console.log("hola papi", userSession);
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
  useEffect(() => {
    //  if(userSession){
    //   setInput({
    //     name: session.user.name,
    //     email: session.user.email,
    //     password: encrypt(session.user.email),
    //   });
    //   let encrypted = encrypt("hola");
    //   console.log("estoy desde el useEffect", encrypted);
    // }
  }, []);
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
    // const formData = new FormData();
    //     if (session) {
    //     //   formData.append("name", session.user.name);
    //     //   formData.append("email", session.user.email);
    //     //   formData.append("password", encrypt(session.user.email));
    //     } else {
    //       formData.append("name", input.name);
    //       formData.append("email", input.email);
    //       formData.append("password", input.password);
    //       formData.append("address", input.address);
    //       formData.append("phoneNumber", input.phoneNumber);
    //   }
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
      await fetch(process.env.RUTA_BACK + "/users/signup", {
        method: "POST",
        body: JSON.stringify(userSession),
        headers: {
          "Content-Type": "application/json",
        },
      });
      //console.log(res, "hola soy tu res")
      //   const data = await res.json();

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
        text: "Error user register already with that email.",
        icon: "error",
        timer: 3000,
      });
      return;
    }

    setInput({
      name: "",
      email: "",
      password: "",
      address: "",
      phoneNumber: 0,
    });
    router.push("/");
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
          <img src={session.user.image} />
          <h2>{session.user.name}</h2>
          <h3>{session.user.email}</h3>
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
            //   type="submit"

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
