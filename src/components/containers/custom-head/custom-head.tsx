import React from "react";
import Head from "next/head";

interface Props {
  useTitle?: boolean;
  useViewport?: boolean;
}

export function CustomHead({ useTitle, useViewport }: Props) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicons/site.webmanifest" />
      <link rel="shortcut icon" href="/favicons/favicon.ico" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="manifest" href="/manifest.json" />
      {useViewport && (
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      )}
      <meta name="description" content="Upsquare web app" />

      {useTitle && <title>Eguth</title>}
    </Head>
  );
}
