import React from "react";
import { useStateContext } from "../../context/StateContext";

   async function MiPerfil() {
    const {id} = useStateContext();
        const res = await fetch(`http://localhost:3001/users/${id}`, {
    method: "GET",
    body: JSON.stringify(),
    headers: {
        "Content-Type": "application/json",
      },
  });
    const data = await res.json();
    console.log( "hola soy tu data", data)
                 
    {data.map((e)=>{
            return(
                <>
                    <h1> name = {e.name}</h1>
                    <h2> email={e.email}</h2>
                    <h3> address={e.address}</h3>
                    <h4> phoneNumber={e.phoneNumber}</h4>
                </> )
                     
                 })


}
    }

export default MiPerfil;