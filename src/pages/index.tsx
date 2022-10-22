import type { NextPage } from 'next';

import Metadata from '@src/components/Metadata';
import Wrap from '@src/components/Wrap';
import Title from '@src/components/Title';

const Home: NextPage = () => {
  return (
    <>
      <Metadata />
      <Wrap>
        <Title className="ng-text-center">Hello World!</Title>
        <p className="ng-text-center ng-text-primary ng-mt-4 ng-mb-4">
          Something cool will be coming soon, I promise!
        </p>
      </Wrap>
    </>
  );
};

export default Home;
