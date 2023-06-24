import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  Button,
  ModalOverlay,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Text,
  RadioGroup,
  HStack,
  Input,
  Circle,
} from "@chakra-ui/react";

function BoardModal({
  boardTitle,
  handleBoardTitleChange,
  selectedColor,
  handleColorChange,
  isModalOpen,
  handleModalClose,
  isEditing,
  handleCreateBoard,
  handleUpdateBoard,
}) {
  const COLORS = ["#A7F0F9", "#C5C5FC", "#FFAEC0", "#FFCC66"];

  return (
    <Modal isOpen={isModalOpen} onClose={handleModalClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight="bold">Add a name for your board</ModalHeader>
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
            <FormLabel marginTop="30px" fontWeight="bold" fontSize="20px">
              Select post colour
            </FormLabel>
            <Text fontSize="16px">Here are some templates to choose from</Text>

            <RadioGroup onChange={handleColorChange} value={selectedColor}>
              <HStack spacing={4} marginTop="30px">
                {COLORS.map((value, index) => {
                  return (
                    <Circle
                      key={index}
                      size="7"
                      bg={value}
                      onClick={() => handleColorChange(value)}
                      border={
                        selectedColor === value ? "1px solid black" : "none"
                      }
                    />
                  );
                })}
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
  );
}

export default BoardModal;
