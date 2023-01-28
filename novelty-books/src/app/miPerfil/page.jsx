"use client"
import React from "react";
import { useStateContext } from "../../../context/StateContext";

    function MiPerfil() {
    const {user} = useStateContext();
  
            return(
                
                <div>
                <h1>Welcome to your profile {user.name} </h1>
                
                <div>
                    <h3>Your data</h3>
                    <h4> Name: {user.name}</h4>
                    <h4> Email: {user.email}</h4>
                    <h4> Address: {user.address}</h4>
                    <h4> Phone Number: {user.phoneNumber}</h4>
                </div>
                </div>
                    )
}
    

export default MiPerfil;