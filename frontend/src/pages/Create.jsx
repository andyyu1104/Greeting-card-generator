import {
  Box,
  Button,
  HStack,
  VStack,
  Image,
  Text,
  IconButton,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";

// import { PiRectangleDashedLight } from "react-icons/pi";

// const BASE_URL = import.meta.env.BASE_URL;
// console.log("BASE_URL", BASE_URL);

// const kirbyURL = new URL(`./assets/kirby/0.png`, import.meta.url).href;
// const kirbyImports = import.meta.glob("../assets/kirby/*.png");

// console.log("imagesURL: ", kirbyURL);
// console.log("kirbyImports: ", kirbyImports);
// console.log("kirby1 in Import: ", kirbyImports["../assets/kirby/0.png"]);

// console.log("kirby1 in Import: ", kirbyImports["../assets/kirby/0.png"]());

// const test = import.meta.glob("../assets/kirby/*.png");

// const imgImports = import.meta.glob("../assets/kirby/*.png");
// const bgImports = import.meta.glob("../assets/background/*.png");
const kirbyImports = import.meta.glob("../assets/kirby/*.png", {
  query: "?url",
  import: "default",
  eager: true,
});
const bgImports = import.meta.glob("../assets/background/*.png", {
  query: "?url",
  import: "default",
  eager: true,
});

// console.log("kirbyImports: ", kirbyImports);
// console.log("bgImports: ", bgImports);

const kirbyChoices = Object.keys(kirbyImports);
const backgroundChoices = Object.keys(bgImports);

const Create = () => {
  let userChoice = 0;
  let navigate = useNavigate();
  let isBGSelected = false;
  // const [userSelections, setUserSelections] = useState([]);
  const userSelections = [];
  //userSelections = [CardBG, FirstKirby, SecondKirby]

  function changeSelection(choice) {
    //change the choices to display
    let currChoices = [];
    let currDisplay = "cardDisplay";
    if (isBGSelected) {
      currChoices = kirbyChoices;
      if (userSelections.length === 2) {
        currDisplay = "kirby2Display";
      } else {
        currDisplay = "kirby1Display";
      }
    } else {
      currChoices = backgroundChoices;
      currDisplay = "cardDisplay";
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

    document.getElementById(currDisplay).src = isBGSelected
      ? kirbyImports[currChoices[userChoice]]
      : bgImports[currChoices[userChoice]];
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
        document.getElementById("kirby2Display").src =
          kirbyImports[kirbyChoices[userChoice]];
        // document.getElementById("kirby1Selection").visibility = "visible";
      } else {
        //selecting kirby1
        document.getElementById("kirby2Display").src =
          kirbyImports[kirbyChoices[0]];
        document.getElementById("kirby1Display").src =
          kirbyImports[kirbyChoices[userChoice]];
        // document.getElementById("kirby2Selection").visibility = "visible";
      }
    } else {
      //back to selecting bg
      document.getElementById("kirby1Display").src =
        kirbyImports[kirbyChoices[0]];
      document.getElementById("cardDisplay").src =
        bgImports[backgroundChoices[userChoice]];
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
                src={kirbyImports[kirbyChoices[0]]}
                alt="Kirby1_Display"
                objectFit={"contain"}
                boxSize={"3em"}
              />
            </Box>

            <Image
              id="cardDisplay"
              alt="Card_Display"
              src={bgImports[backgroundChoices[0]]}
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
                src={kirbyImports[kirbyChoices[0]]}
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
          {/* <Button
            onClick={() => {
              console.log("User Selections:", userSelections);
              console.log("User Choice:", userChoice);
              console.log("KirbyImages:", kirbyChoices);
              console.log("BackgroundImages:", backgroundChoices);
              // document.getElementById("cardDisplay").src =
              //   kirbyImports["../assets/kirby/0.png"];
              // document.getElementById("cardDisplay").src = import(&quot;/Greeting-card-generator/src/assets/kirby/0.png?import&quot;)
            }}
          >
            Test
          </Button> */}
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
        {/* <Image
          id="testDisplay"
          src={kirbyImports[kirbyChoices[3]]}
          alt="test_Display"
          objectFit={"contain"}
          boxSize={"3em"}
        /> */}
      </VStack>
    </Box>
  );
};

export default Create;
