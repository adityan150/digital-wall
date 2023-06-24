import React from "react";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import {
  BsBookmark,
  BsBookmarkFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { FaEdit, FaTrash } from "react-icons/fa";

function PostCard({
  post,
  handleClickBookmark,
  handleEditCard,
  handleDeleteCard,
}) {
  return (
    <Card maxW="md" width={"275px"} height={"600px"}>
      <CardHeader>
        <Flex justify="space-between" alignItems="center">
          <Flex gap="4" alignItems="center" flexWrap="wrap">
            <Box>
              <Heading fontSize={"30px"} fontWeight={"bold"}>
                {post.subject}
              </Heading>
            </Box>
          </Flex>
          <Flex>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="Bookmark"
              icon={post.isBookmarked ? <BsBookmarkFill /> : <BsBookmark />}
              onClick={() =>
                handleClickBookmark ? handleClickBookmark(post.id) : null
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
                <MenuItem
                  onClick={() =>
                    handleEditCard ? handleEditCard(post.id) : null
                  }
                >
                  <FaEdit color="gray" style={{ marginRight: "0.5em" }} /> Edit
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    handleDeleteCard ? handleDeleteCard(post.id) : null
                  }
                >
                  <FaTrash color="red" style={{ marginRight: "0.5em" }} />{" "}
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
      <CardFooter>
        <div style={{ color: "gray" }}>
          <div>{`Created : ${post.createdAt}`}</div>
          <div>{`Updated : ${post.updatedAt}`}</div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default PostCard;
