import { Outlet } from "react-router-dom"
import Navbar from "../components/layouts/Navbar"
import Hero from "../components/layouts/Hero"
import Footer from "../components/layouts/Footer"
import Modal from "../components/layouts/Modal"

const DefaultLayout = () => {
  return (
    <>
      <div className="hero">
        <Navbar />
        <Hero />
        <div className="curve"></div>
      </div>
      <Outlet></Outlet>
      <Footer />
      <Modal />
    </>
  )
}

export default DefaultLayout