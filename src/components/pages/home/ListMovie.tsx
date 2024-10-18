import '../../../styles/components/list-image.scss';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { movieCardProps } from "../../../utilities/helper";
import { openModal } from "../../../store/modalSlice";
import { sizeModal, typeModal } from "../../../utilities/constant";
import MovieCard from "../../MovieCard";

interface ListMovieProps {
  moviesPopular: movieCardProps[];
  setMoviesPopular: React.Dispatch<React.SetStateAction<movieCardProps[]>>;
}

const ListMovie = ({ moviesPopular, setMoviesPopular }: ListMovieProps) => {
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
          <MovieCard
            key={index}
            movie={movie}
            handleOpenModal={handleOpenModal}
          />
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
