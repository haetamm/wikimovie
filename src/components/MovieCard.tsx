import { useDispatch } from "react-redux";
import { movieCardProps } from "../utilities/helper";
import { AppDispatch } from "../store";
import { openModal } from "../store/modalSlice";
import { sizeModal, typeModal } from "../utilities/constant";

interface MovieCardProps {
  movie: movieCardProps;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const MovieCard = ({ movie, activeIndex, setActiveIndex }: MovieCardProps) => {
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

  return (
    <>
      <div
        onClick={() => setActiveIndex(activeIndex === movie.id ? null : movie.id)}
        className="w-[300px] h-[450px] xs:w-[260px] xs:h-[360px] md:w-[300px] md:h-[450px] bg-cover bg-center rounded-lg transition-transform duration-300 cursor-pointer"
        style={{
          backgroundImage: `url(${movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : '/image/img-notfound.png'})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "white",
        }}
      ></div>

      {activeIndex === movie.id && (
        <div onClick={() => setActiveIndex(activeIndex === movie.id ? null : movie.id)} className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 transition-opacity duration-300">
          <div
            onClick={() => handleOpenModal(movie.id)}
            className="text-white bg-red-700 px-7 py-1 rounded-full cursor-pointer text-lg font-semibold"
          >
            Detail
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
