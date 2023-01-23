import Landing from "@/components/Home"

const fetchBooks = () => {
  return fetch("http://localhost:3001/books")
    .then(res => res.json())
    .catch(error => alert(error.message))
}

export default async function Home() {

  const books = await fetchBooks()

  return (
    <>
      <header class="bg-dark py-5">
        <div class="container px-4 px-lg-5 my-5">
          <div class="text-center text-white">
            <h1 class="display-4 fw-bolder">Novelty Books</h1>
            <p class="lead fw-normal text-white-50 mb-0">
              With this shop hompeage template
            </p>
          </div>
        </div>
      </header>

      <Landing books={books}/>
    </>
  )
}
