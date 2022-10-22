import AdjustableLink from '@src/components/AdjustableLink';
import ResponsiveImage from '@src/components/ResponsiveImage';
import Wrap from '@src/components/Wrap';

const Header = () => {
  return (
    <header className="header-main-wrap">
      <div className="header-topbar">
        <Wrap />
      </div>
      <div className="header-mainbar">
        <Wrap>
          <nav className="header-navbar">
            <div className="header-navbar-logo">
              <AdjustableLink href="/">
                <ResponsiveImage
                  src="/images/avatar.png"
                  alt="Nicholas Griffin"
                  width="32"
                  height="32"
                  priority={true}
                />
              </AdjustableLink>
            </div>
            <div className="header-navbar-links">
              <ul>
                <li>
                  <AdjustableLink href="/projects">Projects</AdjustableLink>
                </li>
                <li>
                  <AdjustableLink href="/blog">Blog</AdjustableLink>
                </li>
                <li>
                  <AdjustableLink href="/contact">Contact</AdjustableLink>
                </li>
              </ul>
            </div>
          </nav>
        </Wrap>
      </div>
    </header>
  );
};

export default Header;
