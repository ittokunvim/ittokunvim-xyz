import Script from "next/script";

const GOOGLEADS_ID = "ca-pub-3545976238398683";

export function GoogleAdCodeSnipet() {
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

export function GoogleAdMetatag() {
  if (process.env.NODE_ENV === "production") {
    return (
      <meta name="google-adsense-account" content={GOOGLEADS_ID} />
    );
  }
}
