import "../styles/globals.css";
// // import "focus-visible/dist/focus-visible";
// import { AppProps } from "next/app";
// import { ChakraProvider } from "@chakra-ui/react";
// import theme from "../theme/theme";
// import { SessionProvider } from "next-auth/react";

// function App({ Component, pageProps: { session, ...pageProps} }: AppProps) {
//   return (
//     <SessionProvider session={session}>
//       <ChakraProvider theme={theme}>
//         <Component {...pageProps} />
//       </ChakraProvider>
//     </SessionProvider>
//   );
// }

// export default App;

import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
// import { RecoilRoot } from "recoil";
// import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/theme";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    // `session` comes from `getServerSideProps` or `getInitialProps`.
    // Avoids flickering/session loading on first load.
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        </ChakraProvider>
    </SessionProvider>
  );
}