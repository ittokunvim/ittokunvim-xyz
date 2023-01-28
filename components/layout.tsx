import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import Font from "./font";
import styles from "./layout.module.css";

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
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
      </header>
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          <FontAwesomeIcon icon={faCopyright} />
          2023 ittoku-tech.com
        </p>
      </footer>
      <Font />
    </>
  );
}
