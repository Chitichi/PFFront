"use client"
import React, { useEffect } from 'react'
import useUpdateBooks from '../../hooks/useUpdateBooks';
import useUpdateUsers from '@/hooks/useUpdateUsers';
import AdminTools from "@/components/AdminTools"

const Page = () => {

    const { first, fetchBooksUpdate, fetchBooks } = useUpdateBooks()
    const { users, fetchUsers } = useUpdateUsers()

    useEffect(() => {
        fetchBooks()
        fetchUsers()
    }, [])
    

  return (
    <div>
        <AdminTools users={users} books={first} updateBooks={fetchBooksUpdate}/>
    </div>
  )
}

export default Page;