import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import MovieCard from "../components/MovieCard";
import { favoriteMovieList } from "../store/favoriteMovieSlice";
import HeaderProfilePage from "../components/pages/profile/HeaderProfilePage";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.favoriteMovieList);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { session_id } = useSelector((state: RootState) => state.user);
  const [movies, setMovies] = useState<any>([]);
  const [username, setUsername] = useState<string>("");

  const fetchMovie = async () => {
    try {
      const response = await dispatch(favoriteMovieList(session_id)).unwrap();
      setMovies(response);
    } catch(err) {
      console.log(err);
    } 
  };

  useEffect(() => {
    fetchMovie();
    const username = sessionStorage.getItem('name');
    username ? setUsername(username) : setUsername('Profile');
  }, []);

  return (
    <>
      <Helmet>
          <title>{username} | WikiMovie</title>
          <meta name='description' content='WikiMovie Profile Page' />
      </Helmet>
      <HeaderProfilePage />
      <div className="px-4 justify-center kontener mx-auto">
        <hr className="border-red-700 border-4 border-dotted"/>
        <div className="w-full h-min-[400px] mt-5 list-image-wrap relative justify-center">
          {loading ? (
            <div className="text-white text-center text-lg">Loading...</div>
          ) : movies.length > 0 ? (
                movies.map((movie: any, index: number) => (
                  <div key={index} className="relative h-min-[450px] m-3 mx-auto">
                    <div
                      className="relative w-[300px] h-[450px] xs:w-[260px] xs:h-[360px] md:w-[300px] md:h-[450px] group"
                    >
                      <MovieCard
                        key={index}
                        movie={movie}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                      />
                    </div>
                  </div>
                ))
            ) : (
            <div className="text-white text-center text-lg">data not available</div>
          )}
        </div>
      </div>
    </>
  )
}

export default Profile;