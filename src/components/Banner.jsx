import React from "react";

import {
  Box,
  Flex,
  Image,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Icon,
} from "@chakra-ui/react";

import { AiFillInfoCircle, AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const Banner = ({ bannerData }) => {
  const navigate = useNavigate();
  return (
    <Box className="px-5 mt-5 relative">
      <Image
        src={`https://image.tmdb.org/t/p/original/${bannerData?.backdrop_path}`}
        alt={bannerData?.title}
        borderRadius="lg"
        className="h-[250px] w-full object-cover z-30 cursor-pointer"
      />
      <Box className="absolute  bottom-[20px] right-[50px] ">
        <Flex gap={4}>
          <Tag
            size="lg"
            sx={{
              opacity: "0.8",
              bgColor: "#3DD2CC",
              _hover: {
                opacity: "1",
              },
              cursor: "pointer",
            }}
            className="transition duration-200"
            onClick={() => navigate(`/movie/${bannerData?.id}`)}
          >
            <TagLeftIcon boxSize="12px" as={AiFillInfoCircle} />
            <TagLabel>More info</TagLabel>
          </Tag>
        </Flex>
      </Box>
      <Box
        className="absolute top-5 right-10 flex items-center space-x-2 bg-white bg-opacity-30
      py-1 px-2 rounded-lg  z-20 cursor-pointer
      "
      >
        <Icon as={AiFillStar} color="#FFBF00 " />
        <Text fontSize="xs" color="white" className="hover:text-[#3DD2CC]">
          {bannerData?.vote_average}
        </Text>
      </Box>
    </Box>
  );
};

export default Banner;
