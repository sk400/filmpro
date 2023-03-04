import React from "react";
import { useGetAllMoviesQuery } from "../services/movieApi";
import {
  CategoriesColumn,
  Loader,
  MainContainer,
  Sidebar,
} from "../components";
import { Box, Flex } from "@chakra-ui/react";

const HomePage = () => {
  const { data, isFetching, error } = useGetAllMoviesQuery();

  if (isFetching) return <Loader />;

  if (error) return "An unexpected error occured";

  // console.log(data);

  return (
    <Flex direction="row" align="center" className=" bg-[#191919] ">
      <Box>
        <Sidebar />
      </Box>
      <Box className="flex-1">
        <MainContainer />
      </Box>
      {/* <Box>
        <CategoriesColumn />
      </Box> */}
    </Flex>
  );
};

export default HomePage;
