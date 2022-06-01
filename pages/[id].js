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
  Button,
} from "@chakra-ui/react";
import { doc } from "@firebase/firestore";
import ReviewerFunctions from "../components/modules/ReviewerFunctions";
import LayoutReviewer from "../components/layouts/LayoutReviewer";

function ReviewerPage({ providers }) {
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
    <div className={styles.container}>
      <Head>
        <title>
          {reviewers?.title} by {reviewers?.username}
        </title>
        <meta name="description" content="iReviewer" />
        <link rel="icon" href="/iReviewer-Logo-Small.svg" />
      </Head>

      {/* Header 

      {/* Main Container */}

      <div>
        <Container maxW={"full"} maxH={"full"} mt={2}>
          <Flex
            justifyContent={"space-between"}
            alignItems="center"
            mx={4}
            mt={2}
            // h="60px"
            // width={"auto"}
          >
            <CloseButton
              fontSize="md"
              mt={2}
              color={"gray"}
              onClick={() => router.back( )}
            />
            <Flex display={{ base: "flex", md: "none" }}>
              <ReviewerFunctions />
            </Flex>
          </Flex>

          <Stack direction={"column"}>
            <Box>
              <Flex
                alignItems={"center"}
                justifyContent={"space-around"}
                //
                p={4}
                mx={{ sm: 2, md: 24, lg: 40 }}
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
                  <ReviewerFunctions title={reviewers?.title} />
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

ReviewerPage.Layout = LayoutReviewer;
