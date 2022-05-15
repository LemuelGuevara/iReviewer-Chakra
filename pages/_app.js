import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { motion } from "framer-motion";
import theme from "../theme/theme";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  router,
}) {
  return (
    // `session` comes from `getServerSideProps` or `getInitialProps`.
    // Avoids flickering/session loading on first load.
    <SessionProvider session={session}>
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
          <Component {...pageProps} />
        </ChakraProvider>
      </motion.div>
    </SessionProvider>
  );
}
