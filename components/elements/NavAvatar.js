import React from "react";
import { Avatar } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";

function NavAvatar() {
  const { data: session } = useSession();

  return (
    <div>
      <Avatar size={"sm"} src={session?.user?.image} />
    </div>
  );
}

export default NavAvatar;
