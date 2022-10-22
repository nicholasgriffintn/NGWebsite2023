import Document, { Html, Head, Main, NextScript, DocumentInitialProps } from 'next/document';

import Header from '@src/components/Header';
import Footer from '@src/components/Footer';

interface NgWebDocumentProps {
  config: { [key: string]: string };
}

class NgWebDocument extends Document<NgWebDocumentProps> {
  render() {
    return (
      <Html lang="en-gb">
        <Head />
        <link rel="preconnect" href="https://cognito-identity.eu-west-1.amazonaws.com"></link>
        <body className="ng-bg-background ng-min-h-screen">
          <Header />
          <main role="main" id="page-modules" className="ng-text-primary">
            {/* eslint-disable-next-line @next/next/no-sync-scripts */}
            <script src="/scripts/dm-flash.js" />
            <Main />
            <Footer />
            <NextScript />
            <div id="modal-root"></div>
          </main>
        </body>
      </Html>
    );
  }
}

NgWebDocument.getInitialProps = async (ctx): Promise<DocumentInitialProps & NgWebDocumentProps> => {
  const initialProps = await Document.getInitialProps(ctx);
  const config = {};

  return { ...initialProps, config };
};

export default NgWebDocument;
