"use client"
import { useState } from "react";
import Link from "next/link";
import { useStateContext } from "context/StateContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
    
function EnterYourEmail() {
    const { user, setUser,  } = useStateContext();
    const [input, setInput] = useState({
        email: ""
      });
      const router = useRouter();

    function click (){
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Check your email',
        showConfirmButton: false,
        timer: 3000
      })
      router.push("/")

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