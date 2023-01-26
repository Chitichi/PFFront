"use client";
import React from "react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2"

const validacion=(input)=> {
    let errores={};
    if(!input.name) errores.name = 'Name required';
    if(input.name.length < 3 || input.name.length > 50) errores.name = 'The name must contain 3 to 50 characters';
    if(!/^[a-zA-Z\s]+$/.test(input.name)) errores.name = 'Invalid name, only characters allowed';
    

    return errores
}

export default function SignUpForm () {
    const [botonOff, setBotonOff] = useState(true)
    const [errores, setErrores] = useState({name:""});
    const [input, setInput] = useState({
        name: "",
        email: "",
        password:"",
        address:"",
        phoneNumber: 0,
    });

    useEffect(()=>{
        if(Object.keys(errores).length === 0){
            setBotonOff(false)
        }
        else {
            setBotonOff(true)
        };
            console.log(errores);
    }, [errores]);

    function handleChange(e){
        e.preventDefault();
        setInput({ 
            ...input, 
            [e.target.name]:e.target.value
        })
        setErrores(validacion({//primero hago de setear el input, y despues le digo seteame el estado errores pasandole la función validate y lo renderizo abajo en cada input,abajo de onchange(handlechange)en el caso de que suceda
            ...input,
            [e.target.name]: e.target.value
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Send a request to the server to create a new book using the form data
          const res = await fetch("http://localhost:3001/users/signup", {
              method: "POST",
              body: JSON.stringify(input),
              headers: {
                  "Content-Type": "application/json",
                },
            });
            //console.log(res, "hola soy tu res")
          const data = await res.json();
          console.log(data);
        } catch (err) {
          console.log(err);   
        }
        Swal.fire({
            title:"User created",
            text:'Your user was created successfully!',
            icon:'success',
            timer: 3000
        })
      };
   
    return (
        
        <form onSubmit={(e) => handleSubmit(e)}>
        <div>
            <label>Name:</label>
            <input
            onChange={(e) => handleChange(e)}
            type= "text"
            placeholder='name...'
            value = {input.name}
            name = "name"
            />
              {errores.name && (//pregunto si está errors.name y si está hago un parrafo con ese error(errors.name) 
                    <p >{errores.name}</p>
                )}
        </div>
        <div>
            <label>Email:</label>
            <input
            onChange={(e) => handleChange(e)}
            type= "text"
            placeholder='email...'
            value = {input.email}
            name = "email"
            />
              {errores.email && (
                    <p>{errores.email}</p>
                )}
        </div>
        <div>
            <label>Password:</label>
            <input
            onChange={(e) => handleChange(e)}
            type= "text"
            placeholder='password...'
            value = {input.password}
            name = "password"
            />
              {errores.password && (
                    <p>{errores.password}</p>
                )}
        </div>
        <div>
            <label>Address:</label>
            <input
            onChange={(e) => handleChange(e)}
            type= "text"
            placeholder='address...'
            value = {input.address}
            name = "address"
            />
              {errores.address && (
                    <p>{errores.address}</p>
                )}
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
              {errores.phoneNumber && (
                    <p>{errores.phoneNumber}</p>
                )}
        </div>
        <div>
        <button
              type='submit'
              disabled={botonOff}>
                Create User
            </button>
        </div>
        

        
        </form>
    )
}