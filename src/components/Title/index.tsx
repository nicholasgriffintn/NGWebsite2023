import { PropsWithChildren } from 'react';

export interface Props {
  className?: string;
}

const Title = ({ children, className = '' }: PropsWithChildren<Props>) => {
  const shouldRender = () => Boolean(children);

  if (shouldRender()) {
    return (
      <header className={`ng-mt-4 ${className ?? ''}`}>
        <>
          <h1 className="ng-text-primary ng-text-trafalgar m:ng-text-[32px] ng-font-bold ng-mr-3">
            {children}
          </h1>
        </>
      </header>
    );
  }
};

export default Title;
