import Metadata from '@src/components/Metadata';
import Wrap from '@src/components/Wrap';
import Title from '@src/components/Title';

const TechNuttyPage = () => (
  <>
    <Metadata />
    <Wrap>
      <Title>Hey! I see that you have come for my old site TechNutty.</Title>
      <p>
        Sorry to say but I decided that I would stop my management of that site back in 2018, I am
        now focusing on web development and other interesting projects.
      </p>
      <div className="title-button-wrap">
        <a className="button button-prime-inverted" href="https://nicholasgriffin.dev">
          Find out more
        </a>
      </div>
    </Wrap>
  </>
);

export default TechNuttyPage;
