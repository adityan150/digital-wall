import {
  Box,
  Text,
  Card,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
} from "@chakra-ui/react";
import { FaEdit, FaTrash, FaEllipsisV } from "react-icons/fa";

function BoardCard({
  board,
  openBoardId,
  setOpenBoardId,
  handleNavigation,
  handleMenuToggle,
  handleEditBoard,
  handleDeleteBoard,
}) {
  return (
    <Card
      onClick={(event) => handleNavigation(board.id)}
      direction={{ base: "column", sm: "row" }}
      variant="outline"
      w="400px"
      h="80px"
      align="center"
      justify="space-between"
    >
      <Flex justify="space-between" align="center" gap="20px">
        <Box backgroundColor={board.color} w="80px" h="80px"></Box>
        <Text fontSize="14px" display="flex" align="center">
          {board.title}
        </Text>
      </Flex>
      <Box
        onClick={(event) => {
          event.stopPropagation();
          handleMenuToggle(board.id);
        }}
        cursor="pointer"
        w="10%"
      >
        <FaEllipsisV />
      </Box>
      {openBoardId === board.id && (
        <Menu
          isOpen={true}
          onClose={() => setOpenBoardId(null)}
          placement="right"
          style={{
            position: "absolute",
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
            onClick={() => handleMenuToggle(board.id)}
          ></MenuButton>
          <MenuList>
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleEditBoard(board.id);
              }}
            >
              <FaEdit color="grey" style={{ marginRight: "0.5em" }} /> Edit
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteBoard(board.id);
              }}
            >
              <FaTrash color="red" style={{ marginRight: "0.5em" }} /> Delete
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Card>
  );
}

export default BoardCard;
