"use client"
import { useState } from "react";
import { useStateContext } from "context/StateContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
    
 function EnterYourEmail() {
    const { user, setUser,  } = useStateContext();
    const [input, setInput] = useState({
        email: ""
      });
      const router = useRouter();
      
   const click = async ()=> {
    try {
        const res = await fetch(process.env.RUTA_BACK+"/users", {
          method: "GET",
          body: JSON.stringify(),
          headers: {
              "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        const completoUser = data.find((e) => e.email === input.email );
        const emailId = completoUser._id;
       
        const postId = await fetch(process.env.RUTA_BACK+`/users/forgotPassword/${emailId}`, {
          method: "POST",
        });
        const data2 = await postId.json();
      
      
       Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Check your email',
        showConfirmButton: false,
        timer: 3000
      })
      router.push("/")
    } catch {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Invalid Email',
        showConfirmButton: false,
        timer: 3000
      })
      setInput({email:""})
    }
  }
    
    function handleChange(e) {
      e.preventDefault();
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
 

 return(
                
                <div className="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={input.email}
                    name="email"
                    onChange={handleChange}
                  />
                   <div className="text-center">
          
          <button type="submit"
                  onClick={click}>
            Enter
          </button>
          
        </div>
  
              </div>
            )
}
    

export default EnterYourEmail;