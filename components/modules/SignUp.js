import {
  Container,
  Stack,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  useColorModeValue,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function SignUp({ providers }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Container maxW={"7xl"}>
        {Object.values(providers).map((provider) => (
          <>
            <Stack
              align={"center"}
              spacing={{ base: 8, md: 10 }}
              py={{ base: 20, md: 28 }}
              direction={{ base: "column", md: "row" }}
            >
              <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
                >
                  <Text
                    as={"span"}
                    position={"relative"}
                    _after={{
                      content: "''",
                      width: "full",
                      height: "30%",
                      position: "absolute",
                      bottom: 1,
                      left: 0,
                      bg: "#00B0FF",
                      zIndex: -1,
                    }}
                  >
                    Upload once,
                  </Text>
                  <br />
                  <Text as={"span"} color="#00B0FF">
                    full access to reviewers!
                  </Text>
                </Heading>
                <Text color={"gray.500"}>
                  iReviewer is a platform where students can freely share their
                  reviewers online with ease. Download and upload through the
                  cloud.
                </Text>
                <Stack
                  spacing={{ base: 4, sm: 6 }}
                  direction={{ base: "column", sm: "row" }}
                >
                  <div key={provider.name}>
                    <Button variant={"primary-md"} px={5} onClick={onOpen}>
                      Sign Up
                    </Button>
                    <Modal
                      isOpen={isOpen}
                      onClose={onClose}
                      size={"xs"}
                      isCentered
                    >
                      <ModalOverlay />
                      <ModalContent alignItems={"center"}>
                        <ModalHeader>Sigin In</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody alignItems={"center"}>
                          <Button
                            leftIcon={<FcGoogle />}
                            variant={"primary-md"}
                            px={10}
                            onClick={() =>
                              signIn(provider.id, { callbackUrl: "/home" })
                            }
                          >
                            <Text fontWeight={600}>
                              Signin with {provider.name}
                            </Text>
                          </Button>
                        </ModalBody>
                        <ModalFooter>
                          <Stack direction={"row"} spacing={2}>
                            <Button variant={"secondary-md"} onClick={onClose}>
                              Cancel
                            </Button>
                          </Stack>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </div>
                </Stack>
              </Stack>
              <Flex
                flex={1}
                justify={"center"}
                align={"center"}
                position={"relative"}
                w={"full"}
              >
                <Blob
                  w={"150%"}
                  h={"150%"}
                  position={"absolute"}
                  top={"-20%"}
                  left={0}
                  zIndex={-1}
                  // color={useColorModeValue("red.50", "red.400")}
                />
                <Image
                  alt={"Hero Image"}
                  fit={"cover"}
                  align={"center"}
                  w={"100%"}
                  h={"100%"}
                  src={"/HeroLogo.svg"}
                />
              </Flex>
            </Stack>
          </>
        ))}
      </Container>
    </>
  );
}

export const Blob = (props) => {
  return (
    <Icon
      width={"100%"}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="#E1F6FF"
      />
    </Icon>
  );
};
