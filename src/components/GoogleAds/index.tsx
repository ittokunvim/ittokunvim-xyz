"use client";

import Script from "next/script";

import styles from "./styles.module.css";

const GOOGLEADS_ID = process.env.NEXT_PUBLIC_GOOGLEADS_ID;
const adsSlotList: Record<string, string> = {
  header: "7851950141",
  footer: "5985539983",
};

declare global {
  let adsbygoogle: unknown[];
}

export function GoogleAdsCodeSnipet() {
  if (process.env.NODE_ENV === "production") {
    return (
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GOOGLEADS_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    );
  }
}

export function GoogleAdsMetatag() {
  if (process.env.NODE_ENV === "production") {
    return (
      <meta name="google-adsense-account" content={GOOGLEADS_ID} />
    );
  }
}

export function GoogleAds({ slot }: { slot: string }) {
  if (!(slot in adsSlotList)) {
    console.error(`not found slot: ${slot} for adsSlotList.`);
    return;
  }

  if (process.env.NODE_ENV === "production") {
    return (
      <div className={styles.ads}>
        <ins
          className={styles.adsbygoogle}
          data-ad-client={GOOGLEADS_ID}
          data-ad-slot={adsSlotList[slot]}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        <Script
          strategy="lazyOnload"
          onReady={() => {
            (adsbygoogle = window.adsbygoogle || []).push({});
          }}
        />
      </div>
    );
  }
}
