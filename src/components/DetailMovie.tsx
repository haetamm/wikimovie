import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { urlPage } from "../utilities/constant";
import { createFavoriteMovie } from "../store/createFavoriteMovieSlice";
import { getGenreNames } from "../utilities/helper";

interface movieDetail {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
  overview: string;
  genre_ids: number[];
}

const DetailMovie = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pathname } = useLocation();
  const { id } = useSelector((state: RootState) => state.modal);
  const { loading } = useSelector((state: RootState) => state.createFavoriteMovie);
  const { session_id } = useSelector((state: RootState) => state.user);
  const [movie, setMovie] = useState<movieDetail | null>(null);
  const [movieGenres, setMovieGenres] = useState<string>("");
  const navigate = useNavigate();

  const isProfilePage = (path: string) => pathname === path

  useEffect(() => {
    const getMoviesFromSession = (key: string): movieDetail[] => {
      const data = sessionStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    };
  
    const findMovieById = (movies: movieDetail[], id: number | null) => {
      const selectedMovie = movies.find((movie) => movie.id === id);
      if (selectedMovie) {
        setMovie(selectedMovie); 
        const genres = getGenreNames(selectedMovie.genre_ids);
        setMovieGenres(genres);
      }
    };
  
    const nowPlayingMovies = getMoviesFromSession("nowPlaying");
    const popularMovies = getMoviesFromSession("popularMovieList");
    const favoriteMovies = getMoviesFromSession("favoriteMovie");
  
    const allMovies = [...nowPlayingMovies, ...popularMovies, ...favoriteMovies];
  
    findMovieById(allMovies, id);
  }, [id]);
  
  const handleFavoriteMovie = async () => {
    try {
      await dispatch(createFavoriteMovie({ session_id, id }));
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <>
      {movie ? (
        <div className="content my-0">
          <div className="card min-h-48 rounded-none xs:rounded-tl-md xs:rounded-tr-md lg:rounded-tl-lg lg:rounded-tr-lg">
            <div className="h-full py-2 px-1 inline-block xs:flex gap-3 justify-between">
              <div
                className="mx-auto w-[300px] h-[400px]"
                style={{
                  backgroundImage: `url(${movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : '/image/img-notfound.png'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: 'white'
                }}
              ></div>

              <div className="mt-5 xs:mt-0 w-full xs:w-1/2">
                <div className="flex justify-between items-center space-x-3 w-full">
                  <p className="text-2xl font-bold">{movie.title}</p>

                  { !isProfilePage(urlPage.PROFILE) && 
                    <div 
                      onClick={session_id ? () => handleFavoriteMovie() : () => navigate(urlPage.LOGIN)} 
                      className="px-6 py-2 rounded-full text-lg bg-red-700 hover:bg-red-900 text-white items-center cursor-pointer"
                    >
                      {loading ? 'Loading..' : 'Favorite'}
                    </div>
                  }

                </div>
                <p className="text-lg mt-2">Tahun Release: {movie.release_date}</p>
                <p className="text-lg mt-2">Rating: {movie.vote_average}</p>
                <p className="text-lg mt-2">Genre: {movieGenres}</p>
                <p className="bio text-lg mt-2">{movie.overview}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading movie details...</div>
      )}
    </>
  );
};

export default DetailMovie;
