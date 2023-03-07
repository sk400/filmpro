import {
  Box,
  Center,
  Flex,
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
  Input,
  DrawerFooter,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { sidebarListItems } from "../utils/data";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { setCategory } from "../features/category/categorySlice";
import { useDispatch } from "react-redux";
import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, onClose, btnRef }) => {
  const [activeButton, setActiveButton] = useState("Home");
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
            <Center className="h-[150px]">
              <Heading color="#3DD2CC" as="h1" fontSize="4xl">
                Filmpro
              </Heading>
            </Center>
          </DrawerHeader>

          <DrawerBody></DrawerBody>

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

      <Box className="h-screen hidden md:block bg-[#212121] min-w-[250px] rounded-r-3xl relative">
        {/* md screen navbar */}
        <Center className="h-[150px]">
          <Heading color="#3DD2CC" as="h1" fontSize="4xl">
            Filmpro
          </Heading>
        </Center>
        <List spacing={3} className="">
          <ListItem
            color={"Home" === activeButton ? "#3DD2CC" : "#666666"}
            className={`flex items-center  pl-10 font-semibold text-xl cursor-pointer 
           py-5 bg-${"Home" === activeButton ? "[#3DD2CC]" : "[#666666]"} ${
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
              className={`flex items-center  pl-10 font-semibold text-xl cursor-pointer 
           py-5 bg-${item?.name === activeButton ? "[#3DD2CC]" : "[#666666]"} ${
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

        <Center className="h-[100px] absolute bottom-0  w-full">
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
