import classnames from 'classnames';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

// Style imports
import { verticalFlexContainer } from './VerticalFlexContainer.module.scss';

type VerticalFlexContainerProps =
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const VerticalFlexContainer: React.FC<VerticalFlexContainerProps> = ({
  className,
  children,
  ...props
}) => (
  <div className={classnames(verticalFlexContainer, className)} {...props}>
    {children}
  </div>
);

export { VerticalFlexContainer };
