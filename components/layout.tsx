import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import SearchForm from "./searchForm";
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
      <header className={styles.header}>
        <Link href={"/"}>
          <Image
            priority
            src="/blog.svg"
            width={64}
            height={64}
            alt="Site Logo"
          />
        </Link>
        <SearchForm />
      </header>
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
      <Font />
    </>
  );
}
