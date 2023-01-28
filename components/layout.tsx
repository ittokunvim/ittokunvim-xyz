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
      <main>
        {children}
      </main>
      <Font />
    </>
  );
}
