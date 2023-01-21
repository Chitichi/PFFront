/* "use client"; */
import Card from "./Card";
//import booksArray from "../books Array/books.json";
//import BookCard from "../components/BookCard";
import books from "@/books Array/books1";
import Link from "next/link";
import React from 'react'

const filteredPosts = (filterObj) => {
  if(filterObj.genre.length){
    return filterObj.genre === "All Genres" ? books : books.filter(book => book.genre.includes(filterObj.genre))
  }else{
    return filterObj.publisher === "All Publishers" ? books : books.filter(book => book.publisher.includes(filterObj.publisher))
  }
}

export default function Landing({filterObj}) {

  const booksArray = filteredPosts(filterObj)

      return booksArray.map((book, idx) => (
          <Link 
                key={idx}
                href={`/detailBook/${book.isbn13}`} 
                style={{ textDecoration: 'none', color: 'inherit', marginBottom: 15 }}
          >
              <Card
                key={idx}
                title={book.title}
                author={book.author}
                image={book.image}
                price={book.price}
              />
          </Link>
      ))
}
