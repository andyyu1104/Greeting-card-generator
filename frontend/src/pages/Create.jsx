import {
  Box,
  Button,
  HStack,
  VStack,
  Image,
  Text,
  IconButton,
} from "@chakra-ui/react";
import transparent from "../assets/kirby/0.png";

import { useNavigate } from "react-router-dom";

import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";

// import { PiRectangleDashedLight } from "react-icons/pi";

const kirbyChoices = Object.keys(import.meta.glob("../assets/kirby/*.png")).map(
  (key) => key.replace("..", "src")
);
const backgroundChoices = Object.keys(
  import.meta.glob("../assets/background/*.png")
).map((key) => key.replace("..", "src"));

const Create = () => {
  let userChoice = 0;
  let navigate = useNavigate();
  let isBGSelected = false;
  // const [userSelections, setUserSelections] = useState([]);
  const userSelections = [];
  //userSelections = [CardBG, FirstKirby, SecondKirby]
  let currChoices;
  function changeSelection(choice) {
    //change the choices to display
    if (isBGSelected) {
      currChoices = kirbyChoices;
    } else {
      currChoices = backgroundChoices;
    }

    if (choice === "right") {
      userChoice = userChoice + 1;
      if (userChoice > currChoices.length - 1) {
        userChoice = 0;
      }
    } else if (choice === "left") {
      userChoice = userChoice - 1;
      if (userChoice < 0) {
        userChoice = currChoices.length - 1;
      }
    }
    if (isBGSelected) {
      if (userSelections.length === 2) {
        document.getElementById("kirby2Display").src = currChoices[userChoice];
      } else {
        document.getElementById("kirby1Display").src = currChoices[userChoice];
      }
    } else {
      document.getElementById("cardDisplay").src = currChoices[userChoice];
    }
  }

  function back() {
    if (userSelections.length === 0) {
      navigate("/");
    }
    document.querySelectorAll("#selectionBtn").forEach((btn) => {
      btn.disabled = false;
    });

    userChoice = userSelections.pop();
    document.getElementById("nextBtn").textContent = "Next";
    if (userSelections.length > 0) {
      if (userSelections.length > 1) {
        document.getElementById("kirby2Display").src = kirbyChoices[userChoice];
        // document.getElementById("kirby1Selection").visibility = "visible";
      } else {
        //selecting kirby1
        document.getElementById("kirby2Display").src = transparent;
        document.getElementById("kirby1Display").src = kirbyChoices[userChoice];
        // document.getElementById("kirby2Selection").visibility = "visible";
      }
    } else {
      //back to selecting bg
      document.getElementById("kirby1Display").src = transparent;
      document.getElementById("cardDisplay").src =
        backgroundChoices[userChoice];
      document.getElementById("title").textContent = "Pick Your Background";
      isBGSelected = false;
    }
  }

  function next() {
    if (userSelections.length === 3) {
      navigate("/result", {
        state: {
          bg: userSelections[0],
          kirby1: userSelections[1],
          kirby2: userSelections[2],
        },
      });
    }
    // setUserSelections((userSelections) => [...userSelections, userChoice]);
    userSelections.push(userChoice);
    isBGSelected = true;
    userChoice = 0; //reset User choice
    // if (userSelections.length === 0) {
    //   document.getElementById("cardDisplay").src =
    //     kirbyChoices[userChoice];
    //   console.log("bg selected");
    // } else

    if (userSelections.length >= 3) {
      document.getElementById("nextBtn").textContent = "Done";
      document.querySelectorAll("#selectionBtn").forEach((btn) => {
        btn.disabled = true;
      });
      // document.getElementById("kirby2Selection").visibility = "hidden";
    }
    // document.getElementById("kirby1Display").src = kirbyChoices[userChoice];
    document.getElementById("title").textContent = "Pick Your Kirby";
  }

  return (
    <Box height={"100vh"} backgroundColor={"#ff5757"}>
      <VStack>
        <Text fontSize={["2xl", "3xl", "4xl", "5xl"]} id="title">
          Pick Your Background
        </Text>
        <HStack spacing={"5px"}>
          <IconButton
            id="selectionBtn"
            onClick={() => changeSelection("left")}
            isRound={true}
            variant={"unstyled"}
            fontSize={["2xl", "3xl", "4xl", "5xl"]}
            icon={<IoIosArrowDropleftCircle />}
          />

          <Box position={"relative"}>
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
                src={transparent}
                alt="Kirby1_Display"
                objectFit={"contain"}
                boxSize={"3em"}
              />
            </Box>

            <Image
              id="cardDisplay"
              alt="Card_Display"
              src={backgroundChoices[0]}
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
                src={transparent}
                alt="Kirby2_Display"
                objectFit={"contain"}
                boxSize={"3em"}
              />
            </Box>
          </Box>

          <IconButton
            id="selectionBtn"
            onClick={() => changeSelection("right")}
            isRound={true}
            variant={"unstyled"}
            fontSize={["2xl", "3xl", "4xl", "5xl"]}
            icon={<IoIosArrowDroprightCircle />}
          />
        </HStack>

        <HStack>
          <Button onClick={() => back()}>Back</Button>
          <Button onClick={() => next()} id="nextBtn">
            Next
          </Button>
          <Button
            onClick={() => {
              console.log("User Selections:", userSelections);
              console.log("User Choice:", userChoice);
            }}
          >
            Test
          </Button>
          {/* <Button
            onClick={() => {
              console.log("User Selections:", userSelections);
              console.log("Images:", kirbyImages);
              document.getElementById("cardDisplay").src = kirbyImages[3];
            }}
          >
            Done
          </Button> */}
        </HStack>
      </VStack>
    </Box>
  );
};

export default Create;
