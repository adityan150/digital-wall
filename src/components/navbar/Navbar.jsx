import React from "react";
import Icon from "../../assets/digital-wall.svg";
import { IoIosArrowBack } from "react-icons/io";
import { BsBookmark } from "react-icons/bs";
import {
  Box,
  Divider,
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const Navbar = ({ title }) => {
  const navigate = useNavigate();
  return (
    <Flex justify="space-between" align="center" h="80px" padding="20px 50px">
      <Flex justify="space-between" align="center" gap="10px">
        <div onClick={() => navigate("/")} style={{ color: "gray" }}>
          <IoIosArrowBack size={30} />
        </div>
        <img src={Icon} alt="Logo" style={{ width: "50px", height: "40px" }} />
        <Text fontSize="25px" fontWeight="bold" color="slategray">
          {title}
        </Text>
      </Flex>
      <Flex justify="space-between" align="center" gap="20px">
        <Box>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray"
              fontSize="1.5em"
              children={<SearchIcon />}
            />
            <Input
              type="text"
              placeholder="Search posts by title..."
              value={""}
            />
          </InputGroup>
        </Box>
        <Divider
          orientation="vertical"
          h={6}
          borderColor="gray"
          borderWidth={1}
        />

        <Box color="gray">
          <BsBookmark size={30} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
