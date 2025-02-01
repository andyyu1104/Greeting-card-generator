import { Button, Box, Image } from "@chakra-ui/react";
import { IoStar } from "react-icons/io5";
import background from "../assets/background/0.png";

const Welcome = () => {
  return (
    <Box height={"100vh"}>
      <Button
        fontSize={["2xl", "3xl", "4xl", "5xl"]}
        height="fit-content"
        width="fit-content"
        padding={"10px"}
        border="2px"
        mx={"auto"}
        display={"flex"}
        alignItems={"center"}
        borderColor="#b20838"
        rightIcon={<IoStar />}
        position={"absolute"}
        top={"60%"}
        left={"50%"}
        transform={"translate(-50%, -50%)"}
        color={"#b20838"}
        _hover={{
          bg: "#f6a0a6",
          color: "white",
        }}
      >
        Get started
      </Button>
      <Image
        src={background}
        alt="Greeting Card Generator"
        width={"100%"}
        height={"100%"}
      />
    </Box>
  );
};

export default Welcome;
