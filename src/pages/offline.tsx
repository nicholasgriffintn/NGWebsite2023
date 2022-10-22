import Metadata from '@src/components/Metadata';
import Wrap from '@src/components/Wrap';
import Title from '@src/components/Title';

const OfflinePage = () => (
  <>
    <Metadata />
    <Wrap>
      <div className="ng-prose ng-text-primary ng-mx-auto">
        <Title>You are offline right now</Title>
        <h2>If you saved this page then you&apos;d be able read it right now.</h2>
        <p>Sadly, you didn&apos;t do that. Maybe next time?</p>
        <div className="title-button-wrap">
          <a className="button button-prime-inverted" href="https://nicholasgriffin.dev">
            Go back home
          </a>
        </div>
      </div>
    </Wrap>
  </>
);

export default OfflinePage;
