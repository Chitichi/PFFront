"use client"
import React from "react";
import { useStateContext } from "../../context/StateContext";
import { useRouter } from "next/navigation";

    function miPerfil() {
    const {user} = useStateContext();
    const router = useRouter(); 
    function back(){
        if (user.name) {
            router.push(`/profile/${user.name}`);
          } else {
            router.push("/");
          }
        }
            return(
                
                <div>
                <h1>Welcome to your profile {user.name} </h1>
                
                <div>
                    <h3>Your data</h3>
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" width={100} />
                    <h4> Name: {user.name}</h4>
                    <h4> Email: {user.email}</h4>
                    <h4> Address: {user.address}</h4>
                    <h4> Phone Number: {user.phoneNumber}</h4>
                </div>
                <button
                onClick={back}>
                    Back
                </button>
                </div>
                    )
}
    

export default miPerfil;