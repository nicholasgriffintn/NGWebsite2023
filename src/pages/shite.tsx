import Metadata from '@src/components/Metadata';
import Wrap from '@src/components/Wrap';
import Title from '@src/components/Title';

const ShitePage = () => (
  <>
    <Metadata />
    <Wrap>
      <div className="ng-prose ng-text-primary ng-mx-auto">
        <Title>
          <span className="emoji">💩</span>I don&apos;t really know what to do with this domain...
        </Title>
        <div className="title-button-wrap">
          <a className="button button-prime-inverted" href="https://nicholasgriffin.dev">
            Check out my homepage instead?
          </a>
        </div>
      </div>
    </Wrap>
  </>
);

export default ShitePage;
