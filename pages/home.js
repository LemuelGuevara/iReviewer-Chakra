import Head from "next/head";
import ReviewerGrid from "../components/layout/ReviewerGrid";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useSession, getProviders, getSession } from "next-auth/react";
import NavBar from "../components/layout/NavBar";
import HeroBanner from "../components/elements/HeroBanner";
import SubNav from "../components/layout/SubNav";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/theme";
import LayoutHome from "../components/layouts/LayoutHome";

export default function HomePage() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/signin");
    },
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>iReviewer - Discover the Latest Reviewers</title>
        <meta name="description" content="Latest Reviewers" />
        <link rel="icon" href="/iReviewer-Logo-Small.svg" />
      </Head>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

// HomePage.getLayout = function PageLayout(page) {
//   return (
//     <>
//       <ChakraProvider theme={theme}>
//         <HeroBanner/>
//         <SubNav/>
//         <ReviewerGrid/>
//       </ChakraProvider>
//     </>
//   );
// };
HomePage.Layout = LayoutHome;