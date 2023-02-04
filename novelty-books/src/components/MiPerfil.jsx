"use client";
import React from "react";
import { useStateContext } from "../../context/StateContext";
import { useRouter } from "next/navigation";

function MyProfile(props) {
    let {user} = useStateContext()
    user = !props.user ? user : props.user
    const router = useRouter();
    function back() {
        router.push("/");
    }
    return (
        <div className="row " style={{ margin: 100 }}>
            {
                user ?
                    <div className="col-lg-4 offset-lg-4">
                        <h2 className="card-title text-center ">
                            Welcome to your profile {user.name}{" "}
                        </h2>

                        <div>
                            <h4 className="card-text text-center mt-2">Your data:</h4>
                            <div className="row mt-2">
                                <div className="col-lg-4 offset-lg-4">
                                    <img
                                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                        width={100}
                                        style={{ marginTop: 50 }}
                                    />
                                </div>
                            </div>
                            <p className="mt-2"><strong>Name:</strong> {user.name}</p>
                            <p className="mt-2"><strong>Email:</strong> {user.email}</p>
                            <p className="mt-2"><strong>Address:</strong> {user.address}</p>
                            <p className="mt-2"><strong>Phone Number:</strong> {user.phoneNumber}</p>
                        </div>

                        <div className="row mt-2" style={{ margin: 10 }}>
                            <div className="col-lg-4 offset-lg-4">
                                <button className="btn btn-outline-dark" onClick={back}>
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                    : null
            }

        </div>
    );
}

export default MyProfile;
