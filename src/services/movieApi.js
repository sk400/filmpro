import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// movieDetail = https://api.themoviedb.org/3/movie/550?api_key=${api_key}&append_to_response=videos,credits
// const base_url = "https://api.themoviedb.org/3";
// genres = https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=28
// categories = https://api.themoviedb.org/3/movie/popular?api_key=${api_key}
// search = https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=Thor
//  movies by actor = https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_cast=4
//  actor details =https://api.themoviedb.org/3/person/4?api_key=${api_key}
//  suggested Movies = https://api.themoviedb.org/3/movie/550/recommendations?api_key=${api_key}

const api_key = process.env.REACT_APP_TMDB_API_KEY;

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    getAllMovies: builder.query({
      query: ({ categoryName, searchTerm }) => {
        // get movies by category

        if (categoryName && typeof categoryName === "string") {
          return `/movie/${categoryName}?api_key=${api_key}`;
        }

        // get movies by genre
        if (categoryName && typeof categoryName === "number") {
          return `/discover/movie?api_key=${api_key}&with_genres=${categoryName}`;
        }
        // get movies by search
        if (searchTerm) {
          return `/search/movie?api_key=${api_key}&query=${searchTerm}`;
        }

        // return popular movies by default

        return `/movie/popular?api_key=${api_key}`;
      },
    }),
    getMovieDetail: builder.query({
      query: ({ movieId }) =>
        `/movie/${movieId}?api_key=${api_key}&append_to_response=videos,credits`,
    }),
  }),
});

export const { useGetAllMoviesQuery, useGetMovieDetailQuery } = movieApi;
