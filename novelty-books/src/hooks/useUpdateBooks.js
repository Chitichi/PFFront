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


const postRatings = async (reviewObj, idBook) => {
    try{
        const res = await axios.post(process.env.RUTA_BACK+"/books/rating/"+idBook, reviewObj)
        return res
    }catch(error){
        return alert(error.response.data)
    }
}


const fetchBooksByTitle = async (title) => {
    try{
        const res = await axios(process.env.RUTA_BACK+"/books/search/title?q="+title);
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
    fetchBooksByTitle,
    fetchBooksUpdate,
    postRatings
}
}

export default useUpdateBooks;