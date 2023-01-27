
import Landing from "@/components/Landing";

const fetchBooks = async () => {
  const res = await fetch("http://localhost:3001/books");
    return await res.json();
   // .catch(error => alert(error.message))
}

async function HomePage() {

const books = await fetchBooks();
console.log(books ,"somos los liros");
return (
    <>
      <Landing books={books}/>
    </>
  )
}
export default HomePage;
