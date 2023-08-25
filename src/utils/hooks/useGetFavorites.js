import { useEffect, useState } from "react";
import { getFavoriteMovies } from "../../firebase";

export const useGetFavorites = (userId, id) => {
  const [isAlreadyInFavorites, setIsAlreadyInFavorites] = useState(false);

  const getFavoriteMoviesData = async () => {
    const movies = await getFavoriteMovies();

    const movie = movies?.find((movie) => Number(movie?.id) === Number(id));

    console.log(movie);

    if (movie) {
      setIsAlreadyInFavorites(true);
    } else {
      setIsAlreadyInFavorites(false);
    }
  };

  useEffect(() => {
    getFavoriteMoviesData();
  }, [id, userId]);

  return [isAlreadyInFavorites, setIsAlreadyInFavorites, getFavoriteMoviesData];
};
