import React from "react";
import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useSession, getProviders, getSession } from "next-auth/react";
import { onSnapshot } from "firebase/firestore";
import { db } from "../app/firebaseApp";
import PdfViewer from "../components/modules/PdfViewer";
import {
  Box,
  Text,
  Flex,
  Stack,
  Avatar,
  Center,
  Container,
  CloseButton,
} from "@chakra-ui/react";
import { addDoc, collection, doc } from "@firebase/firestore";
import DeleteDownload from "../components/modules/DeleteDownload";
import NavBar from "../components/layout/NavBar";
import SubNav from "../components/layout/SubNav";

function ReviewerPage({ providers }) {
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
    <div className={styles.reviewer}>
      <Head>
        <title>
          {reviewers?.title} by {reviewers?.username}
        </title>
        <meta name="description" content="iReviewer" />
        <link rel="icon" href="/iReviewer-Logo-Small.svg" />
      </Head>

      {/* Header */}

      <div className={styles.header}>
        <Flex
          justifyContent={"space-between"}
          alignItems="center"
          mx={4}
          mt={2}
          h="60px"
          width={"auto"}
        >
          <CloseButton
            fontSize="md"
            mt={2}
            color={"gray"}
            onClick={() => router.push("/")}
          />
          <Flex display={{ base: "flex", md: "none" }}>
            <DeleteDownload />
          </Flex>
        </Flex>
      </div>

      {/* Main Container */}

      <div>
        <Container maxW={"full"} maxH={"full"} mt={2} borderTopRadius={"xl"}>
          <Stack direction={"column"}>
            <Box>
              <Flex
                alignItems={"center"}
                justifyContent={"space-around"}
                // bg="blue.400"
                p={4}
                mx={{ sm: 2, md: 24, lg: 40 }}
                mt={6}
                mb={6}
              >
                <Stack m={2} direction={"row"} spacing={4} align={"center"}>
                  <Avatar size={"md"} src={reviewers?.userImg} />
                  <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                    <Text
                      fontWeight={700}
                      textTransform="capitalize"
                      fontSize={"lg"}
                      noOfLines={1}
                    >
                      {reviewers?.title}
                    </Text>
                    <Text
                      fontWeight={400}
                      textTransform="capitalize"
                      fontSize={"sm"}
                      noOfLines={1}
                    >
                      {reviewers?.username}
                    </Text>
                  </Stack>
                </Stack>

                {/* Download/delete */}
                <Flex display={{ base: "none", md: "flex" }}>
                  <DeleteDownload title={reviewers?.title}/>
                </Flex>
              </Flex>
            </Box>

            {/* PdfViewer */}

            <Center>
              <div className="all-page-container">
                <PdfViewer pdf={reviewers?.pdf} />
              </div>
            </Center>
          </Stack>
        </Container>
      </div>
    </div>
  );
}

ReviewerPage.getLayout = function getLayout(page) {
  return (
    <>
      {page}
    </>
  )
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
