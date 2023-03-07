import {
  Box,
  Center,
  Heading,
  Image,
  Text,
  Icon,
  Tag,
  HStack,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { FiAirplay } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { Banner, Loader } from "../components";
import { useGetMovieDetailQuery } from "../services/movieApi";

const MovieDetailPage = () => {
  const { movieId } = useParams();

  const { data, isFetching, error } = useGetMovieDetailQuery({ movieId });

  if (isFetching) return <Loader />;

  if (error)
    return <Text fontSize="sm">Sorry! An unexpected error occured</Text>;

  console.log(data);

  let choosenMovie = data;

  return (
    <Box>
      <Box className="px-5 mt-5 relative">
        <Image
          src={`https://image.tmdb.org/t/p/original/${choosenMovie?.backdrop_path}`}
          alt={choosenMovie?.title}
          borderRadius="lg"
          className="h-[250px] w-full object-cover z-30 cursor-pointer"
        />
        <Box
          className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center
        "
        >
          <Center>
            <Icon
              as={BsFillPlayFill}
              color="white"
              width={16}
              height={16}
              className=" p-2 bg-white bg-opacity-50 rounded-full cursor-pointer "
            />
          </Center>
        </Box>
      </Box>
      <Box className="px-5 py-10 ">
        <Box className="space-y-5">
          <Heading as="h1" size="2xl" color="white">
            {choosenMovie?.original_title || choosenMovie?.title}
          </Heading>
          <Text
            color="white"
            fontSize="md"
            className="my-5"
          >{`"${choosenMovie?.tagline}"`}</Text>
          <Box className="flex justify-between items-center max-w-3xl">
            <HStack gap="2">
              <Tag variant="outline" color="#3DD2CC">
                Action
              </Tag>
              <Tag variant="outline" color="#3DD2CC">
                Drama
              </Tag>
            </HStack>
            <Box
              className=" flex items-center space-x-2 bg-white bg-opacity-20
      py-1 px-2 rounded-lg  z-20
      "
            >
              <Icon as={AiFillStar} color="#FFBF00 " />
              <Text
                fontSize="xs"
                color="white"
                className="hover:text-[#3DD2CC]"
              >
                {choosenMovie?.vote_average}
              </Text>
            </Box>
          </Box>
        </Box>

        <Box className="mt-7">
          <Heading as="h2" size="xl" color="white" className="space-y-5">
            Overview
          </Heading>
          <Text color="white" fontSize="sm" className="max-w-3xl ">
            {choosenMovie?.overview}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieDetailPage;
