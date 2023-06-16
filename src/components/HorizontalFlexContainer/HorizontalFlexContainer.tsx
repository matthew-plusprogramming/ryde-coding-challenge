import classnames from 'classnames';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

// Style imports
import { horizontalFlexContainer } from './HorizontalFlexContainer.module.scss';

type HorizontalFlexContainerProps =
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const HorizontalFlexContainer: React.FC<HorizontalFlexContainerProps> = ({
  className,
  children,
  ...props
}) => (
  <div className={classnames(horizontalFlexContainer, className)} {...props}>
    {children}
  </div>
);

export { HorizontalFlexContainer };
