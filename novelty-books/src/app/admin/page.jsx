"use client"
import React, { useEffect } from 'react'
import useUpdateBooks from '../../hooks/useUpdateBooks';
import AdminTools from "@/components/AdminTools"

const Page = () => {

    const {first, fetchBooksUpdate, fetchBooks } = useUpdateBooks()

    useEffect(() => {
        fetchBooks()
    }, [])
    

  return (
    <div>
        <AdminTools books={first} updateBooks={fetchBooksUpdate}/>
    </div>
  )
}

export default Page;