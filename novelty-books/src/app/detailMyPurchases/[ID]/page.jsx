
import DetailMyPurchases from "../../../components/DetailMyPurchases"

const fetchBook = (id) => {
  return fetch(process.env.RUTA_BACK+`/books/${id}`)
    .then(res => res.json())
    // .catch(error => alert(error.message))
}

async function Detail({params}) {
  // console.log(params)
  const {ID} = params
  // console.log(ISBN)
  const book = await fetchBook(ID)
  
  return (
    <> 
      <DetailMyPurchases book = {book}/>
    </>
  );
}

export default Detail;