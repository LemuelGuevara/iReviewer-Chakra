import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession, getProviders, getSession } from "next-auth/react";
import { onSnapshot } from "firebase/firestore";
import { db } from "../../app/firebaseApp";
import { MdOutlineCloudDownload, MdDelete } from "react-icons/md";
import { Flex, Stack, Button, Icon } from "@chakra-ui/react";
import { doc, deleteDoc } from "@firebase/firestore";
import { deleteObject, ref, getStorage } from "firebase/storage";

function DeleteDownload({ title }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  // States
  const [reviewers, setReviewers] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);


  // Get firebase storage
  const storage = getStorage();
  const pdfRef = ref(storage, `reviewers/${id}/${title}.pdf`);

  useEffect(
    () =>
      onSnapshot(doc(db, "reviewers", id), (snapshot) => {
        setReviewers(snapshot.data());
      }),
    [id]
  );

  // Download firebase file
  const download = (url, name) => {
    if (!url) {
      throw new Error("Resource URL not provided! You need to provide one");
    }
    setFetching(true);
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
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
                  onClick={()=> download(reviewers?.pdf, title)}
                >
                  Download
                </Button>
            </Stack>
          </div>
        ) : (
          <div>
              <Button
                variant={"primary-md"}
                size={"sm"}
                px={3}
                // display={{ base: "none", md: "flex" }}
                fontWeight={600}
                leftIcon={<MdOutlineCloudDownload />}
                onClick={()=> download(reviewers?.pdf, title)}
              >
                Download
              </Button>
          </div>
        )}
      </Flex>
    </div>
  );
}

export default DeleteDownload;
