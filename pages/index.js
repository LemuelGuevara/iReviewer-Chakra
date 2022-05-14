import Head from "next/head";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import {
  getProviders,
  getSession,
  GetSessionParams,
  useSession,
} from "next-auth/react";
import SignUp from "../components/modules/SignUp"
import ReviewerGrid from "../components/layout/ReviewerGrid";

function Home ({ providers }) {
  const { data: session } = useSession();

  if (!session) return <SignUp providers={providers} />;

  return (
    <div className={styles.container}>
      <Head>
      <title>iReviewer - Discover the Latest Reviewers</title>
        <meta name="description" content="Latest Reviewers" />
        <link rel="icon" href="/iReviewer-Logo-Small.svg" />
      </Head>
      <Layout/>
      <ReviewerGrid/>
    </div>
  );
};

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      providers,
      session,
    },
  };
}

export default Home;
