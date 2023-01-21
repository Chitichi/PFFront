"use client";

import Landing from "@/components/Home"
import React from "react"

export default function Home() {

  const [genre, setGenre] = React.useState("")

  const handleFilters = (e) => {
      const {value} = e.target
      setGenre(value)
  }

  return (
    <div>
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

      <div class="container mx-auto" style={{width: 'fit-content'}}>
          <select class="text-center" onChange = {handleFilters}>
            <option value="">All</option>
            <option value="Horror">Horror</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Sci-Fiction">Sci-Fiction</option> 
          </select>
      </div>

      <section class="py-5 bg-light">
        <div class="container px-4 px-lg-5 mt-5">
          <h2 class="fw-bolder mb-4">Popular books</h2>
          <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            <Landing genre={genre}/>
          </div>
        </div>
      </section>
    </div>
  )
}
