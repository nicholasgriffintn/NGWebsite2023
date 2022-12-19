import Link from 'next/link';

const LinkComponent = (props) => {
  const { href, children, className } = props;

  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink === true) {
    return (
      <Link href={href} className={className} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a className={className} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
};

const AdjustableLink = (props) => {
  const { href, children, className } = props;

  const defaultLinkClasses = `ng-text-primary ng-font-bold
  ng-transition ng-ease ng-transition-color ng-duration-350 motion-reduce:ng-transition-none
  group-active:ng-text-accent group-active:ng-underline
  group-focus:ng-text-accent group-focus:ng-underline
  group-hover:ng-text-accent group-hover:ng-underline`;

  return (
    <LinkComponent
      href={href}
      className={`sw-inline-flex sw-items-center sw-group ${className ?? ''}`}
    >
      <span className={defaultLinkClasses}>{children}</span>
    </LinkComponent>
  );
};

export default AdjustableLink;
