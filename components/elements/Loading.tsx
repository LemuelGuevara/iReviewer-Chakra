import React from "react";
import { Skeleton } from "@chakra-ui/react";

function Loading() {
  return (
    <Skeleton>
      <div>contents wrapped</div>
    </Skeleton>
  );
}

export default Loading;
