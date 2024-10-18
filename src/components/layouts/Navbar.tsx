import { Link } from "react-router-dom";
import Logo from "./Logo";
import { sizeModal, typeModal, urlPage } from "../../utilities/constant";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { openModal } from "../../store/modalSlice";

const Navbar = () => {
    const { session_id } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(openModal({
            id: null,
            type: typeModal.LOGOUT,
            isOpen: true,
            size: sizeModal.SMALL
        }));
    };

    return (
        <div className="w-full bg-transaprent top-0">
            <div className="kontener mx-auto">
                <div className="flex justify-between items-center h-[5.5rem] xl:px-0 relative px-5">                
                    <Link to={urlPage.HOME}><Logo /></Link>
                    {!session_id && <Link to={urlPage.LOGIN} className=" py-1 rounded-md px-6 bg-red-700 text-white">Sign In</Link> }
                    {session_id && (
                        <div className="flex justify-end space-x-3">
                            <Link to={urlPage.PROFILE} className=""><FaRegUserCircle className="h-7 w-7 text-red-700"/></Link> 
                            <div onClick={handleLogout} className=""><AiOutlineLogout className="h-7 w-7 text-red-700 cursor-pointer"/></div> 
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar;