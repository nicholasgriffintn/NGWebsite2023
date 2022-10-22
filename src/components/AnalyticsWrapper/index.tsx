import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import { useEffect } from 'react';

import config from '@src/config';

const AnalyticsWrapper = ({ children }) => {
  // TODO: Need to add state management
  const cookiesAccepted = '1';

  const router = useRouter();

  useEffect(() => {
    if (cookiesAccepted === '1') {
      // eslint-disable-next-line camelcase
      posthog.init(config.posthogKey, { api_host: config.posthogHost });

      const handleRouteChange = () => posthog.capture('$pageview');
      router.events.on('routeChangeComplete', handleRouteChange);

      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, [router.events]);

  return <>{children}</>;
};

export default AnalyticsWrapper;
