"use client"
import React, { useEffect } from 'react'
import useUpdateBooks from '../../hooks/useUpdateBooks';
import useUpdateUsers from '@/hooks/useUpdateUsers';
import useUpdateOrders from '@/hooks/useUpdateOrders';
import AdminTools from "@/components/AdminTools"

const Page = () => {

    const { first, fetchBooksUpdate, fetchBooks, fetchBooksByTitle } = useUpdateBooks()
    const { users, fetchUsers } = useUpdateUsers()
    const { orders, fetchOrders } = useUpdateOrders()

    useEffect(() => {
        fetchBooks()
        fetchUsers()
        fetchOrders()
    }, [])
    

  return (
    <div>
      {
        orders.length && users.length && first.length?
        <AdminTools 
            orders={orders} 
            users={users} 
            books={first} 
            updateBooks={fetchBooksUpdate} 
            filterByTitle={fetchBooksByTitle}
        />: null
      }
    </div>
  )
}

export default Page;