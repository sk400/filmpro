import { Avatar, Flex, Spacer, Icon, IconButton } from "@chakra-ui/react";
import React from "react";
import Searchbar from "./Searchbar";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { user } from "../features/user/userSlice";

const Navbar = ({ onOpen, btnRef }) => {
  const userData = useSelector(user);

  // console.log(userData);

  return (
    <>
      <Flex
        className="py-3 px-2 md:px-10 sticky top-0 z-20 bg-[#212121] bg-opacity-40"
        direction="row"
        align="center"
      >
        <IconButton
          colorScheme="#212121"
          className="hover:bg-[#3DD2CC]/40 transition duration-200 
          
        "
          sx={{ display: { md: "none" } }}
          ref={btnRef}
          onClick={() => onOpen()}
        >
          <Icon as={FiMenu} color="#3DD2CC" fontSize="2xl" className="" />
        </IconButton>

        <Spacer sx={{ display: { md: "none" } }} />
        <Searchbar />
        <Spacer />
        <Link to={`/user/${userData?.id}`}>
          <Avatar
            size="md"
            name={userData?.name}
            src={userData?.image}
            className="cursor-pointer"
          />
        </Link>
      </Flex>
    </>
  );
};

export default Navbar;
