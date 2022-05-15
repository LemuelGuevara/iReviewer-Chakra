import React from "react";
import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useSession, getProviders, getSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { onSnapshot } from "firebase/firestore";
import { db } from "../app/firebaseApp";
import { Document, Page, pdfjs } from "react-pdf";
import {
  Box,
  Text,
  Flex,
  Stack,
  Avatar,
  Button,
  IconButton,
  Center,
  Spinner,
  Heading,
  Container,
} from "@chakra-ui/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { IoIosArrowBack } from "react-icons/io";
import SignUp from "../components/modules/SignUp"

function ReviewerPage({ providers }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [reviewers, setReviewers] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

  // useEffect(
  //   () =>
  //     onSnapshot(doc(db, "reviewers", id), (snapshot) => {
  //       setReviewers(snapshot.data());
  //     }),
  //   [db]
  // );

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offSet) {
    setPageNumber((prevPageNumber) => prevPageNumber + offSet);
  }

  if (!session) return <SignUp providers={providers} />;

  return (
    <div className={styles.container}>
      <Head>
        <title>
          {reviewers?.title} by {reviewers?.username}
        </title>
        <meta name="description" content="iReviewer" />
        <link rel="icon" href="/iReviewer-Logo-Small.svg" />
      </Head>
      <>
        <div>
        <Box bg={"white"} mt={6}>
          <IconButton
            colorScheme={"brand"}
            size="md"
            borderRadius={"2xl"}
            icon={<IoIosArrowBack />}
            fontSize={25}
            onClick={() => router.push("/home")}
          />
        </Box>
        <Box>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            // bg="blue.400"
            p={6}
            mx={{ sm: 24, md: 60, base: 80 }}
            mt={6}
          >
            <Stack m={2} direction={"row"} spacing={4} align={"center"}>
              <Avatar size={"md"} src={reviewers?.userImg} />
              <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                <Text
                  fontWeight={800}
                  textTransform="capitalize"
                  fontSize={"xl"}
                >
                  {reviewers?.title}
                </Text>
                <Text
                  fontWeight={400}
                  textTransform="capitalize"
                  fontSize={"sm"}
                >
                  {reviewers?.username}
                </Text>
              </Stack>
            </Stack>
            <Flex alignItems={"center"}>
              <a
                target="_blank"
                href={reviewers?.pdf}
                rel="noopener noreferrer"
              >
                <Button
                  variant={"primary-md"}
                  size={"sm"}
                  mr={4}
                  px={4}
                  display={{ base: "none", md: "flex" }}
                  fontWeight={600}
                  // onClick={() => router.push(reviewers?.pdf)}
                >
                  Download
                </Button>
              </a>
            </Flex>
          </Flex>
        </Box>
        </div>
        <div className="">
          <Box bg={"white"} borderRadius={"2xl"} width="full" p={12}>
            <Center>
              <Document
                file={{
                  url: reviewers?.pdf,
                }}
                loading={
                  <div>
                    <Center>
                      <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.300"
                        size="xl"
                      />
                    </Center>
                  </div>
                }
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(error) => console.log("Inside Error", error)}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1}/>
                ))}
              </Document>
            </Center>
          </Box>
        </div>
      </>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      providers,
      session,
    },
  };
}

export default ReviewerPage;
