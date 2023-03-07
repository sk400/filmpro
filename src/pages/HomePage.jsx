import React, { useRef, useState } from "react";
import {
  CategoriesColumn,
  Loader,
  MainContainer,
  Navbar,
  Sidebar,
} from "../components";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserProfilePage } from "./";
import { sidebarListItems } from "../utils/data";
import { AiOutlineHome } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setCategory } from "../features/category/categorySlice";

const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [activeButton, setActiveButton] = useState("Home");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(data);

  return (
    <Flex direction="row" align="center" className=" bg-[#191919]  ">
      <Box>
        <Sidebar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      </Box>

      <Box className="flex-1 relative">
        <Routes>
          <Route
            path="*"
            element={<MainContainer onOpen={onOpen} btnRef={btnRef} />}
          />
          <Route path="/user/:userId" element={<UserProfilePage />} />
        </Routes>
        <HStack
          sx={{
            position: "sticky",
            bottom: 0,
            justifyContent: "center",
            flexDirection: "row",
            width: "100%",
            gap: 5,
            zIndex: 2,
            visibility: { md: "hidden" },
            overflow: "hidden",
            py: 1,
          }}
          className="bg-[#212121] bg-opacity-80"
        >
          <IconButton
            colorScheme="#212121"
            className="hover:bg-[#3DD2CC]/30  transition duration-200 
        "
            onClick={() => {
              setActiveButton("Home");
              dispatch(setCategory(""));
              navigate("/");
            }}
          >
            <Icon
              as={AiOutlineHome}
              color={"Home" === activeButton ? "#3DD2CC" : "gray"}
              boxSize={6}
              className=" transition duration-200 cursor-pointer
            
            "
            />
          </IconButton>
          {sidebarListItems?.map((item, index) => (
            <IconButton
              colorScheme="#212121"
              className="hover:bg-[#3DD2CC]/30  transition duration-200 
        "
              key={index}
              onClick={() => {
                setActiveButton(item.name);
                dispatch(setCategory(item.category));
                navigate("/");
              }}
            >
              <Icon
                as={item.icon}
                color={item?.name === activeButton ? "#3DD2CC" : "gray"}
                boxSize={6}
                className=" transition duration-200 cursor-pointer
            
            "
              />
            </IconButton>
          ))}
        </HStack>
      </Box>
    </Flex>
  );
};

export default HomePage;
