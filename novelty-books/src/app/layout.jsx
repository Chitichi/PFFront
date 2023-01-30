import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { StateContext } from 'context/StateContext'
import { useStateContext } from "../../context/StateContext";

export default function RootLayout({ children }) {

  function updateData() {
    if (typeof window !== "undefined") {
      const { user, setUser } = useStateContext();
      if (!user.name) {
        const userLocalStorage = JSON.parse(localStorage.getItem("user"))
        if (userLocalStorage) setUser(userLocalStorage)
      }
    }
  }

  updateData()

  return (
    <StateContext>
      <html lang="en">
        <head />
        <body>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </StateContext>
  )
}
