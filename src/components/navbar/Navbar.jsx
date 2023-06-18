import React from "react";
import Icon from "../../assets/ToddleIcon.png";
import { IoIosArrowBack } from "react-icons/io";
import { BsBookmark } from "react-icons/bs";
import {
  Box,
  Divider,
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const Navbar = ({ title }) => {
  const navigate = useNavigate();
  return (
    <Box>
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          className="Arrow"
          onClick={() => navigate("/")}
          style={{ marginTop: "5px", color: "gray" }}
        >
          <IoIosArrowBack size={30} />
        </div>
        <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <img
            src={Icon}
            alt="Logo"
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
          />
          <Text
            fontSize="20px"
            fontWeight="bold"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {title}
          </Text>
        </div>
        <InputGroup width="200px">
          <InputRightElement
            pointerEvents="none"
            borderRadius="10rem"
            color="gray.900"
            fontSize="1.2em"
            alignContent={"center"}
            children={<SearchIcon color="gray.300" />}
            marginRight="10px"
          />
        </InputGroup>

        <Divider
          orientation="vertical"
          mx={4}
          h={6}
          mt={2}
          borderColor="gray"
          borderWidth={1}
        />

        <Box mt={1.5} color="gray" mr={5}>
          <BsBookmark size={30} />
        </Box>
      </div>
    </Box>
  );
};

export default Navbar;
