import React, { Children, ReactNode, useState, useRef } from "react";
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
  Select
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
import SizeAlert from "../elements/SizeAlert";

export default function UploadModal() {
  // States
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const { data: session } = useSession();
  const filePickerRef = useRef(null);

  // Arrays
  const programs = ["STEM", "ABM", "HUMMS"];

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
      strand: value,
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
    console.log(pdfRef);
  };

  // Clear Form

  const clearInput = async () => {
    if (!setTitle) return;
    setTitle("");
    setCourse("");
    setSelectedFile(null);
    setShowAlert(false);
    document.getElementById("file").value = null;
  };

  // Add PDF file
  const addPDF = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    // File Size validation

    if (e.target.files[0].size > 10e6) {
      setShowAlert(true);
      return false;
    }
    if (e.target.files[0].size < 10e6) {
      setShowAlert(false);

      reader.onload = (readerEvent) => {
        setSelectedFile(readerEvent.target.result);
      };
    }
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
              <Stack direction={"column"} spacing={4}>
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

                <Stack>
                  <FormLabel htmlFor="strand">Strand</FormLabel>
                  <Select placeholder="Select Strand" value={value} onChange={(e) => setValue(e.target.value)}>
                    {programs.map((program) => (
                      <option
                        key={program}
                        value={program}
                        defaultValue={programs[0].value}
                      >
                        {program}
                      </option>
                    ))}
                  </Select>
                </Stack>
              </Stack>
            </FormControl>
            <Stack mt={5}>
              {!loading && (
                // <UploadDropzone setSelectedFile={setSelectedFile} />
                <div>
                  <Stack direction={"column"}>
                    {showAlert && <SizeAlert />}
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
