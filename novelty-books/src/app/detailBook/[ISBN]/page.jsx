import Card from "@/components/Card";
import { usePathname } from "next/navigation";
import DetailBook from "../../../components/DetailBook"

const fetchBook = (id) => {
  return fetch(process.env.RUTA_BACK+`/books/${id}`)
    .then(res => res.json())
    // .catch(error => alert(error.message))
}

async function Detail({params}) {
  // console.log(params)
  const {ISBN} = params
  // console.log(ISBN)
  const book = await fetchBook(ISBN)
  
  return (
    <> 
      <DetailBook book = {book}/>
    </>
  );
}

export default Detail;