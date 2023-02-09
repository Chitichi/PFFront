"use client"
import React from "react";
import Card from "@/components/Card/Card";
import { usePathname } from "next/navigation";
import DetailBook from "../../../components/DetailBook/DetailBook"
import useUpdateBooks from "@/hooks/useUpdateBooks";

/* const fetchBook = (id) => {
  return fetch(process.env.RUTA_BACK+`/books/${id}`)
    .then(res => res.json())
    // .catch(error => alert(error.message))
} */

 const Detail = ({params}) => {

  const {book, fetchSingleBook} = useUpdateBooks()
  // console.log(params)
  const {ISBN} = params
  // console.log(ISBN)
  //const book = await fetchBook(ISBN)

  /* React.useEffect(() => {
    fetchSingleBook(ISBN)
  }, []) */
  
  
  return (
    <> 
      <DetailBook isbn={ISBN} book = {book} updateBook={fetchSingleBook}/>
    </>
  );
}

export default Detail;