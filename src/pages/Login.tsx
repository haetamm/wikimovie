import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { openModal } from "../store/modalSlice";
import { useEffect } from "react";
import { sizeModal, typeModal } from "../utilities/constant";
import { Navigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { session_id } = useSelector((state: RootState) => state.user);

    const openModalHandle = () => {
        dispatch(openModal({
            id: null,
            type: typeModal.LOGIN,
            isOpen: true,
            size: sizeModal.BIG,
        }));
    }
    
    useEffect(() => {
        if (!session_id) {
            openModalHandle()
        }
    }, []);

    if (session_id) {
        return <Navigate to={'/'} />
    }


    return (
        <div></div>
    )
}

export default Login;