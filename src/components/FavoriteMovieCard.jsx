import { Box, Image, Icon, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { removeFromFavorites, removeFromWatchlist } from "../firebase";
import { useSelector } from "react-redux";
import { user } from "../features/user/userSlice";

const FavoriteMovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const favoriteMovie = movie.data();
  const userInfo = useSelector(user);
  const toast = useToast();

  const showToast = (title) =>
    toast({
      title: title,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });

  return (
    <Box>
      {favoriteMovie?.image && (
        <Box
          className="hover:scale-105 transition duration-200 cursor-pointer relative"
          onClick={() => navigate(`/movie/${favoriteMovie?.id}`)}
        >
          <Image
            src={favoriteMovie?.image}
            alt={favoriteMovie?.name}
            borderRadius="lg"
          />
          <Box
            className="absolute top-5 right-5 flex items-center space-x-2 bg-white bg-opacity-20
        py-1 px-2 rounded-lg  
        "
          >
            <Icon as={AiFillStar} color="#FFBF00 " />
            <Text fontSize="xs" color="white" className="hover:text-[#3DD2CC]">
              {favoriteMovie?.ratings}
            </Text>
          </Box>
          <Box
            className="absolute bottom-5 right-5  
       
        "
          >
            <Icon
              as={MdDelete}
              color="#3dd2cc"
              onClick={(e) => {
                e.stopPropagation();
                removeFromFavorites(userInfo?.email, movie?.id);
                showToast("Successfully removed from favorite movies");
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FavoriteMovieCard;
