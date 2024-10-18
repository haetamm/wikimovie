import { Navigate, Outlet } from "react-router-dom"
import Navbar from "../components/layouts/Navbar"
import Footer from "../components/layouts/Footer"
import Modal from "../components/layouts/Modal"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { urlPage } from "../utilities/constant"

const AuthLayout = () => {
  const { session_id } = useSelector((state: RootState) => state.user);

  if (!session_id) {
    return <Navigate to={urlPage.HOME} />
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <Outlet></Outlet>
      <Modal />
      <Footer />
    </div>
  )
}

export default AuthLayout;