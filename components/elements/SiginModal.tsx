import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";

// Firebase related
import { useAuthState } from "react-firebase-hooks/auth";
import signinAuth from "../functions/SiginAuth";
// import Loading from "../elements/Loading";

export default function SiginModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const router = useRouter();

  // if (loading) return <Loading />;
  // else if (error) return console.log("error");
  // else if (user) {
  //   // user is already logged in, redirect to home page
  //   router.push("/");
  // }

  // const uiConfig = {
  //   // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  //   signInSuccessUrl: "/",
  //   // We will display GitHub as auth providers.
  //   signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  // };

  return (
    <>
      <Button variant={"primary-md"} px={5} onClick={onOpen}>
        Sigin In
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"xs"} isCentered>
        <ModalOverlay />
        <ModalContent alignItems={"center"}>
          <ModalHeader>Sigin In</ModalHeader>
          <ModalCloseButton />
          <ModalBody alignItems={"center"}>
            {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> */}
            <Button
              leftIcon={<FcGoogle />}
              variant={"primary-md"}
              px={10}
              onClick={() => signinAuth()}
            >
              <Text fontWeight={600}>Sign in with Google</Text>
            </Button>
          </ModalBody>
          <ModalFooter>
            <Stack direction={"row"} spacing={2}>
              <Button
                onClick={onClose}
                rounded={"xl"}
                size={"md"}
                fontSize={"sm"}
                fontWeight={"medium"}
                px={4}
                colorScheme={"red"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{ bg: "red.400" }}
              >
                Cancel
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
