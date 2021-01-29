import Head from "next/head";
import styles from "../styles/Home.module.css";
import packageJSON from "../package.json";

const REVALIDATE = 10;

export async function getStaticProps(context) {
  const domain = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";
  const url = `${domain}/api/random`;
  let fromAPI;

  try {
    fromAPI = await (await fetch(url)).json();
  } catch (err) {
    fromAPI = "<no initial data>";
    console.warn(`\nWarning: can't fetch initial data from ${url}`);
  }

  return {
    props: {
      getStaticPropsRandom: Math.random(),
      fromAPI,
    },
    revalidate: REVALIDATE,
  };
}

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>nextjs-cdb-test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p className={styles.description}>
          package.json version {packageJSON.version}
        </p>

        <p className={styles.description}>
          this ISR page revalidates after {REVALIDATE} seconds
        </p>

        <p className={styles.description}>props {JSON.stringify(props)}</p>

        <p className={styles.description}>clientSideRandom {Math.random()}</p>

        <p className={styles.description}>
          <a href="/api/random">/api/random</a>
        </p>
      </main>
    </div>
  );
}
