import React, { ReactNode } from "react";
import { Button, Stack, useColorModeValue, } from "@chakra-ui/react";

const courses = ['All', 'STEM', 'ABM', 'HUMMS']

const NavLink = ({ children }: { children: ReactNode }) => (
  <Button
    rounded={'xl'}
    size={'md'}
    fontWeight={'medium'}
    p={"auto"}
    colorScheme={"#00B0FF"}
    color={"#00B0FF"}
    variant="outline"
    _hover={{ bg: "#A5E4FF" }}>
    {children}
  </Button>
)

function SubNav() {
  return (
    <Stack direction="row" spacing={4} align="center" padding={6} justify="center">
      {courses.map((course) => (
        <NavLink key={course}>{course}</NavLink>
      ))}
    </Stack>
  )
}

export default SubNav;
