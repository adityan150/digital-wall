import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Navbar from "../navbar/Navbar";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  BsThreeDotsVertical,
  BsBookmarkFill,
  BsBookmark,
} from "react-icons/bs";

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarks");
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }
  }, []);

  return (
    <>
      <Navbar title={"My Bookmarks"} />
      <Divider color={"black"} />
      <Box
        backgroundColor={"rgba(235, 252, 255, 1)"}
        width={"1644px"}
        minHeight="100vh"
      >
        <Flex justify="flex-start" align="flex-start" flexWrap="wrap">
          {bookmarks.map((post, index) => (
            <Card key={index} maxW="md" width={"275px"} height={"600px"} m={4}>
              <CardHeader>
                <Flex justify="space-between" alignItems="center">
                  <Flex gap="4" alignItems="center" flexWrap="wrap">
                    <Box>
                      <Heading fontSize={"30px"} fontWeight={"bold"}>
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
                        post.isBookmarked ? <BsBookmarkFill /> : <BsBookmark />
                      }
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
                        <MenuItem>
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
                  <Image src={post.image} alt="Post" marginBottom={"10px"} />
                )}
                <Text fontSize={"18px"}>{post.description}</Text>
              </CardBody>
              <CardFooter></CardFooter>
            </Card>
          ))}
        </Flex>
      </Box>
    </>
  );
};

export default Bookmark;
