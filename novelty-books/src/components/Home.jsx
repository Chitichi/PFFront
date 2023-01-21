/* "use client"; */
import Card from "./Card";
//import booksArray from "../books Array/books.json";
//import BookCard from "../components/BookCard";
import books from "@/books Array/books1";
import Link from "next/link";
import React from 'react'

const filteredPosts = (genre) => {
  return genre === "" ? books : books.filter(book => book.genre.includes(genre))
}

export default function Landing({genre}) {

  const booksArray = filteredPosts(genre)

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
