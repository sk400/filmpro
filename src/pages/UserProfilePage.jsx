import { Avatar, Box, Center, Heading, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FavoriteMovies, Loader, Movies } from "../components";
import { getFavoriteMovies, getUserInfo } from "../firebase";

const UserProfilePage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState();
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const getUserData = async () => {
    const userInfo = await getUserInfo(userId);
    setUserData(userInfo);
  };

  // const getMoviesData = async () => {
  //   const movies = await getFavoriteMovies(userId);
  //   setFavoriteMovies(movies);
  // };

  useEffect(() => {
    getUserData();
    // getMoviesData();
  }, []);

  // console.log(favoriteMovies);

  return (
    <Box className="h-screen bg-[#191919] overflow-y-auto ">
      <Box className="h-[150px] bg-[#3DD2CC]  " />
      <Center className="">
        <VStack justify="center" className="-m-[60px]">
          <Avatar
            size="2xl"
            name={userData?.name}
            src={userData?.image}
            className=""
          />
          <Heading color="white">{userData?.name}</Heading>
        </VStack>
      </Center>
      {/* <Box className="py-24 px-5 max-w-4xl mx-auto ">
        {favoriteMovies?.length < 1 ? (
          <Heading as="h1" fontSize="3xl" color="white" className="pl-5 pt-5">
            You have no favorite movies.
          </Heading>
        ) : (
          <FavoriteMovies movies={favoriteMovies} />
        )}

        {favoriteMovies?.length === 0 && (
          <Heading as="h1" fontSize="3xl" color="white" className="pl-5 pt-5">
            You have no favorite movies.
          </Heading>
        )}
      </Box> */}
    </Box>
  );
};

export default UserProfilePage;
