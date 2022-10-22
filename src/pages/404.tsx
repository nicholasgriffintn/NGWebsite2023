import type { NextPage } from 'next';

import Metadata from '@src/components/Metadata';
import Wrap from '@src/components/Wrap';
import Title from '@src/components/Title';
import ErrorBox from '@src/components/ErrorBox';

type Props = {
  statusCode: string;
};

const ErrorPage: NextPage<Props> = ({ statusCode = '404' }) => {
  return (
    <>
      <Metadata pageName="404" />
      <Wrap>
        <Title className="ng-text-center">Sorry, that page could not be found!!</Title>
        <p className="ng-text-center ng-text-primary ng-mt-4 ng-mb-4">
          Please try heading back to the homepage.
        </p>
        <ErrorBox statusCode={statusCode} />
      </Wrap>
    </>
  );
};

export default ErrorPage;
