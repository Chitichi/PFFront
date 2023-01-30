import Landing from "@/components/Landing"


const fetchBooks = () => {
    return fetch(process.env.RUTA_BACK+"/books")
      .then(res => res.json())
     // .catch(error => alert(error.message))
  }
  
  async function Profile() {
    const books = await fetchBooks()
    return (
        <Landing books={books}/>
    )
}

export default Profile