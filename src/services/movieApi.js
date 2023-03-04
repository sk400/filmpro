import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// movieDetail = https://api.themoviedb.org/3/movie/550?api_key=0fe1d442244aa8057a8d1339061524f0&append_to_response=videos,credits
// const base_url = "https://api.themoviedb.org/3";
// genres = https://api.themoviedb.org/3/discover/movie?api_key=0fe1d442244aa8057a8d1339061524f0&with_genres=28
// categories = https://api.themoviedb.org/3/movie/popular?api_key=0fe1d442244aa8057a8d1339061524f0
// search = https://api.themoviedb.org/3/search/movie/?api_key=0fe1d442244aa8057a8d1339061524f0&query=Thor
//  movies by actor = https://api.themoviedb.org/3/discover/movie?api_key=0fe1d442244aa8057a8d1339061524f0&with_cast=4
//  actor details =https://api.themoviedb.org/3/person/4?api_key=0fe1d442244aa8057a8d1339061524f0
//  suggested Movies = https://api.themoviedb.org/3/movie/550/recommendations?api_key=0fe1d442244aa8057a8d1339061524f0

const api_key = process.env.REACT_APP_TMDB_API_KEY;

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    getAllMovies: builder.query({
      query: () => `/movie/popular?api_key=${api_key}`,
    }),
  }),
});

export const { useGetAllMoviesQuery } = movieApi;
