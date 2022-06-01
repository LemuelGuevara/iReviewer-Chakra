import { ReactNode } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Logo } from "../../public/_logo";
import NextLink from "next/link";
import { signOut, useSession } from "next-auth/react";
import UploadModal from "../modules/UploadModal";
import NavAvatar from "../elements/NavAvatar";
import styles from "../../styles/Home.module.css";

const Links = ["home", "profile", "courses"];

const NavLink = ({ children }: { children: ReactNode }) => (
  <NextLink href={"/" + children} passHref>
    <Link
      justifyItems={"right"}
      px={4}
      py={1}
      fontWeight={600}
      rounded={"md"}
      textTransform="capitalize"
      _focus={{ bg: "#A5E4FF" }}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {children}
    </Link>
  </NextLink>
);

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();

  return (
    <>
      <div className={styles.container}>
        <Box bg={"white"} px={4} borderRadius={"xl"}>
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={"center"}>
              <Box>
                <Logo />
              </Box>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={"center"}>
              <HStack as={"nav"} p={4} display={{ base: "none", md: "flex" }}>
                <UploadModal />
              </HStack>
              <NavAvatar />
            </Flex>
          </Flex>
          {isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4}>
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
                <UploadModal />
              </Stack>
            </Box>
          ) : null}
        </Box>
      </div>
      <Divider orientation="horizontal"/>
    </>
  );
}
