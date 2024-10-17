import React, { useRef, useState } from "react";
import { movieCardProps } from "../../utilities/interface";
import CardImage from "./CardImage";

interface MultiCarouselProps {
  movies: movieCardProps[];
}

const MultiCarousel: React.FC<MultiCarouselProps> = ({ movies }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth / 2;
      if (direction === "left") {
        carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <div className="relative w-full px-5 h-[300px]">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
        >
          ◀
        </button>

        <div
          ref={carouselRef}
          className="flex overflow-x-scroll xl:overflow-x-hidden scroll-smooth space-x-4 xs:space-x-8 w-full py-6"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {movies.map(({ id, poster_path }, index) => (
            <div
              key={index}
              className="relative group w-[200px] h-[300px] bg-gray-300 rounded-lg flex-shrink-0 overflow-hidden cursor-pointer"
              style={{ scrollSnapAlign: "start" }}
            >
              <CardImage 
                id={id}
                poster_path={poster_path}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
        >
          ▶
        </button>
      </div>
    </>
  );
};

export default MultiCarousel;
