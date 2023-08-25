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

import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlinePlus } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate, useParams } from "react-router-dom";
import { Loader } from "../components";
import { user } from "../features/user/userSlice";
import { addMovieToFavorites, addMovieToWatchlist, db } from "../firebase";
import { useGetMovieDetailQuery } from "../services/movieApi";
import { setCategory } from "../features/category/categorySlice";
import { useGetFavorites } from "../utils/hooks/useGetFavorites";
import { extractMovieData } from "../utils/data";
import { useGetWatchlist } from "../utils/hooks/useGetWatchlist";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";

const MovieDetailPage = () => {
  const [videoKey, setVideoKey] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAlreadyInFavorites, setIsAlreadyInFavorites] = useState(false);
  const [isAlreadyInWatchlist, setIsAlreadyInWatchlist] = useState(false);

  const toast = useToast();
  const userData = useSelector(user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movieId } = useParams();

  let id = movieId?.toString();

  let userId = userData?.email;

  // Checking if the movie is in favorite movies

  const [favoriteMovies] = useCollection(
    userData?.email &&
      collection(db, "users", userData?.email, "favoriteMovies")
  );

  useEffect(() => {
    const getFavoriteMoviesData = async () => {
      let movieData = [];

      favoriteMovies?.docs?.map((doc) => {
        movieData.push(doc.data());
      });

      const movie = movieData?.find((item) => item?.id?.toString() === id);

      if (movie) {
        setIsAlreadyInFavorites(true);
      } else {
        setIsAlreadyInFavorites(false);
      }
    };
    getFavoriteMoviesData();
  }, [favoriteMovies?.docs]);

  // Checking if the movie is in watchlist

  const [watchlist] = useCollection(
    userData?.email && collection(db, "users", userData?.email, "watchlist")
  );

  useEffect(() => {
    const getWatchlistData = async () => {
      let movieData = [];

      watchlist?.docs?.map((doc) => {
        movieData.push(doc.data());
      });

      const movie = movieData?.find((item) => item?.id?.toString() === id);

      if (movie) {
        setIsAlreadyInWatchlist(true);
      } else {
        setIsAlreadyInWatchlist(false);
      }
    };
    getWatchlistData();
  }, [watchlist?.docs]);

  const showToast = (title) =>
    toast({
      title: title,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });

  const { data, isFetching, error } = useGetMovieDetailQuery({ movieId });

  if (isFetching) return <Loader />;

  if (error)
    return (
      <Text fontSize="sm" fontFamily="Poppins">
        Sorry! An unexpected error occured
      </Text>
    );

  let choosenMovie = data;

  const [directors, actors, videos] = extractMovieData(choosenMovie);

  const addToFavorites = () => {
    let movieImage = choosenMovie?.poster_path;
    let ratings = choosenMovie?.vote_average?.toFixed(1);

    let movieName = choosenMovie?.original_title || choosenMovie?.title;
    addMovieToFavorites(id, movieImage, ratings, userId, movieName);
    showToast("Added to favorites successfully.");
  };

  const addToWatchlist = () => {
    let movieImage = choosenMovie?.poster_path;
    let ratings = choosenMovie?.vote_average?.toFixed(1);

    let movieName = choosenMovie?.original_title || choosenMovie?.title;
    addMovieToWatchlist(movieId, movieImage, ratings, userId, movieName);
    showToast("Added to watchlist successfully.");
  };

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
        {/* Add to favorites button  */}

        {!isAlreadyInFavorites && (
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
            }}
          >
            Add to favorites
          </Button>
        )}

        {/* Add to watchlist button */}

        {!isAlreadyInWatchlist && (
          <Button
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
              addToWatchlist();
            }}
          >
            Add to watchlist
          </Button>
        )}

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
