import {
  Box,
  Center,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
  Icon,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { sidebarGenres, sidebarListItems } from "../utils/data";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { setCategory } from "../features/category/categorySlice";
import { useDispatch } from "react-redux";
import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, onClose, btnRef }) => {
  const [activeButton, setActiveButton] = useState("Home");
  const [activeGenre, setActiveGenre] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        colorScheme="gray"
      >
        <DrawerOverlay />
        <DrawerContent className="" bgColor="#212121">
          <DrawerCloseButton color="#3DD2CC" />
          <DrawerHeader>
            <Center className="h-[100px]">
              <Heading color="#3DD2CC" as="h1" fontSize="4xl">
                Filmpro
              </Heading>
            </Center>
          </DrawerHeader>
          <Text
            fontSize="sm"
            fontFamily="Poppins"
            color="white"
            className="pl-5 my-3"
          >
            Categories
          </Text>
          <DrawerBody>
            <List spacing={2}>
              {sidebarGenres?.map((item) => (
                <ListItem
                  key={item?.id}
                  color={item?.name === activeGenre ? "#3DD2CC" : "gray"}
                  className={`hover:text-[#3DD2CC] transition duration-200 cursor-pointer
                  ${
                    item?.name === activeGenre
                      ? "border-r-4 border-[#3DD2CC]"
                      : ""
                  }

                 
                  hover:bg-[#3DD2CC]/40 px-2 py-1 rounded-lg
                  `}
                  onClick={() => {
                    setActiveGenre(item?.name);
                    dispatch(setCategory(item?.id));
                    navigate("/");
                    onClose();
                  }}
                >
                  {item?.name}
                </ListItem>
              ))}
            </List>
          </DrawerBody>

          <DrawerFooter>
            <Button
              leftIcon={<Icon as={FiLogOut} />}
              colorScheme="#212121"
              className="hover:text-[#3DD2CC] text-[#666666] "
              onClick={() => logOut()}
            >
              Log out
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Box
        className="h-screen hidden md:block bg-[#212121] min-w-[250px] rounded-r-3xl relative
      
      
      "
      >
        {/* md screen navbar */}
        <Center className="h-[140px]">
          <Heading color="#3DD2CC" as="h1" fontSize="4xl">
            Filmpro
          </Heading>
        </Center>
        <List spacing={0} className="">
          <ListItem
            color={"Home" === activeButton ? "#3DD2CC" : "#666666"}
            className={`flex items-center  pl-5 font-semibold text-xl cursor-pointer 
           py-2  ${
             "Home" === activeButton ? "border-r-4 border-[#3DD2CC]" : ""
           }  hover:text-[#3DD2CC] transition duration-200`}
            fontFamily="Poppins"
            onClick={() => {
              setActiveButton("Home");
              dispatch(setCategory(""));
              navigate("/");
            }}
          >
            <ListIcon
              as={AiOutlineHome}
              // color={item?.name === activeButton ? "#3DD2CC" : "#666666"}
              className={` text-xl hover:text-[#3DD2CC] text-${
                "Home" === activeButton ? "#3DD2CC" : "#666666"
              } `}
            />
            Home
          </ListItem>
          {sidebarListItems?.map((item, index) => (
            <ListItem
              key={index}
              color={item?.name === activeButton ? "#3DD2CC" : "#666666"}
              className={`flex items-center  pl-5 font-semibold text-xl cursor-pointer 
           py-2  ${
             item?.name === activeButton ? "border-r-4 border-[#3DD2CC]" : ""
           }  hover:text-[#3DD2CC] transition duration-200`}
              fontFamily="Poppins"
              onClick={() => {
                setActiveButton(item?.name);
                dispatch(setCategory(item?.category));
                navigate("/");
              }}
            >
              <ListIcon
                as={item?.icon}
                // color={item?.name === activeButton ? "#3DD2CC" : "#666666"}
                className={` text-xl hover:text-[#3DD2CC] text-${
                  item?.name === activeButton ? "#3DD2CC" : "#666666"
                } `}
              />
              {item?.name}
            </ListItem>
          ))}
        </List>
        <Text
          fontSize="sm"
          fontFamily="Poppins"
          color="white"
          className="pl-5 mt-3"
        >
          Categories
        </Text>
        <Box className="h-[50vh] overflow-y-auto  mt-5">
          <List spacing={2}>
            {sidebarGenres?.map((item) => (
              <ListItem
                key={item?.id}
                color={item?.name === activeGenre ? "#3DD2CC" : "gray"}
                className={`hover:text-[#3DD2CC] transition duration-200 cursor-pointer
                  ${
                    item?.name === activeGenre
                      ? "border-r-4 border-[#3DD2CC]"
                      : ""
                  }

                 
                  hover:bg-[#3DD2CC]/40 px-5 py-1 rounded-lg
                  `}
                onClick={() => {
                  setActiveGenre(item?.name);
                  dispatch(setCategory(item?.id));
                  navigate("/");
                  onClose();
                }}
              >
                {item?.name}
              </ListItem>
            ))}
          </List>
        </Box>
        <Center className="h-[50px] absolute bottom-4 right-4  ">
          <Button
            leftIcon={<Icon as={FiLogOut} />}
            colorScheme="#212121"
            className="hover:text-[#3DD2CC] text-[#666666] "
            onClick={() => logOut()}
          >
            Log out
          </Button>
        </Center>
      </Box>
    </>
  );
};

export default Sidebar;
