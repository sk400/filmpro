import { useEffect, useState } from "react";
import { getWatchlist } from "../../firebase";

export const useGetWatchlist = (userId, id) => {
  const [isAlreadyInWatchlist, setIsAlreadyInWatchlist] = useState(false);

  const getWatchlistMoviesData = async () => {
    const movies = await getWatchlist(userId);

    const movie = movies?.find((movie) => movie?.id === id);

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
