import React, { ReactNode } from "react";
import {
  Button,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";

const courses = ["all", "stem", "abm", "humms"];

const NavLink = ({ label }) => (
  <NextLink href={"/courses/" + label} passHref>
    {/* <Button
      rounded={"xl"}
      size={"md"}
      fontWeight={700}
      p={"auto"}
      colorScheme={"brand"}
      variant="ghost"
      _hover={{ bg: "#A5E4FF" }}
      _focus={{ bg: "#A5E4FF" }}
      _active={{ bg: "#A5E4FF" }}
      textTransform="uppercase"
    >
      <Text color={"gray.600"}>{children}</Text>
    </Button> */}
    <Text
      justifyItems={"center"}
      px={2}
      fontWeight={800}
      textTransform="uppercase"
    >
      {label}
    </Text>
  </NextLink>
);

function SubNav() {
  return (
    <Stack
      direction="row"
      spacing={2}
      align="center"
      padding={6}
      mt={24}
      justify="center"
    >
      {/* {courses.map((course) => (
        <NavLink key={course}>{course}</NavLink>
      ))} */}
      <Tabs variant={"soft-rounded"} colorScheme="brand" isLazy>
        <TabList>
          <Tab>
            <NavLink label={"all"} />
          </Tab>
          <Tab>
            <NavLink label={"stem"} />
          </Tab>
          <Tab>
            <NavLink label={"abm"} />
          </Tab>
          <Tab>
            <NavLink label={"humms"} />
          </Tab>
        </TabList>
      </Tabs>
    </Stack>
  );
}

export default SubNav;
