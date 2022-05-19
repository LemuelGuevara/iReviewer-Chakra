import React, { ReactNode } from "react";
import { Button, Stack, Link } from "@chakra-ui/react";
import NextLink from "next/link";

const courses = ["all", "stem", "abm", "humms"];

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
        <NextLink key={course} href={`/courses/${course}`}>
          <Button key={course}>{course}</Button>
        </NextLink>
      ))}
    </Stack>
  );
}

export default SubNav;
