import { useDispatch } from "react-redux";
import MultiCarousel from "../components/pages/MultiCarousel";
import { AppDispatch } from "../store";
import { nowPlayingMovie } from "../store/nowPlayingMovieSlice";
import { useEffect, useState } from "react";
import { movieCardProps } from "../utilities/interface";
import ListMovie from "../components/layouts/ListMovie";
import { popularMovieList } from "../store/popularMovieSlice";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [movies, setMovies] = useState<movieCardProps[]>([]);
  const [moviesPopular, setMoviesPopular] = useState<movieCardProps[]>([]);
  const [currentTab, setCurrentTab] = useState(1);

  const fetchMovie = async () => {
    try {
      const response = await dispatch(nowPlayingMovie()).unwrap();
      setMovies(response.map((movie: movieCardProps) => ({
        id: movie.id,
        poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}` : '/image/img-notfound.png'
      })));
    } catch (err) {
      console.log(err)
    }
  }

  const fetchMoviePopular = async () => {
    try {
      const response = await dispatch(popularMovieList()).unwrap();
      setMoviesPopular(response.map((movie: movieCardProps) => ({
        id: movie.id,
        poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}` : '/image/img-notfound.png'
      })));
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const movie = sessionStorage.getItem("nowPlaying");
    const moviePopular = sessionStorage.getItem("popularMovieList");

    if (movie && moviePopular) {
      const movieParsed = JSON.parse(movie);
      setMovies(
        movieParsed.map((movie: movieCardProps) => ({
          id: movie.id,
          poster_path: movie.poster_path
            ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
            : "/image/img-notfound.png",
        }))
      );

      const moviePopularParsed = JSON.parse(moviePopular);
      const movieSlice = moviePopularParsed.slice(0, 6);
      setMoviesPopular(
        movieSlice.map((movie: movieCardProps) => ({
          id: movie.id,
          poster_path: movie.poster_path
            ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
            : "/image/img-notfound.png",
        }))
      );
    }

    if (!movie) {
      fetchMovie();
    }

    if (!moviePopular) {
      fetchMoviePopular();
    }
  }, []);

  return (
    <>
      <div className="kontener mx-auto px-4 xs:px-6">
        <div className="mt-5 text-white">
          <div className="flex gap-1 text-lg w-full bg-white text-black px-2 py-1 rounded-md">
            <div onClick={() => setCurrentTab(1)} className={`${currentTab === 1 ? 'bg-red-700 text-white' : ''} hover:bg-red-700 rounded-lg hover:text-white px-6 py-1 cursor-pointer`}>Now Playing</div>
            <div onClick={() => setCurrentTab(2)} className={`${currentTab === 2 ? 'bg-red-700 text-white' : ''} hover:bg-red-700 rounded-lg hover:text-white px-6 py-1 cursor-pointer`}>Popular Movie</div>
          </div>

          {currentTab === 1 && 
            <MultiCarousel movies={movies} />
          }

          {currentTab === 2 && 
            <ListMovie moviesPopular={moviesPopular} setMoviesPopular={setMoviesPopular}/>
          }
        </div>
      </div>
    </>
  )
}

export default Home