"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useStateContext } from "context/StateContext";


const FormEditUser = ()=> {
    const {user ,id} = useStateContext();
    const router = useRouter();
    const [botonOff, setBotonOff] = useState(true)
    const [input, setInput] = useState({
        userId: user._id,
        name: user.name,
        email: user.email,
        address:user.address,
        phoneNumber: user.phoneNumber,
    });
    //console.log(input, "hola soy tu puto input");
        

    
        function handleChange(e){
        e.preventDefault();
        setInput({ 
            ...input, 
            [e.target.name]:e.target.value
        })
    }
  //  console.log(input, "soy el input de handle change");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const id = user._id
           // console.log(id, "hola soy tu id"); hasta aca todo ok.
          const res = await fetch(process.env.RUTA_BACK+`/users/${id}`, {
              method: "PUT",
              body: JSON.stringify(input),
              headers: {
                  "Content-Type": "application/json",
                },
            });
            const data = await res.json();
          console.log(data);
        } catch (err) { 
            console.log(err)
            }
            return 
        }
    return (
        
        <form onSubmit={(e) => handleSubmit(e)}>
        <div>
            <label >Name:</label>
            <input
            onChange={(e) => handleChange(e)}
            type= "text"
            placeholder='name...'
            value = {input.name}
            name = "name"
            />
        </div>
        <div>
            <label >Email:</label>
            <input
            onChange={(e) => handleChange(e)}
            type= "text"
            placeholder='email...'
            value = {input.email}
            name = "email"
            />
        </div>
        <div>
            <label >Address:</label>
            <input
            onChange={(e) => handleChange(e)}
            type= "text"
            placeholder='address...'
            value = {input.address}
            name = "address"
            />
        </div>
        <div>
            <label>Phone Number:</label>
            <input
            onChange={(e) => handleChange(e)}
            type= "number"
            placeholder='phoneNumber...'
            value = {input.phoneNumber}
            name = "phoneNumber"
            />
        </div>
        <div>
        <button
              type='submit'>
                Edit
            </button>
        </div>
        </form>
    )

    }

export default FormEditUser;