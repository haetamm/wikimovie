import { useEffect, useState } from "react"
import axiosInstance from "../../../utilities/api-default";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";

const HeaderProfilePage = () => {
    const [username, setUsername] = useState<string>("");
    const { session_id } = useSelector((state: RootState) => state.user);

    const fetchUser = async () => {
        try {
            const { data: responseUser } = await axiosInstance.get(`/account/13283213?session_id=${session_id}`);
            const { username } = responseUser;
            sessionStorage.setItem('name', username);
            setUsername(username)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const username = sessionStorage.getItem('name');
        username ? setUsername(username) : fetchUser();
    }, []);

    return (
        <>
            <div className="kontener mx-auto flex-grow pt-[50px] px-4 xs:px-6  text-white h-56">
                <div className="text-3xl lg:text-6xl font-bold">
                    Hallo, {username}
                </div>
                <div className="text-lg mt-6">
                    This is your profile page. You can view your favorite movies here.
                </div>
            </div>
        </>
    )
}

export default HeaderProfilePage