"use client";

import Landing from "@/components/Home"
import React from "react"

export default function Home() {

  const [filter, setFilter] = React.useState({
    genre: "All Genres",
    publisher: ""
  })

  const handleFilters = (e) => {
      const {value, name} = e.target
      if(name === 'genre'){
        setFilter({
          genre: value,
          publisher: ""
        })
      }else{
        setFilter({
          genre: "",
          publisher: value
        })
      }
  }

  const genresArray = ["All Genres", "Horror", "Fantasy", "Sci-Fiction"]
  const publisherArray = ["All Publishers", "Quirk Books", "Wiley", "OSU Press"]

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

      <div class="container mx-auto" style={{width: 800, display: 'flex', justifyContent: 'space-around', padding: 15}}>
          <select
              value={filter.genre} 
              name="genre" 
              class="text-center" 
              onChange = {handleFilters}
          >
              {genresArray.map(item => <option name="genre" value={item}>{item}</option>)}
          </select>
          <select 
              value={filter.publisher} 
              name="publisher" 
              class="text-center" 
              onChange = {handleFilters}
          >
              {publisherArray.map(item => <option name="publisher" value={item}>{item}</option>)} 
          </select>
      </div>

      <section class="py-5 bg-light">
        <div class="container px-4 px-lg-5 mt-5">
          <h2 class="fw-bolder mb-4">Popular books</h2>
          <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            <Landing filterObj={filter}/>
          </div>
        </div>
      </section>
    </div>
  )
}
