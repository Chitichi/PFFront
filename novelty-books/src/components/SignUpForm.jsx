"use client";
import React from "react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2"
import { useRouter } from "next/navigation";
import { useStateContext } from "../../context/StateContext";


const validacion=(input)=> {
  
    let errores={};
    if(!input.name) errores.name = 'Name required';
    if(input.name.length < 3 || input.name.length > 50) errores.name = 'The name must contain 3 to 50 characters';
    if(!/^[a-zA-Z\s]+$/.test(input.name)) errores.name = 'Invalid name, only characters allowed';
    if(!/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/.test(input.email)) errores.email = 'Invalid email format';
    if(!input.password) errores.password = 'Password required';
    if(input.password.length < 6 || input.password.length > 10) errores.password = 'The password must contain 6 to 10 characters';
    if(!/^[a-zA-Z\s]+$/.test(input.address)) errores.address = 'Invalid address, only characters allowed';
    if(!input.phoneNumber) errores.phoneNumber = 'Phone Number required';
    if(input.phoneNumber.length < 11 || input.phoneNumber.length > 25 ) errores.phoneNumber = 'The phone number must contain 11 to 25 characters';
    return errores
}

 function SignUpForm () {
    const router = useRouter();
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
          const res = await fetch(process.env.RUTA_BACK+"/users/signup", {
              method: "POST",
              body: JSON.stringify(input),
              headers: {
                  "Content-Type": "application/json",
                },
            });
            //console.log(res, "hola soy tu res")
          const data = await res.json();
          console.log(data);
          Swal.fire({
            title:"User created",
            text:'Your user was created successfully!',
            icon:'success',
            timer: 3000
        })
        } catch (err) { 
            Swal.fire({
                title:"Oops! error",
                text:'Error user register already with that email.',
                icon:'error',
                timer: 3000
            })
            return 
        }
         setInput ({
            name: "",
            email: "",
            password:"",
            address:"",
            phoneNumber: 0,
        })
        router.push("/")

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
                    <p>{errores.name}</p>
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
            type= "password"
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
export default SignUpForm;