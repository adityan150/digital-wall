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
  Flex,
} from "@chakra-ui/react";
import { SearchIcon, AddIcon } from "@chakra-ui/icons";
import logoImage from "../../assets/digital-wall.svg";
import { useNavigate } from "react-router-dom";
import BoardModal from "../boardModal/BoardModal";
import BoardCard from "../boardCard/BoardCard";

const Home = () => {
  const [openBoardId, setOpenBoardId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("#A7F0F9");
  const [boards, setBoards] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editBoardId, setEditBoardId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedBoards = localStorage.getItem("boards");
    const parsedBoards = JSON.parse(storedBoards) || [];
    setBoards(parsedBoards);
  }, []);

  const handleMenuToggle = (id) => {
    setOpenBoardId(id === openBoardId ? null : id);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleModalOpen = () => {
    setSelectedColor("#A7F0F9");
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
    // if there are no boards left, remove the boards key from localStorage
    if (updatedBoards.length === 0) {
      localStorage.removeItem("boards");
      localStorage.removeItem("posts");
      return;
    }

    localStorage.setItem("boards", updatedBoards);

    // remove all posts from the deleted board
    const posts = localStorage.getItem("posts");
    const parsedPosts = JSON.parse(posts) || [];
    const updatedPosts = parsedPosts.filter((post) => post.boardId !== id);
    // if there are no posts left, remove the posts key from localStorage
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
    setSelectedColor("#A7F0F9");
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

    let updatedBoards = boards.filter((board) => board.id !== editBoardId);
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
        <Flex
          width="100vw"
          align="center"
          justify="space-between"
          padding="20px 50px"
        >
          <Flex justify="space-between" align="center" gap="10px">
            <img
              src={logoImage}
              alt="Logo"
              style={{ width: "50px", height: "40px" }}
            />
            <Text fontSize="25px" fontWeight="bold" color="slategray">
              The Wall
            </Text>
          </Flex>
          <Flex gap="20px">
            <div>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  borderRadius="10rem"
                  color="gray"
                  fontSize="1.2em"
                  children={<SearchIcon />}
                  marginLeft="10px"
                />
                <Input
                  type="text"
                  placeholder="Search..."
                  focusBorderColor="gray.400"
                  fontSize="1.1em"
                  boxShadow="sm"
                  rounded="md"
                  pl="2.5em"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </InputGroup>
            </div>
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
          </Flex>
        </Flex>
      </Box>
      <Divider borderColor="gray.300" />
      <Box>
        <Text fontSize="37px" fontWeight="bold" margin="40px">
          My boards
        </Text>
        <Flex
          width="100vw"
          flexDirection="row"
          flexWrap="wrap"
          gap="50px"
          padding="0 40px"
          justifyContent="flex-start"
          align="flex-start"
        >
          {filteredBoards.map((board, index) => (
            <BoardCard
              key={index}
              board={board}
              openBoardId={openBoardId}
              setOpenBoardId={setOpenBoardId}
              handleMenuToggle={handleMenuToggle}
              handleNavigation={handleNavigation}
              handleEditBoard={handleEditBoard}
              handleDeleteBoard={handleDeleteBoard}
            />
          ))}
        </Flex>
        <BoardModal
          isModalOpen={isModalOpen}
          handleModalClose={handleModalClose}
          boardTitle={boardTitle}
          handleBoardTitleChange={handleBoardTitleChange}
          selectedColor={selectedColor}
          handleColorChange={handleColorChange}
          isEditing={isEditing}
          handleCreateBoard={handleCreateBoard}
          handleUpdateBoard={handleUpdateBoard}
        />
      </Box>
    </>
  );
};

export default Home;
