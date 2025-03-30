"use client";

import Script from "next/script";

const GOOGLEADS_ID = process.env.NEXT_PUBLIC_GOOGLEADS_ID;

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
