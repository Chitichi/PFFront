"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useStateContext } from "context/StateContext";
import Swal from "sweetalert2";
import styles from './FormEditUser.module.css'
import Link from "next/link";

const FormEditUser = () => {
  const { user, setUser } = useStateContext();
  const router = useRouter();
  const [botonOff, setBotonOff] = useState(true);
  const [input, setInput] = useState({
    userId: user._id,
    name: user.name,
    address: user.address,
    phoneNumber: user.phoneNumber,
  });
  const [profileImage, setProfileImage] = useState(null);

  function saveLocalStorage(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  
  const handleSubmit = async (e) => {
    console.log("el user", user);
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", input.userId);
    formData.append("name", input.name);
    formData.append("address", input.address);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("image", profileImage);
    try {
      const id = user._id;
 
      await fetch(process.env.RUTA_BACK + `/users/${id}`, {
        method: "PUT",
        body: formData,
      });

      

      const res = await fetch(process.env.RUTA_BACK + `/users/${id}`, {
        method: "GET",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const userData = await res.json();

      setUser({
        ...user,
        name: input.name,
        address: input.address,
        phoneNumber: input.phoneNumber,
        image: { secure_url: userData.image.secure_url },
      });
      saveLocalStorage({
        ...user,
        name: input.name,
        address: input.address,
        phoneNumber: input.phoneNumber,
        image: { secure_url: userData.image.secure_url },
      });
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Your changes were made successfully!",
        showConfirmButton: false,
        timer: 2000,
      });

      router.push("/");
    } catch (err) {
      console.log(err);
    }

    return;
  };
  return (
    <div className={styles.container}>
    <div className={styles.userForm}>
      <div className="text-center">
      <h2 className={styles.h2}>
        Edit Profile
        </h2>
      <img
        src={
          user.image?.secure_url ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
        width={100}
      />
      </div>
      <br />

      <label>
        <strong>
        Image:
        </strong>
      </label>
      <input
        style={{margin: 10}}
        name="image"
        type="file"
        onChange={(event) => {
          setProfileImage(event.target.files[0]);
        }}
        accept="image/*"
      />
      <form onSubmit={(e) => handleSubmit(e)} className={styles.formWrapper}>
        <div>
          <label>
            <strong>
            Name:
            </strong>
          </label>
          <input
            className="form-control"
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="name..."
            value={input.name}
            name="name"
          />
        </div>
        <div>
          <label>
            <strong>
            Address:
            </strong>
          </label>
          <input
            className="form-control"
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="address..."
            value={input.address}
            name="address"
          />
        </div>
        <div>
          <label>
            <strong>
              Phone Number:
            </strong>
          </label>
          <input
            className="form-control"
            onChange={(e) => handleChange(e)}
            type="number"
            placeholder="phoneNumber..."
            value={input.phoneNumber}
            name="phoneNumber"
          />
        </div>
        
        <div className="text-center">
          <button 
          className="btn btn-outline-dark btn-lg m-4"
          type="submit">Accept changes</button>
        </div>
        <div className="text-center">
          <Link href = "/MyProfile">
          <button
          className="btn btn-outline-dark btn-lg m-4"
          >Cancel</button>
          </Link>
        </div>
      </form>
    </div>
    </div>
  );
};

export default FormEditUser;