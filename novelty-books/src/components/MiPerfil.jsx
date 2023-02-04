"use client";
import React from "react";
import { useStateContext } from "../../context/StateContext";
import { useRouter } from "next/navigation";

function MyProfile() {
  const { user } = useStateContext();
  const router = useRouter();
  function back() {
    if (user.name) {
      router.push(`/profile/${user.name}`);
    } else {
      router.push("/");
    }
  }
  return (
    <div class="row "style={{ margin: 100 }}>
      <div class="col-lg-4 offset-lg-4">
        <h2 class="card-title text-center ">
          Welcome to your profile {user.name}{" "}
        </h2>

        <div>
          <h4 class="card-text text-center mt-2">Your data:</h4>
          <div class="row mt-2">
            <div class="col-lg-4 offset-lg-4">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                width={100}
                style={{ marginTop: 50 }}
              />
            </div>
          </div>
          <p class="mt-2"><strong>Name:</strong> {user.name}</p>
          <p class="mt-2"><strong>Email:</strong> {user.email}</p>
          <p class="mt-2"><strong>Address:</strong> {user.address}</p>
          <p class="mt-2"><strong>Phone Number:</strong> {user.phoneNumber}</p>
        </div>

        <div class="row mt-2" style={{ margin: 10 }}>
          <div class="col-lg-4 offset-lg-4">
            <button className="btn btn-outline-dark" onClick={back}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
