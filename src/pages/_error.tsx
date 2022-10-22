import type { NextPage } from 'next';

import Metadata from '@src/components/Metadata';
import Wrap from '@src/components/Wrap';
import Title from '@src/components/Title';
import ErrorBox from '@src/components/ErrorBox';

type Props = {
  statusCode: string;
};

const ErrorPage: NextPage<Props> = ({ statusCode = '500' }) => {
  return (
    <>
      <Metadata pageName="500" />
      <Wrap>
        <Title className="ng-text-center">Sorry, there was an error!</Title>
        <p className="ng-text-center ng-text-primary ng-mt-4 ng-mb-4">
          Please try heading back to the homepage.
        </p>
        <ErrorBox statusCode={statusCode} />
      </Wrap>
    </>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode.toString() : err ? err.statusCode.toString() : '404';
  return { statusCode };
};

export default ErrorPage;
