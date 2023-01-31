import Head from "next/head";
import Header from "./header";
import Footer from "./footer";
import Font from "./font";
import styles from "./layout.module.css";

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0" />
      </Head>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
      <Font />
    </>
  );
}
