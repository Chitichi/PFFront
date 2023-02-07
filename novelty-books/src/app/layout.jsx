"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });
import Footer from "@/components/Footer";
import { StateContext } from "context/StateContext";
import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";


export default function RootLayout({ children }) {
  return (
    <StateContext>
      <SessionProvider>
        <html lang="en">
          <head />
          <body>
            <Navbar />
            {children}
            <Footer />
          </body>
        </html>
      </SessionProvider>
    </StateContext>
  );
}
