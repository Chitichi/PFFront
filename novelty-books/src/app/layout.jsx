import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { StateContext } from 'context/StateContext'

export default function RootLayout({ children }) {

  return (
    <StateContext>

    
    <html lang="en">
      <head />
      <body>
        <Navbar />
        {children}
        <Footer/>
        </body>
    </html>
    </StateContext>
  )
}
