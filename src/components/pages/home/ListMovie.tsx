import '../../../styles/components/list-image.scss';
import { movieCardProps } from "../../../utilities/helper";
import MovieCard from "../../MovieCard";
import { useState } from 'react';

interface ListMovieProps {
  moviesPopular: movieCardProps[];
  setMoviesPopular: React.Dispatch<React.SetStateAction<movieCardProps[]>>;
}

const ListMovie = ({ moviesPopular, setMoviesPopular }: ListMovieProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const loadMore = () => {
    const movieList = sessionStorage.getItem("popularMovieList");
    if (movieList) {
      const movieListParsed = JSON.parse(movieList);
      const newMovies = movieListParsed.slice(
        moviesPopular.length,
        moviesPopular.length + 6
      );
      const updateMovie = [...moviesPopular, ...newMovies];
      setMoviesPopular(updateMovie);
    }
  };

  return (
    <div className="px-4 justify-center">
      <div className="w-full list-image-wrap relative justify-center">
        {moviesPopular.map((movie, index) => (
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
        ))}
      </div>
      {moviesPopular.length < 30 && (
        <div className="flex justify-center">
          <button
            onClick={loadMore}
            className="text-white bg-red-700 px-6 py-2 rounded-md"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ListMovie;
