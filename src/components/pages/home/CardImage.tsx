import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { openModal } from "../../../store/modalSlice";
import { sizeModal, typeModal } from "../../../utilities/constant";

interface CardImageProps {
  poster_path: string;
  id: number;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const CardImage = ({ poster_path, id, activeIndex, setActiveIndex }: CardImageProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenModal = (id: number) => {
    dispatch(openModal({
      id: id,
      type: typeModal.MOVIE,
      isOpen: true,
      size: sizeModal.BIG,
    }))
  }
  
  return (
    <>
      <div
        onClick={() => setActiveIndex(activeIndex === id ? null : id)}
        className="w-[200px] h-[300px] object-cover rounded-lg transition-transform duration-300"
        style={{
          backgroundImage: `url(${poster_path ? `https://image.tmdb.org/t/p/w342${poster_path}` : '/image/img-notfound.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'white'
        }}
      ></div>

      {activeIndex === id && (
        <div onClick={() => setActiveIndex(activeIndex === id ? null : id)} className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
          <div onClick={() => handleOpenModal(id)} className="text-white bg-red-700 px-7 py-1 rounded-full cursor-pointer text-lg font-semibold">Detail</div>
        </div>
      )}
    </>
  )
}

export default CardImage