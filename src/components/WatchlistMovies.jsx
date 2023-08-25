import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";

import WatchlistMovieCard from "./WatchlistMovieCard";

const WatchlistMovies = ({ movies }) => {
  return (
    <Box>
      <Heading as="h1" fontSize="3xl" color="white" className="pl-5 pt-5">
        Watchlist
      </Heading>

      <Box className="px-5 sm:px-8 py-10 ">
        <SimpleGrid minChildWidth="200px" spacing="30px">
          {movies?.map((movie) => (
            <WatchlistMovieCard key={movie?.id} movie={movie} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default WatchlistMovies;
