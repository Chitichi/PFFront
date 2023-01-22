"use client";
import { useState } from "react"
import style from "./page.module.css"
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
//import { useLocation } from "react-router-dom"

function Login() {
    const router = useRouter();
    const [emailUser, setEmailUser] = useState("");
    const [passUser, setPassUser ] = useState("");
    //const [, navigation] = useLocation();

    const handleSubmit = (e) => { 
        e.preventDefault();
        Swal.fire({
            title:"User created",
            text:'Your user was created successfully!',
            icon:'success',
            timer: 3000
        })
        router.push("/Giuliana");
       // navigation("/");
         //alert ( `${emailUser}, ${passUser}`)
  
    };


    return (
        <div>
        <form onSubmit={handleSubmit} className={style.formulario}>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" 
                       class="form-control" 
                       id="exampleInputEmail1" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email"
                       value={emailUser}
                       onChange= {(e)=> setEmailUser(e.target.value)}/>
                <small id="emailHelp" 
                       class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" 
                       class="form-control" 
                       id="exampleInputPassword1" 
                       placeholder="Password"
                       value={passUser}
                       onChange= {(e)=> setPassUser(e.target.value)}/>
            </div>
            <div class="form-group form-check">
                <input type="checkbox" 
                       class="form-check-input" 
                       id="exampleCheck1"/>
                <label class="form-check-label" 
                       for="exampleCheck1">Check me out</label>
            </div>
            <div class="text-center">
                
                
            </div>
        
            <div class="text-center">
                <button 
                className={style.button} 
                type="submit"
                onClick={handleSubmit}>Submit</button>
            </div>
        </form>
            
            </div>
    )
}

export default Login