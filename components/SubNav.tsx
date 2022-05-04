import React from "react";
import { Button, Stack } from "@chakra-ui/react";

function SubNav() {
  return (
    <Stack direction="row" spacing={4} align="center" padding={6} justify="center">
      <Button color={"#00B0FF"} colorScheme="blue" variant="outline" borderRadius={12}>
        STEM
      </Button>
      <Button color={"#00B0FF"} colorScheme="blue" variant="outline" borderRadius={12}>
        ABM
      </Button>
      <Button color={"#00B0FF"} colorScheme="blue" variant="outline" borderRadius={12}>
        HUMMS
      </Button>
    </Stack>
  );
}

export default SubNav;
