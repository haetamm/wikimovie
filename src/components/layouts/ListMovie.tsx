import { useState } from "react";
import { movieCardProps } from "../../utilities/interface";
import '../../styles/components/list-image.scss';
import { openModal } from "../../store/modalSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

interface ListMovieProps {
  moviesPopular: movieCardProps[];
  setMoviesPopular: React.Dispatch<React.SetStateAction<movieCardProps[]>>;
}

const ListMovie = ({ moviesPopular, setMoviesPopular }: ListMovieProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenModal = (id: number) => {
    dispatch(openModal({
      id,
      type: "big",
      isOpen: true
    }))
  }

  const loadMore = () => {
    const movieList = sessionStorage.getItem('popularMovieList');
    if (movieList) {
      const movieListParsed = JSON.parse(movieList);
      const newMovies = movieListParsed.slice(moviesPopular.length, moviesPopular.length + 6);
      const updateMovie = [...moviesPopular, ...newMovies];
      setMoviesPopular(updateMovie.map((movie: movieCardProps) => ({
        id: movie.id,
        poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}` : '/image/img-notfound.png'
      })));
    }
  };

  return (
    <div className="px-5 justify-center">
      <div className="w-full list-image-wrap  relative justify-center">
        {moviesPopular.map(({ id, poster_path }, index) => (
          <div key={index} className="relative m-3 mx-auto">
            <div
              className="relative w-[300px] h-[450px] xs:w-[260px] xs:h-[360px] md:w-[300px] md:h-[450px] group"
              onClick={() => setActiveIndex(activeIndex === id ? null : id)}
            >
              <div
                className="w-[300px] h-[450px] xs:w-[260px] xs:h-[360px] md:w-[300px] md:h-[450px] bg-cover bg-center rounded-lg transition-transform duration-300"
                style={{
                  backgroundImage: `url(${poster_path})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: 'white'
                }}
              ></div>


              {activeIndex === id && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 transition-opacity duration-300">
                  <div onClick={() => handleOpenModal(id)} className="text-white bg-red-700 px-7 py-1 rounded-full cursor-pointer text-lg font-semibold">
                    Detail
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {moviesPopular.length < 30 && 
        <div className="flex justify-center">
          <button onClick={loadMore} className="text-white bg-red-700 px-6 py-2 rounded-md">Next</button>
        </div>
      }
    </div>
  );
};

export default ListMovie;
