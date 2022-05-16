import React, { Children, ReactNode, useState, useRef } from "react";
import Image from "next/image";
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
  Stack,
  Center,
  useDisclosure,
  Progress,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { db, storage } from "../../app/firebaseApp";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useSession } from "next-auth/react";
export default function UploadModal() {
  // States
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(null);
  const { data: session } = useSession();
  const filePickerRef = useRef(null);

  // Firebase
  const uploadReviewer = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "reviewers"), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      title: title,
      course: course,
      timestamp: serverTimestamp(),
    });

    const pdfRef = ref(storage, `reviewers/${docRef.id}/${title}.pdf`);

    if (selectedFile) {
      await uploadString(pdfRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(pdfRef);
        await updateDoc(doc(db, "reviewers", docRef.id), {
          pdf: downloadURL,
        });
      });
    }

    setLoading(false);
    setTitle("");
    setSelectedFile(null);
    setCourse("");
  };

  const clearInput = async () => {
    if (!setTitle) return;
    setTitle("");
    setCourse("");
    setSelectedFile(null);
    document.getElementById("file").value = null;
  };

  const addPDF = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  // UploadForm
  return (
    <>
      {/* Nav Upload Button */}
      <Button onClick={onOpen} variant={"primary-sm"}>
        Upload
      </Button>
      {/* Form Control */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reviewer Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                name="Title"
                type="text"
                value={title}
                placeholder="Name of the reviewer"
                onChange={(e) => setTitle(e.target.value)}
              />
              <FormLabel htmlFor="course">Course</FormLabel>
              <Input
                name="Course"
                type="text"
                value={course}
                placeholder="Name of the course or subject"
                onChange={(e) => setCourse(e.target.value)}
              />
            </FormControl>
            <Stack mt={5}>
              {!loading && (
                // <UploadDropzone setSelectedFile={setSelectedFile} />
                <div>
                  <Stack direction={"column"}>
                    <Text as={"i"} color="gray.500" fontSize={"sm"}>
                      Max size of 10mb only
                    </Text>
                    <input
                      type="file"
                      ref={filePickerRef}
                      onChange={addPDF}
                      disabled={!title && !course}
                      id={"file"}
                      accept=".pdf"
                      // filter={filterBySize}
                    />
                  </Stack>
                </div>
              )}
              {loading && <Progress size="xs" isIndeterminate />}
            </Stack>
          </ModalBody>
          {/* Submit */}
          <Center>
            <ModalFooter>
              <Button
                variant={"primary-md"}
                mr={3}
                onClick={uploadReviewer}
                isDisabled={!title}
              >
                Upload
              </Button>
              <Button variant={"secondary-md"} onClick={clearInput}>
                Clear
              </Button>
            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
}
