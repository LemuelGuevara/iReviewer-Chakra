import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession, getProviders, getSession } from "next-auth/react";
import { onSnapshot } from "firebase/firestore";
import { db } from "../../app/firebaseApp";
import {
  MdOutlineCloudDownload,
  MdDelete,
} from "react-icons/md";
import {
  Flex,
  Stack,
  Button,
  Icon,
} from "@chakra-ui/react";
import { addDoc, collection, doc, deleteDoc } from "@firebase/firestore";
import { deleteObject, ref, getStorage } from "firebase/storage";
import { pdfRef } from "../modules/UploadModal"

function DeleteDownload({ title }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [reviewers, setReviewers] = useState([]);

  // Get firebase storage
  const storage = getStorage()
  const pdfRef = ref(storage, `reviewers/${id}/${title}.pdf`)

  useEffect(
    () =>
      onSnapshot(doc(db, "reviewers", id), (snapshot) => {
        setReviewers(snapshot.data());
      }),
    [id]
  );

  // Delete firebase file

  const deleteFile = async () => {
    deleteDoc(doc(db, "reviewers", id))
    deleteObject(pdfRef)
  }

  return (
    <div>
      <Flex alignItems={"center"}>
        {session?.user?.uid === reviewers?.id ? (
          <div>
            <Stack direction={"row"} p={4}>
              <Button
                variant={"secondary-md"}
                size={"sm"}
                px={3}
                fontWeight={600}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFile()
                  router.push("/");
                }}
              >
                <Icon as={MdDelete} fontSize="lg" />
              </Button>
              <a
                target="_blank"
                href={reviewers?.pdf}
                rel="noopener noreferrer"
              >
                <Button
                  variant={"primary-md"}
                  size={"sm"}
                  px={3}
                  fontWeight={600}
                  leftIcon={<MdOutlineCloudDownload />}
                >
                  Download
                </Button>
              </a>
            </Stack>
          </div>
        ) : (
          <div>
            <a target="_blank" href={reviewers?.pdf} rel="noopener noreferrer">
              <Button
                variant={"primary-md"}
                size={"sm"}
                px={3}
                // display={{ base: "none", md: "flex" }}
                fontWeight={600}
                leftIcon={<MdOutlineCloudDownload />}
              >
                Download
              </Button>
            </a>
          </div>
        )}
      </Flex>
    </div>
  );
}

export default DeleteDownload;
