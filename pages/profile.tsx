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

export default function NotFound() {
  return (
    <Center>
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h1"
          size="3xl"
          backgroundColor={'brand.300'}
          backgroundClip="text"
        >
          You should not be seeing this...
        </Heading>
        <Box m={12}>
          <Image
            alt={"Hero Image"}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={"100%"}
            src={"/page-place-holder.svg"}
          />
        </Box>
        <Link href={'/'}>
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
  );
}
