import { Button, Box, Image, VStack, Text } from "@chakra-ui/react";
import { IoStar } from "react-icons/io5";
import logo from "../assets/logo/0.png";
import GCGText from "../assets/logo/1.png";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <Box height={"100vh"} backgroundColor={"#ff5757"}>
      <VStack>
        <Image
          src={logo}
          alt="Kirby"
          objectFit={"contain"}
          width="50vw"
          height="25vh"
        />

        <Image
          src={GCGText}
          alt="Greeting Card Generator"
          objectFit={"contain"}
          width="50vw"
          height="25vh"
        />
        <Link to={"/create"}>
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
            color={"#b20838"}
            _hover={{
              bg: "#f6a0a6",
              color: "white",
            }}
          >
            Get started
          </Button>
        </Link>
      </VStack>

      <Text
        fontSize="3xl"
        color={"black"}
        as={"em"}
        position={"fixed"}
        bottom={"10px"}
      >
        @andymantikyu
      </Text>
    </Box>
  );
};

export default Welcome;
