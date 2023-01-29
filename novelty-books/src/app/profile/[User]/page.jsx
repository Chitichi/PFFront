import Landing from "@/components/Landing"


const fetchBooks = () => {
    return fetch("http://localhost:3001/books")
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