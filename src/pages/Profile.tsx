import { useEffect, useState } from "react";
import axiosInstance from "../utilities/api-default";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { openModal } from "../store/modalSlice";
import { sizeModal, typeModal } from "../utilities/constant";
import MovieCard from "../components/MovieCard";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { session_id } = useSelector((state: RootState) => state.user);
  const [movies, setMovies] = useState<any>([]);
  const [username, setUsername] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const handleOpenModal = (id: number) => {
    dispatch(
      openModal({
        type: typeModal.MOVIE,
        isOpen: true,
        size: sizeModal.BIG,
        id,
      })
    );
  };

  const fetchMovie = async () => {
    setLoading(true);
    try {
      const { data: response } = await axiosInstance.get(`/account/null/favorite/movies?language=en-US&page=1&session_id=${session_id}&sort_by=created_at.asc`);
      const { results: movies } = response;
      sessionStorage.setItem('favoriteMovie', JSON.stringify(movies))
      setMovies(movies);
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const { data: responseUser } = await axiosInstance.get(`/account/13283213?session_id=${session_id}`);
      const { username } = responseUser;
      sessionStorage.setItem('name', JSON.stringify(username));
      setUsername(username)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchMovie();
    const username = sessionStorage.getItem('name');
    username ? setUsername(username) : fetchUser();
  }, []);

  return (
    <div className="">
      <div className="kontener mx-auto flex-grow pt-[50px] px-4 xs:px-6  text-white h-56">
        <div className="text-3xl lg:text-6xl font-bold">
          Hallo, {username}
        </div>
        <div className="text-lg mt-6">
          This is your profile page. You can view your favorite movies here
        </div>
      </div>
      <div className="px-4 justify-center kontener mx-auto">
      <hr className="border-red-700 border-4 border-dotted"/>
        <div className="w-full h-min-[400px] mt-5 list-image-wrap relative justify-center">
          {loading ? (
            <div className="text-white">Loading...</div>
          ) : movies.length > 0 ? (
              movies.map((movie: any, index: number) => (
                <MovieCard
                  key={index}
                  movie={movie}
                  handleOpenModal={handleOpenModal}
                />
              ))

          ) : (
            <div>data not available</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile;