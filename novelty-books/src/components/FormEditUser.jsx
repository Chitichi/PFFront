"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useStateContext } from "context/StateContext";
import Swal from "sweetalert2";

const FormEditUser = ()=> {
    const {user , setUser} = useStateContext();
    const router = useRouter();
    const [botonOff, setBotonOff] = useState(true)
    const [input, setInput] = useState({
        userId: user._id,
        name: user.name,
        address:user.address,
        phoneNumber: user.phoneNumber,
    });
    //console.log(input, "hola soy tu puto input");
        
    function saveLocalStorage(user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    
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
          
            setUser({...user, name : input.name, address: input.address, phoneNumber: input.phoneNumber })
            saveLocalStorage({...user, name : input.name, address: input.address, phoneNumber: input.phoneNumber })
            Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Your changes were made successfully!',
            showConfirmButton: false,
            timer: 2000
          })


          router.push("/")




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