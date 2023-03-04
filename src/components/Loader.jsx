import { Center } from "@chakra-ui/react";
import React from "react";
import { Circles } from "react-loader-spinner";

const Loader = () => {
  return (
    <Center className="h-screen">
      <Circles
        height="80"
        width="80"
        color="#3DD2CC"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Center>
  );
};

export default Loader;
