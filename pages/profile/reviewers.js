import {
  Heading,
  Text,
  Flex,
  Container,
  Stack,
  Avatar,
  Button,
  Link,
  HStack,
  Divider,
  SimpleGrid,
  styled,
} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import styles from "../../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../app/firebaseApp";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  where,
  doc
} from "@firebase/firestore";
import { useSession, getProviders, getSession } from "next-auth/react";
import ReviewerCard from "../../components/modules/ReviewerCard";
import LayoutProfile from "../../components/layouts/LayoutProfile";

export default function Reviewers() {
  const { data: session } = useSession();
  const [reviewers, setReviewers] = useState([]);

  const router = useRouter();
  const { id } = router.query;
  // const links = [`Reviewers ${reviewerCount}`, `Liked ${likeCount}`];
  const links = ["reviewers", "liked"]; 

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "reviewers"),
          where("id", "==", `${session?.user?.uid}`)
        ),
        (snapshot) => {
          setReviewers(snapshot.docs);
        }
      ),
    [session?.user?.uid]
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>{session?.user?.name}</title>
        <meta name="description" content="Latest Reviewers" />
        <link rel="icon" href="/iReviewer-Logo-Small.svg" />
      </Head>

      {/* Grid */}
      {session?.user?.uid === reviewers?.id ? (
        <div>
          <Text></Text>
        </div>
      ) : (
        <div>
          <SimpleGrid
             columns={{base: 1, sm: 1, md: 2, lg: 3, xl: 4}}
             spacingX={"24px"}
             spacingY={"24px"}
             p={[2, 12, 24, 12, 16]}
          >
            {reviewers.map((reviewer) => (
              <ReviewerCard
                key={reviewer.id}
                id={reviewer.id}
                reviewer={reviewer.data()}
              />
            ))}
          </SimpleGrid>
        </div>
      )}
    </div>
  );
}

Reviewers.Layout = LayoutProfile;
