import Image from "next/image";
import {
  Box,
  Text,
  Stack,
  Avatar,
  useDisclosure,
  IconButton,
  Flex,
  CloseButton,
  Button,
  VisuallyHidden,
  Hide,
} from "@chakra-ui/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  onSnapshot,
  deleteDoc,
} from "@firebase/firestore";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db, storage } from "../../app/firebaseApp";

function ReviewerCard({ id, reviewer, reviewerPage }) {
  const router = useRouter();
  const [reviewers, setReviewers] = useState([]);
  const { data: session } = useSession();

  useEffect(
    () =>
      onSnapshot(doc(db, "reviewers", id), (snapshot) => {
        setReviewers(snapshot.data());
      }),
    [db]
  );

  return (
    <div>
      {!reviewerPage && (
        <div>
          <Box
            flexShrink={1}
            as="button"
            onClick={() => router.push(`/${id}`)}
            // maxW={{ sm: 350, md: 290 }}
            maxH={"600px"}
            w={"full"}
            boxShadow={"xl"}
            rounded={"xl"}
            p={6}
            overflow={"hidden"}
          >
            <Box
              h={"140px"}
              bg={"gray.100"}
              mt={-6}
              mx={-6}
              mb={4}
              pos={"relative"}
            >
              {/* <IconButton icon={<MdDelete />} size="sm" /> */}
              {session?.user?.uid === reviewer?.id ? (
                <div>
                  <Flex alignItems="items-center" justify={"right"}>
                    <CloseButton
                      color="gray"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteDoc(doc(db, "reviewers", id));
                        router.push("/");
                      }}
                    />
                  </Flex>
                </div>
              ) : (
                <div>
                  <Flex alignItems="items-center" justify={"right"}>
                    <Hide>
                    <CloseButton/>
                    </Hide>
                  </Flex>
                </div>
              )}
              <Image
                src="/card-preview.svg"
                layout="fixed"
                alt=""
                width={100}
                height={85}
              />
              {/* <img src={reviewer?.pdf} layout={"fill"} alt=""/> */}
            </Box>
            <Text
              color={"black"}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"sm"}
              letterSpacing={1.1}
              align={"left"}
              noOfLines={1}
            >
              {reviewer?.title}
            </Text>
            <Stack mt={"1"}>
              <Text color={"gray.500"} align={"left"} fontSize={"xs"}>
                {reviewer?.course}
              </Text>
            </Stack>
            <Stack mt={3} direction={"row"} spacing={2} align={"center"}>
              <Avatar size={"xs"} src={reviewer?.userImg} />
              <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                <Text fontWeight={600} textTransform="capitalize" noOfLines={1}>
                  {reviewer?.username}
                </Text>
              </Stack>
            </Stack>
          </Box>
        </div>
      )}
    </div>
  );
}

export default ReviewerCard;
