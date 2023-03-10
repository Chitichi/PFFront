"use client";
import React from "react";
import { useStateContext } from "../../context/StateContext";
import { useRouter } from "next/navigation";
import styles from "./MiPerfil.module.css";

function MyProfile(props) {
  let { user } = useStateContext();
  user = !props.user ? user : props.user;
  const router = useRouter();

  function back() {
    router.push("/");
  }
  function editar() {
    router.push("/FormEdit");
  }
  return (
    <div className={styles.container}>
      <div className={styles.userForm}>
          {user ? (
           <div className="text-center">
              <h2 className={styles.h2}>
                Welcome to your profile {user.name}{" "}
              </h2>

              <div>
                <h4 className="card-text text-center mt-2">Your data:</h4>
                <div className="row mt-2">
                  <div className="col-lg-4 offset-lg-4">
                    <img
                      src={
                        user.image?.secure_url ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      }
                      width={100}
                    />
                  </div>
                </div>
                <p className="mt-2">
                  <strong>Name:</strong> {user.name}
                </p>
                <p className="mt-2">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="mt-2">
                  <strong>Address:</strong> {user.address}
                </p>
                <p className="mt-2">
                  <strong>Phone Number:</strong> {user.phoneNumber}
                </p>
              </div>

              <div className="row mt-2" style={{ margin: 10 }}>
                <div className="col-lg-4 offset-lg-4">
                  <button className="btn btn-outline-dark m-2" onClick={back}>
                    Back
                  </button>
                  <button className="btn btn-outline-dark " onClick={editar}>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        
      </div>
    </div>
  );
}

export default MyProfile;
