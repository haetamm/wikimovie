import { useState } from "react";
import { movieCardProps } from "../../utilities/interface";

interface MovieCardProps {
  movie: movieCardProps;
  handleOpenModal: (id: number) => void;
}

const MovieCard = ({ movie, handleOpenModal }: MovieCardProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="relative h-min-[450px] m-3 mx-auto">
      <div
        className="relative w-[300px] h-[450px] xs:w-[260px] xs:h-[360px] md:w-[300px] md:h-[450px] group"
        onClick={() => setIsActive(!isActive)}
      >
        <div
          className="w-[300px] h-[450px] xs:w-[260px] xs:h-[360px] md:w-[300px] md:h-[450px] bg-cover bg-center rounded-lg transition-transform duration-300 cursor-pointer"
          style={{
            backgroundImage: `url(${movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : '/image/img-notfound.png'})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "white",
          }}
        ></div>

        {isActive && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 transition-opacity duration-300">
            <div
              onClick={() => handleOpenModal(movie.id)}
              className="text-white bg-red-700 px-7 py-1 rounded-full cursor-pointer text-lg font-semibold"
            >
              Detail
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
