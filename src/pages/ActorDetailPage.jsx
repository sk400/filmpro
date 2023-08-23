import React from "react";
import {
  useGetActorDetailsQuery,
  useGetMoviesByActorQuery,
} from "../services/movieApi";
import { Loader, Movies } from "../components";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const ActorDetailPage = () => {
  const { actorId } = useParams();
  const { data, isFetching, error } = useGetActorDetailsQuery({ actorId });
  const { data: moviesData } = useGetMoviesByActorQuery({ actorId });

  if (isFetching) return <Loader />;

  if (error)
    return (
      <Text fontSize="sm" fontFamily="Poppins">
        Sorry! An unexpected error occured
      </Text>
    );

  const actorDetails = data;
  const moviesByActor = moviesData?.results;

  const getLocalDate = (d) => {
    const date = new Date(d);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const result = date.toLocaleDateString("en-US", options);
    return result;
  };

  const createImageUrl = (path) =>
    `https://image.tmdb.org/t/p/original/${path}`;

  return (
    <Box>
      {/* Big image and bio */}
      <Flex
        sx={{
          flexDirection: { base: "column", sm: "row", md: "row", lg: "row" },
          alignItems: { base: "center", sm: "start" },
          p: 5,
          mb: 10,
          gap: { base: "20px", sm: "20px", md: "40px" },
        }}
      >
        {/* Actor image */}
        <Image
          objectFit="cover"
          src={createImageUrl(actorDetails?.profile_path)}
          alt={actorDetails?.name}
          borderRadius="md"
          sx={{
            maxWidth: "300px",
          }}
        />
        {/* Actor bio */}
        <Box
          color="white"
          sx={{
            pt: { base: 0, sm: 0, md: 10 },
          }}
        >
          <Text fontSize="xl" fontWeight="semibold" mb={3}>
            Born: {getLocalDate(actorDetails?.birthday)}
          </Text>
          <Text color="whiteAlpha.900" maxWidth="2xl">
            {actorDetails?.biography}
          </Text>
        </Box>
      </Flex>
      {/* Movies by actor */}
      <Movies movies={moviesByActor} />
    </Box>
  );
};

export default ActorDetailPage;
