import React, { useState, useEffect } from "react";
import {
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Stack,
  Box,
  Divider,
  Text,
  Card,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  RadioGroup,
  HStack,
} from "@chakra-ui/react";
import { SearchIcon, AddIcon } from "@chakra-ui/icons";
import { FaEdit, FaTrash, FaEllipsisV } from "react-icons/fa";
import { Circle, Icon } from "@chakra-ui/react";

import logoImage from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [openBoardIndex, setOpenBoardIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("blue.500");
  const [boards, setBoards] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editBoardId, setEditBoardId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedBoards = localStorage.getItem("boards");
    if (!storedBoards) {
      return;
    }
    const parsedBoards = JSON.parse(storedBoards);
    setBoards(parsedBoards);
  }, []);

  const handleMenuToggle = (index) => {
    setOpenBoardIndex(index === openBoardIndex ? null : index);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleModalOpen = () => {
    setSelectedColor("blue.500");
    setBoardTitle("");
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleBoardTitleChange = (event) => {
    setBoardTitle(event.target.value);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleDeleteBoard = (id) => {
    const updatedBoards = boards.filter((board) => board.id !== id);
    setBoards(updatedBoards);
    if (updatedBoards.length === 0) {
      localStorage.removeItem("boards");
      localStorage.removeItem("posts");
      return;
    }

    localStorage.setItem("boards", updatedBoards);

    const posts = localStorage.getItem("posts");
    const parsedPosts = JSON.parse(posts);
    const updatedPosts = parsedPosts.filter((post) => post.boardId !== id);
    if (updatedPosts.length === 0) {
      localStorage.removeItem("posts");
      return;
    }
    localStorage.setItem("posts", updatedPosts);
  };

  const handleCreateBoard = () => {
    const newBoard = {
      id: Math.random().toString(36).substr(2, 9),
      title: boardTitle,
      color: selectedColor,
    };
    const updatedBoards = [...boards, newBoard];
    setBoards(updatedBoards);
    localStorage.setItem("boards", JSON.stringify(updatedBoards));
    setIsModalOpen(false);
    setBoardTitle("");
    setSelectedColor("blue.500");
  };

  const handleNavigation = (boardId) => {
    return navigate(`/board/${boardId}`);
  };

  const handleEditBoard = (boardId) => {
    setIsEditing(true);
    setEditBoardId(boardId);
    const boardToEdit = boards.find((board) => board.id === boardId);
    setBoardTitle(boardToEdit.title);
    setSelectedColor(boardToEdit.color);
    setIsModalOpen(true);
  };

  const handleUpdateBoard = () => {
    const oldBoard = boards.find((board) => board.id === editBoardId);
    const newBoard = {
      id: oldBoard.id,
      title: boardTitle,
      color: selectedColor,
    };

    let updatedBoards = boards.filter((board) => board.id != editBoardId);
    updatedBoards = [...updatedBoards, newBoard];
    setBoards(updatedBoards);
    localStorage.setItem("boards", JSON.stringify(updatedBoards));
    setIsModalOpen(false);
    setBoardTitle("");
    setSelectedColor("blue.500");
  };

  const filteredBoards = boards.filter((board) =>
    board.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Box>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={logoImage}
              alt="Logo"
              style={{ width: "110px", height: "40px", marginRight: "900px" }}
            />
            <InputGroup marginRight={"30px"}>
              <InputLeftElement
                pointerEvents="none"
                borderRadius="10rem"
                color="gray.400"
                fontSize="1.2em"
                children={<SearchIcon color="blue.300" />}
                marginLeft="10px"
              />
              <Input
                type="tel"
                placeholder="Search.."
                focusBorderColor="blue.400"
                fontSize="1.1em"
                boxShadow="sm"
                rounded="md"
                pl="2.5em"
                value={searchTerm}
                onChange={handleSearch}
              />
            </InputGroup>
            <Stack ml={4}>
              <Button
                leftIcon={<AddIcon />}
                colorScheme="red"
                variant="solid"
                onClick={handleModalOpen}
              >
                Create new board
              </Button>
            </Stack>
          </div>
        </div>
      </Box>
      <Divider mt={2} borderColor="gray.300" />
      <Box>
        <Text fontSize="37px" fontWeight="bold" margin="40px">
          My boards
        </Text>
        <Stack
          direction={{ base: "column", sm: "row" }}
          spacing={4}
          flexWrap="wrap"
        >
          {filteredBoards.map((board, index) => (
            <Box position="relative" key={index}>
              <Card
                onClick={(event) => handleNavigation(board.id)}
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                w="400px"
                h="80px"
                marginLeft={"40px"}
                alignItems="center"
                paddingLeft="20%"
                style={{
                  display:
                    !board.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) && "none",
                }}
              >
                <Text
                  fontSize="12px"
                  color="black"
                  display="flex"
                  alignItems="center"
                  marginRight={"10px"}
                >
                  {board.title}
                </Text>
                <Box
                  bg={board.color}
                  position="absolute"
                  left={0}
                  top={0}
                  bottom={0}
                  width="20%"
                ></Box>
                <Box
                  position="absolute"
                  right={0}
                  top="50%"
                  transform="translateY(-50%)"
                  paddingRight="10px"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleMenuToggle(index);
                  }}
                  cursor="pointer"
                >
                  <FaEllipsisV />
                </Box>
              </Card>
              {openBoardIndex === index && (
                <Menu
                  isOpen={true}
                  onClose={() => setOpenBoardIndex(null)}
                  placement="right"
                  style={{
                    width: "40%",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                    borderRadius: "0.5rem",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <MenuButton
                    as={Box}
                    position="absolute"
                    left="86%"
                    top="120%"
                    transform="translateY(-50%)"
                    zIndex={1}
                    bg="white"
                    rounded="md"
                    mt="1px"
                    onClick={() => handleMenuToggle(index)}
                  ></MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => handleEditBoard(board.id)}>
                      <FaEdit color="grey" style={{ marginRight: "0.5em" }} />{" "}
                      Edit
                    </MenuItem>
                    <MenuItem onClick={() => handleDeleteBoard(board.id)}>
                      <FaTrash color="red" style={{ marginRight: "0.5em" }} />{" "}
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Box>
          ))}
        </Stack>
      </Box>
      <Modal isOpen={isModalOpen} onClose={handleModalClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={"bold"}>
            Add a name for your board
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="boardTitle">
              <Input
                type="text"
                placeholder="Enter board name"
                value={boardTitle}
                onChange={handleBoardTitleChange}
              />
            </FormControl>
            <FormControl id="boardColor">
              <FormLabel
                marginTop={"30px"}
                fontWeight={"bold"}
                fontSize={"20px"}
              >
                Select post colour
              </FormLabel>
              <Text fontSize={"12px"} marginTop={"0px"}>
                Here are some templates to choose from
              </Text>

              <RadioGroup onChange={handleColorChange} value={selectedColor}>
                <HStack spacing={4} marginTop={"10px"}>
                  <Circle
                    size="5"
                    bg="blue.200"
                    onClick={() => handleColorChange("blue.200")}
                    border={
                      selectedColor === "blue.200" ? "2px solid black" : "none"
                    }
                  />
                  <Circle
                    size="5"
                    bg="purple.200"
                    onClick={() => handleColorChange("purple.200")}
                    border={
                      selectedColor === "purple.200"
                        ? "2px solid black"
                        : "none"
                    }
                  />
                  <Circle
                    size="5"
                    bg="pink.200"
                    onClick={() => handleColorChange("pink.200")}
                    border={
                      selectedColor === "pink.200" ? "2px solid black" : "none"
                    }
                  />
                  <Circle
                    size="5"
                    bg="yellow.300"
                    onClick={() => handleColorChange("yellow.300")}
                    border={
                      selectedColor === "yellow.300"
                        ? "2px solid black"
                        : "none"
                    }
                  />
                </HStack>
              </RadioGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleModalClose}>
              Cancel
            </Button>
            {isEditing ? (
              <Button colorScheme="red" mr={3} onClick={handleUpdateBoard}>
                Update board
              </Button>
            ) : (
              <Button colorScheme="red" mr={3} onClick={handleCreateBoard}>
                Create board
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Home;
