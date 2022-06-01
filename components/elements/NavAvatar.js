import React from "react";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function NavAvatar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div>
      <Menu>
        <MenuButton
          as={Button}
          rounded={"full"}
          variant={"link"}
          cursor={"pointer"}
          minW={0}
        >
          <Avatar size={"sm"} src={session?.user?.image} />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => router.push("/profile")}>{session?.user?.name}</MenuItem>
          {/* <MenuItem>Settings</MenuItem> */}
          <MenuDivider />
          <MenuItem
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default NavAvatar;
