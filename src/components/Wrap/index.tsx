import { ElementType, forwardRef, PropsWithChildren } from 'react';

interface Props {
  className?: string;
  as?: ElementType;
}

const Wrap = forwardRef(
  ({ children, className = '', as: Component = 'div' }: PropsWithChildren<Props>, ref) => {
    return (
      <Component
        className={`ng-mx-auto ng-max-w-[1008px] ng-px-2 s:ng-px-4 xxl:ng-max-w-[1280px] ${
          className ?? ''
        }`}
        ref={ref}
      >
        {children}
      </Component>
    );
  }
);

Wrap.displayName = 'Wrap';
export default Wrap;
