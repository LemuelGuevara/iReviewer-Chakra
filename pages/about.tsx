import {
  Box,
  Heading,
  Text,
  Button,
  Image,
  Flex,
  Center,
} from "@chakra-ui/react";
import { Container } from "tabler-icons-react";
import Link from "next/link";
import Head from "next/head";

export default function NotFound() {
  return (
    <>
    <Head>
      <title>Home Sweet Page</title>
        <meta name="description" content="Latest Reviewers" />
        <link rel="icon" href="/iReviewer-Logo-Small.svg" />
      </Head>
    <Center>
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h1"
          size="3xl"
          backgroundColor={'brand.300'}
          backgroundClip="text"
        >
          Moonlight.
        </Heading>
        <Box m={12}>
          <Image
            alt={"Hero Image"}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={"100%"}
            src={"/page-about.svg"}
          />
        </Box>
        <Link href={'/home'}>
          <Button
            colorScheme={"brand"}
            bgColor={'brand.400'}
            // bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
            color="white"
            variant="solid"
          >
            Go to Home
          </Button>
        </Link>
      </Box>
    </Center>
    </>
  );
}
