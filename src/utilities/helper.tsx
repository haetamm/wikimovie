import { genres } from "./genres";

export interface movieCardProps {
    id: number
    poster_path: string
}

export const getGenreNames = (genre_ids: number[]): string => {
const movieGenreNames = genre_ids
    .map((id) => genres.find((genre) => genre.id === id)?.name)
    .filter(Boolean);

    return movieGenreNames.join(" | ");
};