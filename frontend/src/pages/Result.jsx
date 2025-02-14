import { Box, Text, Image, VStack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
// import mergeImages from "merge-images";

// import kirby from "../assets/kirby/Bard_Kirby.png";
// import logo from "../assets/logo/0.png";

const Result = () => {
  const { state } = useLocation();
  const { bg, kirby1, kirby2 } = state;
  const kirbyChoices = Object.keys(
    import.meta.glob("../assets/kirby/*.png")
  ).map((key) => key.replace("..", "src"));

  const backgroundChoices = Object.keys(
    import.meta.glob("../assets/background/*.png")
  ).map((key) => key.replace("..", "src"));

  alert("Check your wild rift account<3");
  // console.log(`user picks ${bg}, ${kirby1}, ${kirby2}`);

  // console.log(kirbyChoices);

  // console.log(
  //   mergeImages([
  //     { src: `${backgroundChoices[1]}`, x: 0, y: 0 },
  //     { src: `${logo}`, x: 0, y: 10 },
  //   ]).then((b64) => console.log(b64))
  // );

  // let userSelections = [bg, kirby1, kirby2];
  // console.log("The result is ", userSelections);
  return (
    <Box height={"100vh"} backgroundColor={"#ff5757"}>
      <VStack>
        <Text fontSize={["2xl", "3xl", "4xl", "5xl"]} id="title">
          Result
        </Text>
        <Box position={"relative"} maxW={"10em"}>
          <Box position={"absolute"} right={"9px"}>
            {/* <Icon
                      id="kirby1Selection"
                      as={PiRectangleDashedLight}
                      position={"absolute"}
                      right={"2px"}
                      boxSize={"50px"}
                      visibility={"hidden"}
                    /> */}
            <Image
              id="kirby1Display"
              src={kirbyChoices[kirby1]}
              alt="Kirby1_Display"
              objectFit={"contain"}
              boxSize={"3em"}
            />
          </Box>

          <Image
            id="cardDisplay"
            alt="Card_Display"
            src={backgroundChoices[bg]}
            objectFit={"cover"}
            boxSize={"10em"}
          />

          <Box position={"absolute"} left={"9px"} bottom={"9px"}>
            {/* <Icon
                      id="kirby2Selection"
                      as={PiRectangleDashedLight}
                      position={"absolute"}
                      right={"2px"}
                      boxSize={"50px"}
                      visibility={"hidden"}
                    /> */}
            <Image
              id="kirby2Display"
              src={kirbyChoices[kirby2]}
              alt="Kirby2_Display"
              objectFit={"contain"}
              boxSize={"3em"}
            />
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default Result;
