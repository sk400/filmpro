import {
  Box,
  Center,
  Heading,
  Image,
  Text,
  Icon,
  Tag,
  HStack,
  Divider,
  AspectRatio,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";

import { useParams } from "react-router-dom";
import { Loader } from "../components";
import { useGetMovieDetailQuery } from "../services/movieApi";

const MovieDetailPage = () => {
  const [videoKey, setVideoKey] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { movieId } = useParams();

  const { data, isFetching, error } = useGetMovieDetailQuery({ movieId });

  if (isFetching) return <Loader />;

  if (error)
    return (
      <Text fontSize="sm" fontFamily="Poppins">
        Sorry! An unexpected error occured
      </Text>
    );

  // console.log(data);

  let choosenMovie = data;

  const getMovieDirectors = () => {
    const directorsData = choosenMovie?.credits?.crew?.filter(
      (item) => item?.department === "Directing"
    );

    const directors = directorsData?.map((item) => item?.original_name);

    return directors;
  };

  const directors = getMovieDirectors();

  const getMovieActors = () => {
    const actors = choosenMovie?.credits?.cast
      ?.slice(0, 4)
      .map((item) => item?.original_name);
    return actors;
  };

  const actors = getMovieActors();

  const getVideos = () => {
    const videos = choosenMovie?.videos?.results?.map((item) => item?.key);
    return videos;
  };

  const videos = getVideos();

  // console.log(videos);

  return (
    <Box>
      <Box className="px-5 mt-5 relative ">
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
              onClick={() => {
                onOpen();
                setVideoKey(videos[0]);
              }}
            />
          </Center>
        </Box>
      </Box>
      <Box className="px-5 py-10 ">
        <Box className="space-y-5">
          <Heading as="h1" size="2xl" color="white">
            {choosenMovie?.original_title || choosenMovie?.title}
          </Heading>
          {choosenMovie?.tagline && (
            <Text
              color="white"
              fontSize="md"
              className="my-5"
            >{`"${choosenMovie?.tagline}"`}</Text>
          )}
          <Box className="flex justify-between items-center max-w-3xl">
            <HStack gap="2">
              {choosenMovie?.genres?.map((genre) => (
                <Tag variant="outline" color="#3DD2CC">
                  {genre?.name}
                </Tag>
              ))}
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

        {/* <Divider className="my-5 max-w-3xl" /> */}

        <Box className="max-w-3xl mt-10">
          <Text fontSize="md" fontFamily="Poppins" color="white">
            Directors:
            <span className="text-[#3DD2CC] ml-2">
              {directors?.map((director) => `${director}${" "},`)}
            </span>
          </Text>
          <Divider className="my-1" />
          <Text
            fontSize="md"
            fontFamily="Poppins"
            color="white"
            className="mt-5"
          >
            Actors:{" "}
            <span className="text-[#3DD2CC] ml-2">
              {actors?.map((actor) => `${actor}${" "},`)}
            </span>
          </Text>
          <Divider className="my-1" />
          <Text
            fontSize="md"
            fontFamily="Poppins"
            color="white"
            className="mt-5"
          >
            Release date:
            <span className="text-[#3DD2CC] ml-2">
              {choosenMovie?.release_date}
            </span>
          </Text>
          <Divider className="my-1" />
          {choosenMovie?.homepage && (
            <>
              <Text
                fontSize="md"
                fontFamily="Poppins"
                color="white"
                className="mt-5"
              >
                Website:
                <span className="text-[#3DD2CC] ml-2">
                  <a
                    href={choosenMovie?.homepage}
                    style={{ textDecoration: "none", color: "#3DD2CC" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {choosenMovie?.homepage}
                  </a>
                </span>
              </Text>
              <Divider className="my-1" />
            </>
          )}
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton sx={{ color: "#3DD2CC" }} />
          <ModalBody
            sx={{
              py: 9,
              px: 3,
              bgColor: "#191919",
            }}
          >
            <AspectRatio ratio={4 / 3}>
              <iframe
                title="video"
                src={`https://www.youtube.com/embed/${videoKey && videoKey}`}
                allowFullScreen
              />
            </AspectRatio>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MovieDetailPage;
