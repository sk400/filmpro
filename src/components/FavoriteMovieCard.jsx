import { Box, Image, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const FavoriteMovieCard = ({ movie }) => {
  const navigate = useNavigate();
  // console.log(movie);
  return (
    <Box>
      {movie?.image && (
        <Box
          className="hover:scale-105 transition duration-200 cursor-pointer relative"
          onClick={() => navigate(`/movie/${movie?.id}`)}
        >
          <Image
            src={`https://image.tmdb.org/t/p/original/${movie?.image}`}
            alt={movie?.name}
            borderRadius="lg"
          />
          <Box
            className="absolute top-5 right-5 flex items-center space-x-2 bg-white bg-opacity-20
        py-1 px-2 rounded-lg  
        "
          >
            <Icon as={AiFillStar} color="#FFBF00 " />
            <Text fontSize="xs" color="white" className="hover:text-[#3DD2CC]">
              {movie?.ratings}
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FavoriteMovieCard;
