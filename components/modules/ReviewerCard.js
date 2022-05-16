import Image from "next/image";
import {
  Box,
  Text,
  Stack,
  Avatar,
  Divider
} from "@chakra-ui/react";
import {
  updateDoc,
  onSnapshot,
  doc
} from "@firebase/firestore";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db, storage } from "../../app/firebaseApp";

function ReviewerCard({ id, reviewer, reviewerPage }) {
  const router = useRouter();
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
              <Image
                src="/card-preview.svg"
                layout="fixed"
                alt=""
                width={100}
                height={85}
              />
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
            <Stack direction={'row'} mt={"1"}>
              <Text color={"gray.500"} align={"left"} fontSize={"xs"}>
                {reviewer?.course}
              </Text>
              <Text color={"gray.600"} align={"left"} fontWeight={500} fontSize={"xs"}>
                {reviewer?.curriculum}
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
