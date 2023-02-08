import dynamic from "next/dynamic";

const Landing = dynamic(()=>import("@/components/Landing"),{ssr:false})
//import Landing from "@/components/Landing";

const fetchBooks = async () => {
  const res = await fetch(process.env.RUTA_BACK+"/books",{cache:'no-store',});
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
