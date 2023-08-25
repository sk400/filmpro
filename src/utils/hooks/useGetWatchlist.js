import { useEffect, useState } from "react";
import { getWatchlist } from "../../firebase";

export const useGetWatchlist = (userId, id) => {
  const [isAlreadyInWatchlist, setIsAlreadyInWatchlist] = useState(false);

  const getWatchlistMoviesData = async () => {
    const movies = await getWatchlist(userId);

    // console.log(typeof id);

    const movie = movies?.find((movie) => Number(movie?.id) === Number(id));

    if (movie) {
      setIsAlreadyInWatchlist(true);
    } else {
      setIsAlreadyInWatchlist(false);
    }
  };

  useEffect(() => {
    getWatchlistMoviesData();
  }, [id, userId]);

  return [
    isAlreadyInWatchlist,
    setIsAlreadyInWatchlist,
    getWatchlistMoviesData,
  ];
};
