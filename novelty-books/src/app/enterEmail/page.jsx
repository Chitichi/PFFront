"use client"
import { useState } from "react";
import { useStateContext } from "context/StateContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import styles from "./Page.module.css";

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
                
              <div className={styles.container}>
                <div className={styles.userForm}>
                  <div className="col-12">
                    <h2 className={styles.h2}>Introduce your Email</h2>
                    <label className=" m-2"><strong>Email address</strong></label>
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
                  </div>
                   <div className="text-center">
          
                      <button type="submit"
                      className="btn btn-outline-dark btn-lg m-4"
                              onClick={click}>
                        Enter
                      </button>
          
                    </div>
                </div>
              </div>
            )
}
    

export default EnterYourEmail;