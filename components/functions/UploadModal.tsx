import React, { Children, ReactNode } from "react";
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
import UploadDropzone from "../elements/UploadDropzone";

const infos = ["Title", "Course", "Year Level"];

const ReviewerUpload = ({ children }: { children: ReactNode }) => (
  <FormControl isRequired>
    <FormLabel htmlFor="">{children}</FormLabel>
    <Input id="title" _placeholder={children} />
  </FormControl>
);

function UploadModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} variant={"primary-sm"}>
        Upload
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reviewer Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {infos.map((info) => (
              <ReviewerUpload key={info}>{info}</ReviewerUpload>
            ))}
            <Stack mt={5}>
              <UploadDropzone />
            </Stack>
          </ModalBody>
          <Center>
            <ModalFooter>
              <Button variant={"primary-md"} mr={3} onClick={onClose}>
                Upload
              </Button>
            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UploadModal;
