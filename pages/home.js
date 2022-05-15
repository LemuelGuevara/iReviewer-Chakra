import Head from "next/head";
import Layout from "../components/Layout";
import ReviewerGrid from "../components/layout/ReviewerGrid";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useSession, getProviders, getSession } from "next-auth/react";

export default function HomePage() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/");
    },
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>iReviewer - Discover the Latest Reviewers</title>
        <meta name="description" content="Latest Reviewers" />
        <link rel="icon" href="/iReviewer-Logo-Small.svg" />
      </Head>
      <Layout />
      <ReviewerGrid />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

