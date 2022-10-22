import AdjustableLink from '@src/components/AdjustableLink';
import ResponsiveImage from '@src/components/ResponsiveImage';
import Wrap from '@src/components/Wrap';

const Footer = () => {
  return (
    <footer className="footer-main-wrap">
      <div className="footer-topbar">
        <Wrap />
      </div>
      <div className="footer-mainbar">
        <Wrap>
          <nav className="footer-navbar">
            <div className="footer-navbar-logo">
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
            <div className="footer-navbar-copyright">
              <span>Copyright © {new Date().getFullYear()} Nicholas Griffin</span>
            </div>
            <div className="footer-navbar-links">
              <ul>
                <li>
                  <AdjustableLink href="https://github.com/nicholasgriffintn/NGWebsite2023">
                    Source Code
                  </AdjustableLink>
                </li>
              </ul>
            </div>
          </nav>
        </Wrap>
      </div>
    </footer>
  );
};

export default Footer;
