"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useStateContext } from "context/StateContext";
import Swal from "sweetalert2";

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
    <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        <label>New Password:</label>
        <input
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
          onChange={(e) => setConfPass(e.target.value)}
          type="password"
          placeholder="confirmPassword..."
          value={confPass}
          name="confirmPassword"
        />
      </div>
      <div>
        <button type="submit">Edit</button>
      </div>
    </form>
  );
};

export default ForgetPassword;
