import { useDispatch } from "react-redux";
import MultiCarousel from "../components/pages/home/MultiCarousel";
import { AppDispatch } from "../store";
import { nowPlayingMovie } from "../store/nowPlayingMovieSlice";
import { useEffect, useState } from "react";
import ListMovie from "../components/pages/home/ListMovie";
import { popularMovieList } from "../store/popularMovieSlice";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [movies, setMovies] = useState<any>([]);
  const [moviesPopular, setMoviesPopular] = useState<any>([]);
  const [currentTab, setCurrentTab] = useState(1);

  const fetchMovie = async () => {
    try {
      const response = await dispatch(nowPlayingMovie()).unwrap();
      setMovies(response);
    } catch (err) {
      console.log(err)
    }
  }

  const fetchMoviePopular = async () => {
    try {
      const response = await dispatch(popularMovieList()).unwrap();
      setMoviesPopular(response)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const movie = sessionStorage.getItem("nowPlaying");
    const moviePopular = sessionStorage.getItem("popularMovieList");

    if (movie && moviePopular) {
      const movieParsed = JSON.parse(movie);
      setMovies(movieParsed)

      const moviePopularParsed = JSON.parse(moviePopular);
      const movieSlice = moviePopularParsed.slice(0, 6);
      setMoviesPopular(movieSlice)
    }

    if (!movie) {
      fetchMovie();
    }

    if (!moviePopular) {
      fetchMoviePopular();
    }
  }, []);

  return (
    <div className="bg-black flex-grow">
      <div className="kontener mx-auto px-4 xs:px-6 ">
        <div className="pt-5 text-white bg-black">
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
    </div>
  )
}

export default Home