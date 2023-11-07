import { Box, Heading, Button, Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { moveToPending, moveToSolved, moveToFailed } from "../../Redux/keyIndicatorsAction";

const Cases = () => {
  const dispatch = useDispatch();
  const activeCases = useSelector((state) => state.keyIndicators[1].value); 
  const successfulCases = useSelector((state) => state.keyIndicators[0].value); 
  const failedCases = useSelector((state) => state.keyIndicators[2].value); 

  const handleMoveToPending = () => {
    dispatch(moveToPending());
  };

  const handleMoveToSolved = () => {
    dispatch(moveToSolved());
  };

  const handleMoveToFailed = () => {
    dispatch(moveToFailed());
  };

  return (
    <Box p={8} textAlign="center" bg="teal.500" color="white">
      <Flex justify="center">
        <Button colorScheme="blue" mr={2} onClick={handleMoveToPending}>
          Move to Pending
        </Button>
        <Button colorScheme="green" mr={2} onClick={handleMoveToSolved}>
          Move to Solved
        </Button>
        <Button colorScheme="red" onClick={handleMoveToFailed}>
          Move to Failed
        </Button>
      </Flex>

      <Heading as="h2" size="lg" mt={4}>
        Active Cases: {activeCases}
      </Heading>
      <Heading as="h2" size="lg">
        Successful Cases: {successfulCases}
      </Heading>
      <Heading as="h2" size="lg">
        Failed Cases: {failedCases}
      </Heading>
    </Box>
  );
};

export default Cases;

