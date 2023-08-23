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
  Button,
  useToast,
  SimpleGrid,
} from "@chakra-ui/react";
import { ref, set } from "firebase/database";
import React, { useEffect, useState, useMemo } from "react";
import { AiFillStar, AiOutlinePlus } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate, useParams } from "react-router-dom";
import { Loader } from "../components";
import { user } from "../features/user/userSlice";
import {
  addMovieToFavorites,
  db,
  getFavoriteMovies,
  removeFromFavorites,
} from "../firebase";
import { useGetMovieDetailQuery } from "../services/movieApi";
import { setCategory } from "../features/category/categorySlice";

const MovieDetailPage = () => {
  const [videoKey, setVideoKey] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [isAlreadyInFavorites, setIsAlreadyInFavorites] = useState(false);
  // const toast = useToast();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movieId } = useParams();

  let id = movieId?.toString();

  const userData = useSelector(user);

  let userId = userData?.id;

  // const getMoviesData = async () => {
  //   const movies = await getFavoriteMovies(userId);

  //   const movie = movies?.find((movie) => movie?.id === id);

  //   if (movie) {
  //     setIsAlreadyInFavorites(true);
  //   } else {
  //     setIsAlreadyInFavorites(false);
  //   }
  // };

  // useEffect(() => {
  //   getMoviesData();
  // }, []);

  // const showToast = (title) =>
  //   toast({
  //     title: title,
  //     status: "success",
  //     duration: 3000,
  //     isClosable: true,
  //     position: "top-right",
  //   });

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

    const directors = directorsData
      ?.slice(0, 4)
      .map((item) => item?.original_name);

    return directors;
  };

  const directors = getMovieDirectors();

  // const getMovieActors = () => {
  //   const actors = choosenMovie?.credits?.cast
  //     ?.slice(0, 4)
  //     .map((item) => item?.original_name);
  //   return actors;
  // };

  const actors = choosenMovie?.credits?.cast;

  const getVideos = () => {
    const videos = choosenMovie?.videos?.results?.map((item) => item?.key);
    return videos;
  };

  // const addToFavorites = () => {
  //   let movieImage = choosenMovie?.poster_path;
  //   let ratings = choosenMovie?.vote_average?.toFixed(1);

  //   let movieName = choosenMovie?.original_title || choosenMovie?.title;
  //   addMovieToFavorites(id, movieImage, ratings, userId, movieName);
  //   showToast("Added to favorites successfully.");
  // };

  const videos = getVideos();
  return (
    <Box className="px-5">
      {/* Banner */}
      <Box className=" mt-5 relative ">
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
      {/* Content */}
      <Box className="py-10 max-w-3xl">
        <Box>
          {/* Heading */}
          <Heading color="white">
            {choosenMovie?.original_title || choosenMovie?.title}
          </Heading>
          {/* Tagline */}
          {choosenMovie?.tagline && (
            <Text
              color="white"
              fontSize="md"
              className="my-5"
            >{`"${choosenMovie?.tagline}"`}</Text>
          )}
          {/* Genres  */}

          <Box className="space-y-7 sm:space-y-0 sm:flex sm:justify-between sm:items-center ">
            <HStack gap="3" flexWrap="wrap">
              {choosenMovie?.genres?.map((genre) => (
                <Tag
                  variant="outline"
                  color="#3DD2CC"
                  key={genre?.id}
                  onClick={() => {
                    dispatch(setCategory(genre?.id));
                    navigate("/");
                  }}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  {genre?.name}
                </Tag>
              ))}
            </HStack>
            <Box
              className=" flex justify-start items-center space-x-2 bg-white bg-opacity-20
        py-1 pl-2 rounded-lg  max-w-[70px] sm:w-full
         "
            >
              <Icon as={AiFillStar} color="#FFBF00 " />
              <Text
                fontSize="xs"
                color="white"
                className="hover:text-[#3DD2CC]"
              >
                {choosenMovie?.vote_average?.toFixed(1)}
              </Text>
            </Box>
          </Box>
        </Box>
        {/* overview */}

        <Box className="mt-7 space-y-5">
          <Heading as="h2" size="xl" color="white" className="">
            Overview
          </Heading>
          <Text color="white" fontSize="sm" className=" ">
            {choosenMovie?.overview}
          </Text>
        </Box>

        {/* {isAlreadyInFavorites ? (
          <Button
            leftIcon={<IoMdRemoveCircleOutline />}
            bgColor="#191919"
            color="#3DD2CC"
            variant="outline"
            className="mt-5 "
            sx={{
              _hover: {
                backgroundColor: "#191919",
                opacity: "0.8",
              },
            }}
            onClick={() => {
              removeFromFavorites(id);
              showToast("Successfully removed from favorites.");
              getMoviesData();
            }}
          >
            remove from favorites
          </Button>
        ) : (
          <Button
            leftIcon={<AiOutlinePlus />}
            bgColor="#191919"
            color="#3DD2CC"
            variant="outline"
            className="mt-5 "
            sx={{
              _hover: {
                backgroundColor: "#191919",
                opacity: "0.8",
              },
            }}
            onClick={() => {
              addToFavorites();
              getMoviesData();
            }}
          >
            Add to favorites
          </Button>
        )} */}

        {/* Directors, release date, website */}
        <Box className="mt-10">
          {/* Directors */}
          <Text fontSize="md" fontFamily="Poppins" color="white">
            Directors:
            <span className="text-[#3DD2CC] ml-2">
              {directors?.map((director) => `${director}${" "},`)}
            </span>
          </Text>
          <Divider className="my-1" />

          {/* <Text
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
          <Divider className="my-1" /> */}
          {/* Release date */}
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
          {/* Website homepage */}
          {choosenMovie?.homepage && (
            <>
              <Text
                fontSize="md"
                fontFamily="Poppins"
                color="white"
                className="mt-5"
              >
                Website:
                <span className="text-[#3DD2CC] ml-2 ">
                  <a
                    href={choosenMovie?.homepage}
                    style={{ textDecoration: "none", color: "#3DD2CC" }}
                    target="_blank"
                    rel="noreferrer"
                    className=""
                  >
                    url
                  </a>
                </span>
              </Text>
              <Divider className="my-1" />
            </>
          )}
        </Box>
        {/* Actors row */}
        <Heading
          as="h2"
          size="xl"
          color="white"
          sx={{
            mt: 20,
            mb: 10,
          }}
        >
          Top cast
        </Heading>
        <SimpleGrid
          minChildWidth="120px"
          spacing="40px"
          sx={{
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          {actors.map((actor) => (
            <>
              {actor?.profile_path && (
                <Link to={`/actor/${actor?.id}`}>
                  <Box
                    key={actor?.id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      boxSize="100px"
                      objectFit="cover"
                      src={`https://image.tmdb.org/t/p/original/${actor?.profile_path}`}
                      alt={actor?.name}
                      borderRadius="md"
                    />

                    <Text color="whiteAlpha.900" mt={2}>
                      {actor?.name}
                    </Text>
                  </Box>
                </Link>
              )}
            </>
          ))}
        </SimpleGrid>
      </Box>
      {/* Modal */}
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
