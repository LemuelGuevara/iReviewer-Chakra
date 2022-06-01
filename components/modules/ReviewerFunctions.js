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
import { MdOutlineCloudDownload, MdDelete } from "react-icons/md";
import { Flex, Stack, Button, Icon, Text } from "@chakra-ui/react";
import { deleteObject, ref, getStorage } from "firebase/storage";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import LikeButton from "./LikeButton";

// Download button
const DownloadButton = () => {
  <Button
    variant={"primary-md"}
    size={"sm"}
    px={3}
    fontWeight={600}
    leftIcon={<MdOutlineCloudDownload />}
    // onClick={() => download(reviewers?.pdf, title)}
  >
    Download
  </Button>;
};

function ReviewerFunctions({ title }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  // States
  const [reviewers, setReviewers] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);

  // Get firebase storage
  const storage = getStorage();
  const pdfRef = ref(storage, `reviewers/${id}/${title}.pdf`);

  // UseEffects
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

  // Download firebase file
  const download = (url, name) => {
    if (!url) {
      throw new Error("Resource URL not provided! You need to provide one");
    }
    setFetching(true);
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        setFetching(false);
        const blobURL = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobURL;
        a.style = "display: none";

        if (name && name.length) a.download = name;
        document.body.appendChild(a);
        a.click();
      })
      .catch(() => setError(true));
  };

  // Delete firebase file
  const deleteFile = async () => {
    deleteDoc(doc(db, "reviewers", id));
    deleteObject(pdfRef);
  };

  return (
    <div>
      <Flex alignItems={"center"}>
        {session?.user?.uid === reviewers?.id ? (
          <div>
            {/* If reviewer is owned by uid */}
            <Stack direction={"row"} p={4}>
              <Button
                variant={"secondary-md"}
                size={"sm"}
                px={3}
                fontWeight={600}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFile();
                  router.push("/");
                }}
              >
                <Icon as={MdDelete} fontSize="lg" />
              </Button>
              <Button
                variant={"primary-md"}
                size={"sm"}
                px={3}
                fontWeight={600}
                leftIcon={<MdOutlineCloudDownload />}
                onClick={() => download(reviewers?.pdf, title)}
              >
                Download
              </Button>
              <LikeButton />
            </Stack>
          </div>
        ) : (
          <div>
            {/* If reviewer is not owned by uid */}
            <Stack direction={"row"} p={4}>
              <Button
                variant={"primary-md"}
                size={"sm"}
                px={3}
                fontWeight={600}
                leftIcon={<MdOutlineCloudDownload />}
                onClick={() => download(reviewers?.pdf, title)}
              >
                Download
              </Button>
              <LikeButton />
            </Stack>
          </div>
        )}
      </Flex>
    </div>
  );
}

export default ReviewerFunctions;
