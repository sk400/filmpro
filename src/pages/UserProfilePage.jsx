import { Avatar, Box, Center, Heading, VStack } from "@chakra-ui/react";
import { onValue, ref } from "firebase/database";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { db, getUserInfo } from "../firebase";

const UserProfilePage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState();

  const getUserData = async () => {
    const userInfo = await getUserInfo(userId);
    setUserData(userInfo);
  };

  getUserData();

  // console.log(userData);

  return (
    <Box className="h-screen bg-[#191919]  ">
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
      {/* <Box className="pt-24 px-5 max-w-4xl mx-auto">
        <Heading color="white">Favorites</Heading>
      </Box> */}
    </Box>
  );
};

export default UserProfilePage;
