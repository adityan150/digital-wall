import React, { useState, useEffect } from "react";
import { Box, Divider, Flex } from "@chakra-ui/react";
import Navbar from "../navbar/Navbar";

import PostCard from "../postCard/PostCard";

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const storedBookmarkIds = localStorage.getItem("bookmarks");
    const parsedBookmarkIds = JSON.parse(storedBookmarkIds) || [];
    const posts = localStorage.getItem("posts");
    const parsedPosts = JSON.parse(posts) || [];
    const parsedBookmarks = parsedPosts.filter((post) =>
      parsedBookmarkIds.includes(post.id)
    );

    setBookmarks(parsedBookmarks);
  }, []);

  return (
    <>
      <Navbar title={"My Bookmarks"} />
      <Divider color={"black"} />
      <Box
        backgroundColor="rgba(235, 252, 255, 1)"
        w="100vw"
        minH="100vh"
        padding="50px"
      >
        <Flex
          justify="flex-start"
          align="flex-start"
          flexWrap="wrap"
          gap="50px"
        >
          {bookmarks.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </Flex>
      </Box>
    </>
  );
};

export default Bookmark;
