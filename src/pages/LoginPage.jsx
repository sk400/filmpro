import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { sendSignInLinkToEmail, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { actionCodeSettings, auth, provider } from "../firebase";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const toast = useToast();

  const showToast = (title, status) => {
    return toast({
      title: title,
      status: status,
      isClosable: true,
      position: "top-right",
      duration: 4000,
    });
  };

  let text = "We Sent a link to your email. Please click the link to signin.";

  const signInUserWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        showToast("Logged in successfully.", "success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createUserWithEmail = () => {
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
      })
      .catch((error) => {
        console.log(error.message);
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
                placeholder="Name"
                type="text"
                focusBorderColor="#3DD2CC"
                fontFamily="Poppins"
                color="white"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                variant="flushed"
                placeholder="Email"
                type="email"
                focusBorderColor="#3DD2CC"
                fontFamily="Poppins"
                color="white"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Flex>
          </Flex>
          <Flex direction="column" justify="center" className="space-y-3">
            <Button
              variant="filled"
              size="lg"
              className="w-full bg-white hover:opacity-[0.8] transition duration-200 "
              fontFamily="Poppins"
              onClick={() => {
                showToast(text, "success");
                createUserWithEmail();
              }}
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
              onClick={() => signInUserWithGoogle()}
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

// saumyakantapanda82@gmail.com
