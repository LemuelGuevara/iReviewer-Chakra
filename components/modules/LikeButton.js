import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  onSnapshot,
  collection,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../app/firebaseApp";
import { Flex, Stack, Button, Icon, Text } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function LikeButton() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  // States
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [reviewers, setReviewers] = useState([]);

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

  // Like reviewer        
  const likeReviewer = async () => {
    if (liked) {
      await deleteDoc(doc(db, "reviewers", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "reviewers", id, "likes", session.user.uid), {
        username: session.user.uid,
      });
    }
  };

  return (
    <div>
      <Flex alignItems={"center"}>
        {liked ? (
          <Button
            variant={"outline"}
            color={"brand.400"}
            h="10"
            borderColor={"brand.400"}
            size={"sm"}
            px={3}
            fontWeight={600}
            leftIcon={<AiFillHeart />}
            onClick={() => likeReviewer()}
          >
            {likes.length > 0 && <Text>{likes.length}</Text>}
          </Button>
        ) : (
          <Button
            variant={"primary-md"}
            size={"sm"}
            px={3}
            fontWeight={600}
            leftIcon={<AiFillHeart />}
            onClick={() => likeReviewer()}
          >
            Like
          </Button>
        )}
      </Flex>
    </div>
  );
}

export default LikeButton;
