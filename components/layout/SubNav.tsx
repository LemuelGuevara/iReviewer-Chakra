import React, { ReactNode } from "react";
import { Button, Stack, Link } from "@chakra-ui/react";
import NextLink from "next/link";

const courses = ["all", "stem", "abm", "humms"];

const NavLink = ({ children }: { children: ReactNode }) => (
  <NextLink href={"/courses/" + children} passHref>
    <Button
      rounded={"xl"}
      size={"md"}
      fontWeight={"medium"}
      p={"auto"}
      colorScheme={"#00B0FF"}
      color={"#00B0FF"}
      variant="outline"
      _hover={{ bg: "#A5E4FF" }}
      textTransform="uppercase"
    >
      {children}
    </Button>
  </NextLink>
);

function SubNav() {
  return (
    <Stack
      direction="row"
      spacing={4}
      align="center"
      padding={6}
      justify="center"
    >
      {courses.map((course) => (
        <NavLink key={course}>{course}</NavLink>
      ))}
    </Stack>
  );
}

export default SubNav;
