import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { genres as genreList } from "../../utilities/genres";

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
  const { id } = useSelector((state: RootState) => state.modal); 
  const [movie, setMovie] = useState<movieDetail | null>(null);
  const [movieGenres, setMovieGenres] = useState<string>("");

  const getGenreNames = (genre_ids: number[]): string => {
    const movieGenreNames = genre_ids
      .map((id) => genreList.find((genre) => genre.id === id)?.name)
      .filter(Boolean);

    return movieGenreNames.join(" | ");
  };

  useEffect(() => {
    const movies = sessionStorage.getItem("nowPlaying");
    const moviesPopular = sessionStorage.getItem("popularMovieList");
    if (movies && moviesPopular) {
      const movieParsed: movieDetail[] = JSON.parse(movies);
      const moviePopularParsed: movieDetail[] = JSON.parse(moviesPopular);
      const movieAll = [ ...movieParsed, ...moviePopularParsed];

      const selectedMovie = movieAll.find((movie) => movie.id === id);
      
      if (selectedMovie) {
        setMovie(selectedMovie); 
        const genresString = getGenreNames(selectedMovie.genre_ids);
        setMovieGenres(genresString); 
      }
    }
  }, [id]);
  console.log(movie?.title);

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
                    <p className="text-2xl font-bold">{movie.title}</p>
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
