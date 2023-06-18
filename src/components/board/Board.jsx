import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Icon from "../../assets/ToddleIcon.png";
import { IoIosArrowBack } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { SearchIcon, AddIcon } from "@chakra-ui/icons";
import NoPostMobile from "../../assets/NoPostMobile.png";
import { BsThreeDotsVertical, BsBookmarkFill } from "react-icons/bs";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BsBookmark } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Board = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [subject, setSubject] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [board, setBoard] = useState({});
  const [posts, setPosts] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (searchQuery === "") {
      setSearchResults(posts);
    } else {
      const filteredPosts = posts.filter((post) =>
        post.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredPosts);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery, posts]);

  useEffect(() => {
    const boards = localStorage.getItem("boards");
    if (!boards) {
      navigate("/notfound");
      return;
    }
    const parsedBoards = JSON.parse(boards);
    const board = parsedBoards.find((board) => board.id === id);
    if (!board) {
      navigate("/notfound");
      return;
    }
    setBoard(board);

    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      const parsedPosts = JSON.parse(storedPosts);
      const boardPosts = parsedPosts.filter(
        (post) => post.boardId === board.id
      );
      setPosts(boardPosts);
    }
  }, []);

  const handleClickBookmark = (id) => {};

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCreatePost = () => {
    onOpen();
    const newPost = {
      id: Math.random().toString(36).substr(2, 9),
      boardId: board.id,
      subject: subject,
      image: image,
      description: description,
      isBookmarked: false,
      likes: 0,
    };

    const existingPosts = localStorage.getItem("posts");
    const updatedPosts = existingPosts ? JSON.parse(existingPosts) : [];

    updatedPosts.push(newPost);

    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    setPosts([...posts, newPost]);

    setSubject("");
    setImage(null);
    setDescription("");
    onClose();
  };

  const handleDeleteCard = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(posts);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPosts(items);
    localStorage.setItem("posts", JSON.stringify(items));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <>
      <Box>
        <div
          style={{
            backgroundColor: "white",
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          <div
            onClick={() => navigate("/")}
            className="Arrow"
            style={{ margin: "5px", color: "gray" }}
          >
            <IoIosArrowBack size={30} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "auto",
            }}
          >
            <img
              src={Icon}
              alt="Logo"
              style={{ width: "40px", height: "40px" }}
            />
            <h1
              style={{
                display: "flex",
                whiteSpace: "nowrap",
                fontWeight: "bold",
                fontSize: "25px",
                fontFamily: "Montserrat",
                marginLeft: "auto",
              }}
            >
              {board.title}
            </h1>
          </div>

          <Box color="gray" h={6} mr={5} mt={2}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray"
                fontSize="1.5em"
                children={<SearchIcon />}
                marginLeft="10px"
              />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </InputGroup>
          </Box>

          <Divider
            orientation="vertical"
            mx={4}
            h={6}
            mt={2}
            borderColor="gray"
            borderWidth={1}
          />

          <Box color={"gray"} h={6} mr={5} mt={2}>
            <BsBookmarkFill style={{ fontSize: "1.5rem" }} />
          </Box>
        </div>
      </Box>
      <Divider mt={2} borderColor="gray.300" />
      <Box
        display="flex"
        alignItems="center"
        backgroundColor={"rgba(235, 252, 255, 1)"}
      >
        <Button
          ml={"auto"}
          height={50}
          width={300}
          mt={5}
          leftIcon={<AddIcon />}
          colorScheme="red"
          variant="solid"
          onClick={onOpen}
        >
          Create new Post
        </Button>
      </Box>
      <Box
        backgroundColor={"rgba(235, 252, 255, 1)"}
        width={"100%"}
        height={"100vh"}
      >
        {!posts || posts.length === 0 ? (
          <>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={NoPostMobile}
                alt="Logo"
                style={{
                  width: "200px",
                  height: "200px",
                  marginLeft: "900px",
                  marginTop: "200px",
                }}
              />
            </div>
            <Text fontSize="20px" fontWeight="bold" marginLeft={"900px"}>
              Nothing here yet
            </Text>
            <Text
              fontSize="15px"
              fontWeight="light"
              margin="10px"
              marginLeft={"800px"}
            >
              Create your first post by clicking on the '+' button above
            </Text>
          </>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="posts">
              {(provided) => (
                <div
                  style={{ padding: "20px", display: "flex", flexWrap: "wrap" }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {searchResults.map((post, index) => (
                    <Draggable
                      key={index}
                      draggableId={index.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <Box
                          marginLeft={"20px"}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card
                            maxW="md"
                            width={"275px"}
                            height={"600px"}
                            marginLeft={"79px"}
                          >
                            <CardHeader>
                              <Flex justify="space-between" alignItems="center">
                                <Flex
                                  gap="4"
                                  alignItems="center"
                                  flexWrap="wrap"
                                >
                                  <Box>
                                    <Heading
                                      fontSize={"30px"}
                                      fontWeight={"bold"}
                                    >
                                      {post.subject}
                                    </Heading>
                                    <Text color={"grey"} marginTop={"2px"}>
                                      25th July
                                    </Text>
                                  </Box>
                                </Flex>
                                <Flex>
                                  <IconButton
                                    variant="ghost"
                                    colorScheme="gray"
                                    aria-label="Bookmark"
                                    icon={
                                      post.isBookmarked ? (
                                        <BsBookmarkFill />
                                      ) : (
                                        <BsBookmark />
                                      )
                                    }
                                    onClick={() => handleClickBookmark(post.id)}
                                  />

                                  <Menu>
                                    <MenuButton
                                      as={IconButton}
                                      variant="ghost"
                                      colorScheme="gray"
                                      aria-label="See menu"
                                      icon={<BsThreeDotsVertical />}
                                    />
                                    <MenuList>
                                      <MenuItem>
                                        <FaEdit
                                          color="gray"
                                          style={{ marginRight: "0.5em" }}
                                        />{" "}
                                        Edit
                                      </MenuItem>
                                      <MenuItem
                                        onClick={() =>
                                          handleDeleteCard(post.id)
                                        }
                                      >
                                        <FaTrash
                                          color="red"
                                          style={{ marginRight: "0.5em" }}
                                        />{" "}
                                        Delete
                                      </MenuItem>
                                    </MenuList>
                                  </Menu>
                                </Flex>
                              </Flex>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                              {post.image && (
                                <Image
                                  src={post.image}
                                  alt="Post"
                                  marginBottom={"10px"}
                                />
                              )}
                              <Text fontSize={"18px"}>{post.description}</Text>
                            </CardBody>
                            <CardFooter></CardFooter>
                          </Card>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Subject</FormLabel>
              <Input
                placeholder="Enter subject..."
                value={subject}
                onChange={handleSubjectChange}
              />
            </FormControl>
            <Flex mt={4}>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <Input type="file" onChange={handleImageChange} />
              </FormControl>
              {previewImage && (
                <Box ml={4}>
                  <FormLabel>Preview</FormLabel>
                  <Image src={previewImage} alt="Preview" maxH={200} />
                </Box>
              )}
            </Flex>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Enter description..."
                value={description}
                onChange={handleDescriptionChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreatePost}>
              Create
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Board;
