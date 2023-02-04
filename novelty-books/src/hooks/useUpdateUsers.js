import { useState } from "react";
import axios from "axios";

const useUpdateUsers = () =>{

const [users, setUsers] = useState([])


const fetchUsers = async () => {
    try{
        const res = await axios(process.env.RUTA_BACK+"/users");
        setUsers(res.data)
        return users;
    }catch(error){
        return error.message
    }
}

/* const fetchUsersUpdate = async (id, requestOptions) => {
    try{
        const res = await fetch(process.env.RUTA_BACK+"/books/"+id, requestOptions);
        fetchBooks()
          return await res.json();
    }catch(error){
         return error.message
    }
} */

return {
    users,
    fetchUsers,
    //fetchBooksUpdate,
}
}

export default useUpdateUsers;