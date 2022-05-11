import "../styles/globals.css";
import "focus-visible/dist/focus-visible";
import { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react'
import theme from "../theme/theme";
import { FirebaseAuth } from "react-firebaseui";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
