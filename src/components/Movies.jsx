import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Banner from "./Banner";

import MovieCard from "./MovieCard";

const Movies = ({ movies, bannerData }) => {
  return (
    <Box>
      <Banner bannerData={bannerData} />
      <Heading as="h1" fontSize="3xl" color="white" className="pl-5 pt-5">
        Movies
      </Heading>

      <Box className="px-5 sm:px-8 py-10 ">
        <SimpleGrid minChildWidth="200px" spacing="30px">
          {movies?.map((movie) => (
            <MovieCard key={movie?.id} movie={movie} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Movies;
