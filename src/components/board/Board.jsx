import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Icon from "../../assets/digital-wall.svg";
import { IoIosArrowBack } from "react-icons/io";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
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
import { SearchIcon, AddIcon } from "@chakra-ui/icons";
import NoPostMobile from "../../assets/NoPostMobile.png";
import { BsBookmarkFill } from "react-icons/bs";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import PostCard from "../postCard/PostCard";

const Board = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [subject, setSubject] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [board, setBoard] = useState({});
  const [posts, setPosts] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editPostId, setEditPostId] = useState(null);

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

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, posts]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

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
  }, [id, navigate]);

  const handleClickBookmark = (id) => {
    const bookmarks = localStorage.getItem("bookmarks");
    const parsedBookmarks = bookmarks ? JSON.parse(bookmarks) : [];
    const isBookmarked = parsedBookmarks.find((postId) => postId === id);
    // if the post is already bookmarked, remove it from bookmarks
    if (isBookmarked) {
      const updatedBookmarks = parsedBookmarks.filter(
        (postId) => postId !== id
      );
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      const updatedPosts = posts.map((post) => {
        if (post.id === id) {
          return { ...post, isBookmarked: false };
        }
        return post;
      });
      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    }
    // if the post is not bookmarked, add it to bookmarks
    if (!isBookmarked) {
      parsedBookmarks.push(id);
      localStorage.setItem("bookmarks", JSON.stringify(parsedBookmarks));
      const updatedPosts = posts.map((post) => {
        if (post.id === id) {
          return { ...post, isBookmarked: true };
        }
        return post;
      });
      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    }
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCreatePost = () => {
    onOpen();
    setSubject((prev) => prev.trim());
    if (subject === "") return;
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;

    const newPost = {
      id: Math.random().toString(36).substr(2, 9),
      boardId: board.id,
      subject: subject,
      image: image,
      description: description,
      isBookmarked: false,
      likes: 0,
      createdAt: currentDate,
      updatedAt: currentDate,
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

    // remove the deleted post from bookmarks if it is bookmarked
    const bookmarks = localStorage.getItem("bookmarks");
    const parsedBookmarks = bookmarks ? JSON.parse(bookmarks) : [];
    const updatedBookmarks = parsedBookmarks.filter((postId) => postId !== id);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  const handleEditCard = (id) => {
    setIsEditing(true);
    setEditPostId(id);
    const postToEdit = posts.find((post) => post.id === id);
    setSubject(postToEdit.subject);
    setImage(postToEdit.image);
    setDescription(postToEdit.description);
    onOpen();
  };

  const handleUpdateCard = () => {
    setSubject((prev) => prev.trim());
    if (subject === "") return;
    const oldPost = posts.find((post) => post.id === editPostId);
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;

    const newPost = {
      id: oldPost.id,
      boardId: board.id,
      subject: subject,
      image: image,
      description: description,
      isBookmarked: oldPost.isBookmarked,
      likes: oldPost.likes,
      createdAt: oldPost.createdAt,
      updatedAt: currentDate,
    };

    let updatedPosts = posts.filter((post) => post.id !== editPostId);
    updatedPosts = [...updatedPosts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setSubject("");
    setImage(null);
    setDescription("");
    onClose();
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
        <Flex
          justify="space-between"
          align="center"
          h="80px"
          padding="20px 50px"
        >
          <Flex justify="space-between" align="center" gap="10px">
            <Box color="gray" onClick={() => navigate("/")}>
              <IoIosArrowBack size={30} />
            </Box>
            <Flex>
              <img
                src={Icon}
                alt="Logo"
                style={{ width: "50px", height: "40px" }}
              />
              <Text fontSize="25px" fontWeight="bold" color="slategray">
                {board.title}
              </Text>
            </Flex>
          </Flex>
          <Flex justify="space-between" align="center" gap="30px">
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
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </InputGroup>
            </Box>

            <Divider
              orientation="vertical"
              h={8}
              borderColor="gray"
              borderWidth={1}
            />

            <Box color="gray" onClick={() => navigate("/bookmarks")}>
              <BsBookmarkFill style={{ fontSize: "1.5rem" }} />
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Divider borderColor="gray.300" />
      <Box display="flex" alignItems="center" backgroundColor="#A7F0F9">
        <Button
          ml={"auto"}
          h={50}
          w={300}
          mt={5}
          mr={10}
          leftIcon={<AddIcon />}
          colorScheme="red"
          variant="solid"
          onClick={onOpen}
        >
          Create new Post
        </Button>
      </Box>
      <Box backgroundColor="#A7F0F9" w="100%" minH="90vh">
        {!posts || posts.length === 0 ? (
          <Flex
            height="100%"
            direction="column"
            align="center"
            justify="center"
          >
            <img
              src={NoPostMobile}
              alt="Logo"
              style={{
                width: "200px",
                height: "200px",
              }}
            />
            <Text fontSize="20px" fontWeight="bold">
              Nothing here yet
            </Text>
            <Text fontSize="15px" fontWeight="light">
              Create your first post by clicking on the '+' button above
            </Text>
          </Flex>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="posts" direction="horizontal">
              {(provided) => (
                <div
                  style={{
                    width: "100%",
                    maxWidth: "1400px",
                    margin: "auto",
                    padding: "50px 0",
                    display: "flex",
                    gap: "60px",
                    flexWrap: "wrap",
                  }}
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
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <PostCard
                            post={post}
                            handleClickBookmark={handleClickBookmark}
                            handleEditCard={handleEditCard}
                            handleDeleteCard={handleDeleteCard}
                          />
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
            {isEditing ? (
              <Button colorScheme="blue" mr={3} onClick={handleUpdateCard}>
                Update
              </Button>
            ) : (
              <Button colorScheme="blue" mr={3} onClick={handleCreatePost}>
                Create
              </Button>
            )}
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
