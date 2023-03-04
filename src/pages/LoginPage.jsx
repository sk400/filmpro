import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { signInWithPopup } from "firebase/auth";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";

const LoginPage = () => {
  const navigate = useNavigate();

  const signInUser = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Flex direction="row" className="h-screen ">
      <Box className="lg:basis-[55%] xl:basis-[60%] hidden lg:flex">
        <Image
          src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg"
          alt="movie-image"
          className="w-full h-full object-cover "
        />
      </Box>
      <Center className="lg:basis-[45%] xl:basis-[40%] bg-[#191919] w-full px-5 lg:px-10 ">
        <Flex
          direction="column"
          justify="center"
          className="space-y-10 max-w-[400px]"
        >
          <Flex direction="column" justify="center" className="space-y-7">
            <Heading
              color="white"
              fontFamily="Poppins"
              as="h1"
              size="xl"
              className="text-center"
            >
              Login to your account
            </Heading>
            <Flex className="space-y-5" direction="column " justify="center">
              <Input
                variant="flushed"
                placeholder="Email"
                type="email"
                focusBorderColor="#3DD2CC"
                fontFamily="Poppins"
                color="white"
              />
              <Input
                variant="flushed"
                placeholder="Password"
                type="password"
                focusBorderColor="#3DD2CC"
                fontFamily="Poppins"
                color="white"
              />
            </Flex>
          </Flex>
          <Flex direction="column" justify="center" className="space-y-3">
            <Button
              variant="filled"
              size="lg"
              className="w-full bg-white hover:opacity-[0.8] transition duration-200 "
              fontFamily="Poppins"
            >
              Sign in
            </Button>
            <Button
              variant=""
              size="lg"
              className="w-full text-white  border-[1px] border-gray-400 flex items-center
          hover:border-[#3DD2CC] transition duration-200
          "
              leftIcon={<FcGoogle />}
              onClick={() => signInUser()}
            >
              Sign in with google
            </Button>
          </Flex>
          <Text fontSize="xs" className="text-center text-gray-300 ">
            New to here?
            <span
              className=" text-white ml-1 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </Text>
        </Flex>
      </Center>
    </Flex>
  );
};

export default LoginPage;
