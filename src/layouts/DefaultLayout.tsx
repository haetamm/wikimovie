import { Outlet } from "react-router-dom"
import Navbar from "../components/layouts/Navbar"
import Hero from "../components/layouts/Hero"
import Footer from "../components/layouts/Footer"
import Modal from "../components/layouts/Modal"
import { Toaster } from "sonner"

const DefaultLayout = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <div className="hero">
        <Navbar />
        <Hero />
        <div className="curve"></div>
      </div>
      <Outlet></Outlet>
      <Footer />
      <Toaster  className="text-lg" position="top-left" />
      <Modal />
    </div>
  )
}

export default DefaultLayout