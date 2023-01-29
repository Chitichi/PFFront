
import Landing from "@/components/Landing";

const fetchBooks = async () => {
  const res = await fetch("https://backendnoveltybooks.onrender.com/books");
    return await res.json();
   // .catch(error => alert(error.message))
}

async function HomePage() {

const books = await fetchBooks();
return (
    <>
      <Landing books={books}/>
    </>
  )
}
export default HomePage;
