import Head from 'next/head';
import { useRouter } from 'next/router';

import routes from './routes.json';

interface MetadataProps {
  title: string;
  description: string;
  imageUrl: string;
  metatags?: Record<string, string>;
}

const Metadata = ({ pageName = 'default' }: { pageName?: string }) => {
  const { title, description, imageUrl, metatags }: MetadataProps = routes.pages[pageName];

  const { asPath } = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" key="description" property="description" content={description} />
        <meta name="og:title" key="og:title" property="title" content={title} />
        <meta
          name="og:description"
          key="og:description"
          property="og:description"
          content={description}
        />
        <meta name="og:image" key="og:image" property="og:image" content={imageUrl} />
        <meta
          name="og:url"
          key="og:url"
          property="og:url"
          content={`https://nicholasgriffin.dev${asPath}`}
        />
        <meta property="og:site_name" name="og:site_name" content="Nicholas Griffin" />
        <meta property="og:type" name="og:type" content="website" />
        <meta name="application-name" content="Nicholas Griffin" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        {/* Microsoft */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/meta/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        {/* Apple */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Nicholas Griffin" />
        {/* Twitter */}
        <meta name="twitter:title" key="twitter:title" property="twitter:title" content={title} />
        <meta
          name="twitter:description"
          key="twitter:description"
          property="twitter:description"
          content={description}
        />
        <meta
          name="twitter:image"
          key="twitter:image"
          property="twitter:image"
          content={imageUrl}
        />
        <meta
          name="twitter:image:alt"
          key="twitter:image:alt"
          property="twitter:image:alt"
          content={title}
        />
        <meta name="twitter:site" key="twitter:site" content="@ngriffin_uk" />
        <meta name="twitter:creator" key="twitter:creator" content="@ngriffin_uk" />
        <meta name="twitter:card" key="twitter:card" property="twitter:card" content="summary" />
        {/* Icons */}
        <link rel="icon" type="image/png" sizes="16x16" href="/meta/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/meta/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/meta/favicon-96x96.png" />
        <link rel="apple-touch-icon" href="/meta/touch-icon-iphone.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/meta/touch-icon-ipad.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/meta/touch-icon-iphone-retina.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/meta/touch-icon-ipad-retina.png" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#000000" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {metatags &&
          Object.entries(metatags).map(([name, content]) => {
            return <meta key={name} name={name} property={name} content={content} />;
          })}
      </Head>
    </>
  );
};

export default Metadata;
