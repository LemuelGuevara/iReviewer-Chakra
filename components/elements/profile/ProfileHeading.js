import {
  Heading,
  Text,
  Flex,
  Container,
  Stack,
  Avatar,
  Divider,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";
import { onSnapshot, collection, query, where } from "@firebase/firestore";
import styles from "../../../styles/Home.module.css";
import { db } from "../../../app/firebaseApp";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NextLink from "next/link";

// const links = ["reviewers", "liked", "rewards"];

const NavLink = ({ label }) => {
  return (
    <Flex alignItems={"center"}>
      <NextLink href={"/profile/" + label} passHref>
        <Text
          justifyItems={"center"}
          px={2}
          py={1}
          fontWeight={800}
          rounded={"md"}
          textTransform="capitalize"
        >
          {label}
        </Text>
      </NextLink>
    </Flex>
  );
};

export default function LayoutProfile({ children }) {
  const { data: session } = useSession();
  const [reviewers, setReviewers] = useState([]);

  const reviewerCount = reviewers.length;
  const [likes, setLikes] = useState([]);


  const router = useRouter();
  const { id } = router.query;

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

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "reviewers"),
          where("liked", "==", `${session?.user?.uid}`)
        ),
        (snapshot) => {
          setLikes(snapshot.docs);
        }
      ),
    [session?.user?.uid]
  );

  return (
    <div className={styles.container}>
      {/* Header Container */}
      <Container maxW={"7xl"} bg={"white"}>
        <Flex alignItems={"center"} justify={"center"} mt={14}>
          <Heading textTransform={"full-width"}>
            <Stack
              m={2}
              direction={"row"}
              spacing={4}
              align={"center"}
              justify="center"
              p={2}
            >
              <Avatar size={"xl"} src={session?.user?.image} />
              <Stack
                direction={"column"}
                spacing={3}
                fontSize={"2xl"}
                justify="left"
              >
                <Text>{session?.user?.name}</Text>
              </Stack>
            </Stack>
          </Heading>
        </Flex>
        {/* Sub Nav */}
        <Flex alignItems={"center"} justify={"center"} mt={12}>
          {/* {links.map((link) => (
            <ButtonGroup key={link}>
              <NavLink key={link}>{link}</NavLink>
            </ButtonGroup>
          ))} */}
          <Stack direction={"row"} alignItems={"center"} spacing={5}>
            <Flex alignItems={"center"}>
              <Tabs variant={"soft-rounded"} colorScheme="brand" isLazy>
                <TabList>
                  <Tab>
                    <NavLink label={"reviewers"}/>
                    <Text color={"gray.400"} fontWeight={700}>
                      {reviewerCount}
                    </Text>
                  </Tab>
                  <Tab>
                    <NavLink label={"liked"} />
                    <Text color={"gray.400"} fontWeight={700}>
                      {likes.length}
                    </Text>
                  </Tab>
                </TabList>
              </Tabs>
            </Flex>
          </Stack>
        </Flex>
      </Container>
      <Flex px={16}>
        <Divider mt={6} />
      </Flex>
      {children}
    </div>
  );
}
