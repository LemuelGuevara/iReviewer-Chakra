import Image from "next/image";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Grid,
  GridItem,
  SimpleGrid,
  Button,
  HStack,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import SubNav from "./SubNav";
import { Key } from "tabler-icons-react";

function ReviewerGrid() {
  const infos = [
    {
      id: 1,
      author: "Lemuel Guevara",
      title: "Capacitance",
      course: "Physics",
      yearLevel: "Grade12",
    },
    {
      id: 2,
      author: "Lemuel Guevara",
      title: "Nervous System",
      course: "Biology",
      yearLevel: "Grade11",
    },
    {
      id: 3,
      author: "Lemuel Guevara",
      title: "Conformity and Deviance",
      course: "UCSP",
      yearLevel: "Grade12",
    },
    {
      id: 4,
      author: "Lemuel Guevara",
      title: "Intermolecular Forces",
      course: "Chemistry",
      yearLevel: "Grade12",
    },
  ];

  return (
    <>
      <SimpleGrid
        minChildWidth={["400px", "250px"]}
        spacing={["12px"]}
        p={["10"]}
      >
        {infos.map((info) => (
          <Box key={info.id}>
            <VStack align={"center"} mt={0}>
              <Box
                // flexShrink={0}
                as="button"
                maxW={{ sm: 350, md: 290 }}
                maxH={"600px"}
                w={"full"}
                // bg={useColorModeValue("white", "gray.900")}
                boxShadow={"2xl"}
                rounded={"xl"}
                p={6}
                overflow={"hidden"}
              >
                <Box
                  h={"140px"}
                  bg={"gray.100"}
                  mt={-6}
                  mx={-6}
                  mb={4}
                  pos={"relative"}
                >
                  <Image src={"/HeroLogo.svg"} layout={"fill"} />
                </Box>
                <Text
                  color={"black"}
                  textTransform={"uppercase"}
                  fontWeight={800}
                  fontSize={"sm"}
                  letterSpacing={1.1}
                  align={"left"}
                >
                  {info.title}
                </Text>
                <Stack mt={"1"}>
                  <Text color={"gray.500"} align={"left"} fontSize={"xs"}>
                    {info.course}
                  </Text>
                </Stack>

                <Stack mt={2} direction={"row"} spacing={2} align={"center"}>
                  <Avatar size={"xs"} src={"/profile-pic.jpg"} />
                  <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                    <Text fontWeight={600}>{info.author}</Text>
                    {/* <Text color={'gray.500'}>Feb 08, 2021 · 6min read</Text> */}
                  </Stack>
                </Stack>
              </Box>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
}

export default ReviewerGrid;
