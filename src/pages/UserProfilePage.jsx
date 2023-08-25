import { Avatar, Box, Center, Heading, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";

import { db, getFavoriteMovies, getWatchlist } from "../firebase";
import { useSelector } from "react-redux";
import { user } from "../features/user/userSlice";
import { Loader, UserChosenMovies } from "../components";
import { collection } from "firebase/firestore";

const UserProfilePage = () => {
  // const [watchlist, setWatchlist] = useState([]);
  // const [favoriteMovies, setFavoriteMovies] = useState([]);

  const userData = useSelector(user);

  // useEffect(() => {
  //   // const getUserFavoriteMovies = async () => {
  //   //   if (userData?.email) {
  //   //     try {
  //   //       const data = await getFavoriteMovies(userData?.email);
  //   //       setFavoriteMovies(data);
  //   //     } catch (error) {
  //   //       console.log(error);
  //   //     }
  //   //   }
  //   // };

  //   const getUserChosenMovies = async () => {
  //     if (userData?.email) {
  //       try {
  //         const data = await getWatchlist(userData?.email);
  //         setWatchlist(data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };
  //   // getUserFavoriteMovies();
  //   getUserChosenMovies();
  // }, [userData?.email]);

  const [value, loading, error] = useCollection(
    userData?.email &&
      collection(db, "users", userData?.email, "favoriteMovies")
  );

  const [data] = useCollection(
    userData?.email && collection(db, "users", userData?.email, "watchlist")
  );

  if (error) {
    Navigate("/");
  }

  const favoriteMovies = value?.docs;
  const watchlist = data?.docs;

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
      {loading && <Loader />}
      <UserChosenMovies favoriteMovies={favoriteMovies} watchlist={watchlist} />
    </Box>
  );
};

export default UserProfilePage;
