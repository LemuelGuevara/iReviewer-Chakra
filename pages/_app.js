import styles from "../styles/Home.module.css";
import { ChakraProvider, StylesProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { motion } from "framer-motion";
import theme from "../theme/theme";
import Layout from "../components/Layout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  router,
}) {
  const getLayout = Component.getLayout || ((page) => page);
  <SessionProvider session={session}>
    return getLayout(
    <motion.div
      key={router.router}
      initial="pageInitial"
      animate="pageAnimate"
      variants={{
        pageInitial: {
          opacity: 0,
        },
        pageAnimate: {
          opacity: 1,
        },
      }}
    >
      <ChakraProvider theme={theme}>
        <Layout />
        <Component {...pageProps} />
      </ChakraProvider>
    </motion.div>
    )
  </SessionProvider>;
}
