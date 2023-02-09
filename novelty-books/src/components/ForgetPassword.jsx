"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useStateContext } from "context/StateContext";
import Swal from "sweetalert2";
import styles from "./ForgetPassword.module.css";
const ForgetPassword = ({ userFetch }) => {
  const { user, setUser } = useStateContext();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password === confPass) {
        const dataUser = new FormData();
        dataUser.append("userId", userFetch._id);
        dataUser.append("password", password);
        const id = userFetch._id;

        const res = await fetch(process.env.RUTA_BACK + `/users/${id}`, {
          method: "PUT",
          body: dataUser,
        });
        const data = await res.json();
        console.log(data);

        Swal.fire({
          position: "top",
          icon: "success",
          title: "Your changes were made successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
        router.push("/");
      } else
        Swal.fire({
          position: "top",
          icon: "error",
          title: "The passwords do not match!",
          showConfirmButton: false,
          timer: 2000,
        });
      setConfPass("");
      setPassword("");
    } catch (err) {
      console.log(err);
    }
    return;
  };

  return (
    <div className={styles.container}>
    <form className={styles.userForm} onSubmit={(e) => handleSubmit(e)}>
      <div>
        <h2 className={styles.h2}>Enter your new password</h2>
        <label>New Password:</label>
        <input
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password..."
          value={password}
          name="password"
        />
      </div>
      <div>
        <label>Confirm New Password:</label>
        <input
          className="form-control"
          onChange={(e) => setConfPass(e.target.value)}
          type="password"
          placeholder="Confirm password..."
          value={confPass}
          name="confirmPassword"
        />
      </div>
      <div className="text-center">
        <button className="btn btn-outline-dark btn-lg m-4" type="submit">Change password</button>
      </div>
    </form>
  </div>
  );
};

export default ForgetPassword;
