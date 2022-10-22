import Document, { Html, Head, Main, NextScript, DocumentInitialProps } from 'next/document';

interface NgWebDocumentProps {
  config: {[key: string]: string};
}

class NgWebDocument extends Document<NgWebDocumentProps> {
  render() {
    return (
      <Html lang='en-gb'>
        <Head>
        </Head>
        <body className="ng-bg-background">
          <div id="page-modules">
            <Main />
            <NextScript />
          </div>
        </body>
      </Html>
    );
  }
}

NgWebDocument.getInitialProps = async (ctx): Promise<DocumentInitialProps & NgWebDocumentProps> => {
  const initialProps = await Document.getInitialProps(ctx);
  const config = {}

  return {...initialProps, config};
};

export default NgWebDocument;