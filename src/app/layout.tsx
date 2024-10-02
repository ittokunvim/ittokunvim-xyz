import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter, faItchIo } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";

import "./globals.css";
import "@/config/fontawesome";
import styles from "./layout.module.css";
import { GoogleAdCodeSnipet, GoogleAdMetatag } from "./googleads";

const noto_sans_jp = Noto_Sans_JP({ subsets: ["latin"] });

const sitename = "ittokunvimのポートフォリオサイト";
const description = "ittokunvim.xyzでは、ittokunvimが開発した様々な成果物を公開するサイトとなっています";
const url = "https://ittokunvim.xyz";

export const metadata: Metadata = {
  title: {
    default: sitename,
    template: `%s | ${sitename}`,
  },
  description,
  openGraph: {
    title: sitename,
    description,
    url,
    siteName: sitename,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: sitename,
    description,
    site: "@ittokunvim",
    creator: "@ittokunvim",
  },
  verification: {
    google: "",
  },
  alternates: {
    canonical: url,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const github_url = "https://github.com/ittokunvim";
  const twitter_url = "https://twitter.com/ittokunvim";
  const zenn_url = "https://zenn.dev/ittoku_ky73";
  const itch_url = "https://ittokunvim.itch.io";

  return (
    <html lang="ja">
      <GoogleAdCodeSnipet />
      <GoogleAdMetatag />
      <body className={noto_sans_jp.className}>
        <header className={styles.page_header}>
          <Link href="/">
            <Image src="/logo.svg" width={44} height={44} alt="site logo" />
          </Link>
          <div>
            <a href={github_url} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} size="2xl" style={{ color: "#202328" }} />
            </a>
            <a href={twitter_url} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} size="2xl" style={{ color: "#1DA1F2" }} />
            </a>
            <a href={zenn_url} target="_blank" rel="noopener noreferrer">
              <Image src="/zenn.svg" width={32} height={32} alt="zenn logo" />
            </a>
            <a href={itch_url} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faItchIo} size="2xl" style={{ color: "#FA5C5C" }} />
            </a>
          </div>
        </header>
        {children}
        <footer className={styles.page_footer}>
          <div className={styles.external}>
            <a href="https://github.com/ittokunvim/ittokunvim.xyz" target="_blank" rel="noopener noreferrer">
              Source Code
            </a>
            <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
              Next.js
            </a>
            <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer">
              Vercel
            </a>
            <a href="https://pixlr.com/jp/" target="_blank" rel="noopener noreferrer">
              Pixlr
            </a>
            <a href="https://fontawesome.com/" target="_blank" rel="noopener noreferrer">
              Font Awesome
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
              Github
            </a>
          </div>
          <div className={styles.copyright}>
            <p>
              <FontAwesomeIcon icon={faCopyright} size="sm" style={{ marginRight: "0.5em" }} />
              ittokunvim All Rights Reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
