"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useStateContext } from "context/StateContext";
import Swal from "sweetalert2";
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

  //  console.log(input, "soy el input de handle change");
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
      // console.log(id, "hola soy tu id"); hasta aca todo ok.
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
    <div>
      <img
        src={
          user.image?.secure_url ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
        width={100}
      />
      <br />
      <label>Image:</label>
      <input
        name="image"
        type="file"
        onChange={(event) => {
          setProfileImage(event.target.files[0]);
        }}
        accept="image/*"
      />
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name:</label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="name..."
            value={input.name}
            name="name"
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="address..."
            value={input.address}
            name="address"
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            onChange={(e) => handleChange(e)}
            type="number"
            placeholder="phoneNumber..."
            value={input.phoneNumber}
            name="phoneNumber"
          />
        </div>
        
        <div>
          <button type="submit">Accept changes</button>
        </div>
        <div>
          <Link href = "/MyProfile">
          <button>Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default FormEditUser;