import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="application-name" content="Re:ceipt" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Re:ceipt" />
          <meta name="description" content="Image file name-formatting app" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          <link rel="apple-touch-icon" href="/assets/favicon/apple-touch-icon.png" />

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/assets/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/assets/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/assets/favicon/favicon.ico" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://re-ceipt.vercel.app" />
          <meta name="twitter:title" content="Re:ceipt" />
          <meta name="twitter:description" content="Image file name-formatting app" />
          <meta
            name="twitter:image"
            content="https://re-ceipt.vercel.app/assets/favicon/android-chrome-192x192.png"
          />
          <meta name="twitter:creator" content="@ysyoo11" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Re:ceipt" />
          <meta property="og:description" content="Image file name-formatting app" />
          <meta property="og:site_name" content="Re:ceipt" />
          <meta property="og:url" content="https://re-ceipt.vercel.app" />
          <meta
            property="og:image"
            content="https://re-ceipt.vercel.app/assets/favicon/apple-touch-icon.png"
          />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Poppins:wght@600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
