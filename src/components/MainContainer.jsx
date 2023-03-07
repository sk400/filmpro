import { Box } from "@chakra-ui/react";

import React, { useState } from "react";

import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { category, searchQuery } from "../features/category/categorySlice";
import { MovieDetailPage } from "../pages";
import { useGetAllMoviesQuery } from "../services/movieApi";

import Loader from "./Loader";
import Movies from "./Movies";
import Navbar from "./Navbar";

const MainContainer = ({ onOpen, btnRef }) => {
  const searchTerm = useSelector(searchQuery);
  const categoryName = useSelector(category);

  const { data, isFetching, error } = useGetAllMoviesQuery({
    searchTerm,
    categoryName,
  });

  if (isFetching) return <Loader />;

  if (error) return "An unexpected error occured";

  let movies = data?.results;

  const bannerData = movies[0];

  return (
    <Box className="bg-[#191919] h-[93.9vh] overflow-y-auto  ">
      <Navbar onOpen={onOpen} btnRef={btnRef} />

      <Routes>
        <Route
          path="/"
          element={<Movies movies={movies} bannerData={bannerData} />}
        />
        <Route
          path="/movie/:movieId"
          element={<MovieDetailPage movies={movies} />}
        />
      </Routes>
    </Box>
  );
};

export default MainContainer;
