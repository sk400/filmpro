import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "../features/category/categorySlice";

const Searchbar = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchText));
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <InputGroup sx={{ display: "flex", alignItems: "center" }}>
          <InputLeftElement pointerEvents="none">
            <AiOutlineSearch color="gray" />
          </InputLeftElement>
          <Input
            variant="filled"
            placeholder="Search..."
            bgColor="#212121"
            color="white"
            focusBorderColor="#3DD2CC"
            className="hover:bg-[#3DD2CC]/30 rounded-xl"
            borderRadius="full"
            sx={{
              _hover: { bg: "#212121", borderColor: "#3DD2CC" },
            }}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </InputGroup>
      </form>
    </Box>
  );
};

export default Searchbar;
