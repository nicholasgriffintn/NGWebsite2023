import type { NextPage } from 'next';
import Head from 'next/head';

import Metadata from '@src/components/Metadata';

const Home: NextPage = () => {
  return (
    <div>
      <Metadata />

      <main>
        <h1>Hello World</h1>
      </main>
    </div>
  );
};

export default Home;
