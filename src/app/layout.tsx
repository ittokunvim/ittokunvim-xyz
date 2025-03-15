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
import { GoogleAdsCodeSnipet, GoogleAdsMetatag } from "@/components/googleAds";

const noto_sans_jp = Noto_Sans_JP({ subsets: ["latin"] });

const SITENAME    = process.env.NEXT_PUBLIC_SITENAME    || "";
const DESCRIPTION = process.env.NEXT_PUBLIC_DESCRIPTION || "";
const BASE_URL    = process.env.NEXT_PUBLIC_BASE_URL    || "";

export const metadata: Metadata = {
  title: {
    default: SITENAME,
    template: `%s | ${SITENAME}`,
  },
  description: DESCRIPTION,
  openGraph: {
    title: SITENAME,
    description: DESCRIPTION,
    url: BASE_URL,
    siteName: SITENAME,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITENAME,
    description: DESCRIPTION,
    site: "@ittokunvim",
    creator: "@ittokunvim",
  },
  verification: {
    google: "",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const github_url  = "https://github.com/ittokunvim";
  const twitter_url = "https://twitter.com/ittokunvim";
  const zenn_url    = "https://zenn.dev/ittoku_ky73";
  const itch_url    = "https://ittokunvim.itch.io";

  const externals  = [
    { name: "Source Code",  url: "https://github.com/ittokunvim/ittokunvim-xyz" },
    { name: "Next.js",      url: "https://nextjs.org/" },
    { name: "Vercel",       url: "https://vercel.com/" },
    { name: "Pixlr",        url: "https://pixlr.com/jp/" },
    { name: "Font Awesome", url: "https://fontawesome.com/" },
    { name: "Github",       url: "https://github.com" },
  ];

  return (
    <html lang="ja">
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
            {externals.map((external, id) => (
              <a href={external.url} key={id} target="_blank" rel="noopener noreferrer">
                {external.name}
              </a>
            ))}
          </div>
          <div className={styles.copyright}>
            <p>
              <FontAwesomeIcon icon={faCopyright} size="sm" style={{ marginRight: "0.5em" }} />
              ittokunvim All Rights Reserved.
            </p>
          </div>
        </footer>
      </body>
      <GoogleAdsCodeSnipet />
      <GoogleAdsMetatag />
    </html>
  );
}
