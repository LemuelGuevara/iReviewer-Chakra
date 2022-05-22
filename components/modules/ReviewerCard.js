import Image from "next/image";
import {
  Box,
  Text,
  Stack,
  Avatar,
  Divider,
  Flex,
  HStack,
} from "@chakra-ui/react";
import {
  updateDoc,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  addDoc,
  collection
} from "@firebase/firestore";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db, storage } from "../../app/firebaseApp";
import { AiFillHeart, AiFillEye, AiOutlineHeart } from "react-icons/ai";

function ReviewerCard({ id, reviewer, reviewerPage }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [reviewers, setReviewers] = useState([]);
  const [likes, setLikes] = useState([]);

  const [liked, setLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(doc(db, "reviewers", id), (snapshot) => {
        setReviewers(snapshot.data());
      }),
    [id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "reviewers", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [id]
  );      

  useEffect(
    () =>
      setLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes, session?.user?.uid]
  );

  const likeReviewer = async () => {
    if (liked) {
      await deleteDoc(doc(db, "reviewers", id, "likes", session.user.uid))
    } else {
      await setDoc(doc(db, "reviewers", id, "likes", session.user.uid), {
        username: session.user.uid
      })
    }
  }

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
              overflow="hidden"
              pos={"relative"}
            >
              <Image
                src="/card-preview.svg"
                layout="fixed"
                alt=""
                width={100}
                height={120}
              />
            </Box>

            {/* Footer */}
            <Box>
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
              <Stack direction={"row"}>
                <Text
                  color={"gray.500"}
                  align={"left"}
                  fontSize={"xs"}
                  noOfLines={1}
                  mt={2}
                >
                  {reviewer?.course}
                </Text>
              </Stack>

              <Flex justifyContent={"space-between"} alignItems="center" mt={3}>
                <Stack direction={"row"} alignItems="center" textAlign={"left"}>
                  <Avatar size={"xs"} src={reviewer?.userImg} />
                  <Text fontWeight={600} noOfLines={1} fontSize="xs">
                    {reviewer?.username}
                  </Text>
                </Stack>

                <Stack
                  direction={"row"}
                  alignItems="center"
                  fontSize={"xs"}
                  spacing={1}
                  onClick={(e) => {
                    e.stopPropagation();
                    likeReviewer();
                  }}
                  _groupHover={{
                    color: "red",
                  }}
                >
                  {liked ? (
                    <AiFillHeart color="#00B0FF" _groupHover={{color: "red"}} />
                  ) : (
                    <AiFillHeart color="gray" />
                  )}
                  {likes.length > 0 && <Text>{likes.length}</Text>}
                </Stack>
              </Flex>
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
}

export default ReviewerCard;
