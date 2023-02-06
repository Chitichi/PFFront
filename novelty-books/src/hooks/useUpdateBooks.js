import { useState } from "react";
import axios from "axios";

const useUpdateBooks = () =>{

const [first, setfirst] = useState([])


const fetchBooks = async () => {
    try{
        const res = await axios(process.env.RUTA_BACK+"/books");
        setfirst(res.data)
        return first;
    }catch(error){
        return error.message
    }
}

const fetchBooksUpdate = async (id, requestOptions) => {
    try{
        const res = await fetch(process.env.RUTA_BACK+"/books/"+id, requestOptions);
        fetchBooks()
          return await res.json();
    }catch(error){
         return error.message
    }
}

return {
    first,
    fetchBooks,
    fetchBooksUpdate,
}
}

export default useUpdateBooks;