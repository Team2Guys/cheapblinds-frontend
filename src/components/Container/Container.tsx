import { FC, ReactNode, RefObject } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  ref?: RefObject<HTMLDivElement | null>
}

const Container: FC<ContainerProps> = ({ children, className , ref }) => {
  return (
    <div
      className={` lg:max-w-[90%] 2xl:max-w-screen-2xl mx-auto px-2 ${className}`}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default Container;
