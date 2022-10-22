import { useState } from 'react';
import type { AppProps } from 'next/app';
import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import '@src/styles/globals.css';

import AnalyticsWrapper from '@src/components/AnalyticsWrapper';

type DefaultPageProps = {
  dehydratedState: DehydratedState;
};

function NgWebApp({ Component, pageProps }: AppProps<DefaultPageProps>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AnalyticsWrapper>
          <Component {...pageProps} />
        </AnalyticsWrapper>
      </Hydrate>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default NgWebApp;
