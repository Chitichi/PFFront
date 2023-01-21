import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*<head />*/}
      <body>
        <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
  )
}
