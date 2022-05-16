import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession, getProviders, getSession } from "next-auth/react";
import { onSnapshot } from "firebase/firestore";
import { db } from "../../app/firebaseApp";
import {
  MdOutlineCloudDownload,
  MdDelete,
  MdArrowBackIosNew,
} from "react-icons/md";
import {
  Box,
  Text,
  Flex,
  Stack,
  Avatar,
  Button,
  Icon,
} from "@chakra-ui/react";
import { addDoc, collection, doc } from "@firebase/firestore";

function DeleteDownload() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [reviewers, setReviewers] = useState([]);

  useEffect(
    () =>
      onSnapshot(doc(db, "reviewers", id), (snapshot) => {
        setReviewers(snapshot.data());
      }),
    [id]
  );

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
                // display={{ base: "none", md: "flex" }}
                fontWeight={600}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteDoc(doc(db, "reviewers", id));
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
                //   display={{ base: "none", md: "flex" }}
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
