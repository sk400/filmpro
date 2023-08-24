import { AiOutlineStar } from "react-icons/ai";
import { GoCalendar } from "react-icons/go";
import { getFavoriteMovies, getWatchlist } from "../firebase";

export const sidebarListItems = [
  {
    name: "Top rated",
    icon: AiOutlineStar,
    category: "top_rated",
  },
  {
    name: "Upcoming",
    icon: GoCalendar,
    category: "upcoming",
  },
];

export const sidebarGenres = [
  { name: "Action", id: 28 },
  { name: "Adventure", id: 12 },
  { name: "Animation", id: 16 },
  { name: "Comedy", id: 35 },
  { name: "Crime", id: 80 },
  { name: "Documentary", id: 99 },
  { name: "Drama", id: 18 },
  { name: "Family", id: 10751 },
  { name: "Fantasy", id: 14 },
  { name: "History", id: 36 },
  { name: "Horror", id: 27 },
  { name: "Music", id: 10402 },
  { name: "Mystery", id: 9648 },
  { name: "Romance", id: 10749 },
  { name: "Science Fiction", id: 878 },
  { name: "TV Movie", id: 10770 },
  { name: "Thriller", id: 53 },
  { name: "War", id: 10752 },
  { name: "Western", id: 37 },
];

export const extractMovieData = (choosenMovie) => {
  const getMovieDirectors = () => {
    const directorsData = choosenMovie?.credits?.crew?.filter(
      (item) => item?.department === "Directing"
    );

    const directors = directorsData
      ?.slice(0, 4)
      .map((item) => item?.original_name);

    return directors;
  };

  const directors = getMovieDirectors();

  const actors = choosenMovie?.credits?.cast;

  const getVideos = () => {
    const videos = choosenMovie?.videos?.results?.map((item) => item?.key);
    return videos;
  };

  const videos = getVideos();

  return [directors, actors, videos];
};
