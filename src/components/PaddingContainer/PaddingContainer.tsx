import classnames from 'classnames';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

// Style imports
import styles from './PaddingContainer.module.scss';

enum PaddingSize {
  SMALL = 'Small',
  MEDIUM = 'Medium',
  LARGE = 'Large',
  XLARGE = 'XLarge'
}

interface PaddingContainerProps extends
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    paddingSize?: {
      horizontal?: PaddingSize,
      vertical?: PaddingSize
    }
  }

const PaddingContainer: React.FC<PaddingContainerProps> = ({
  paddingSize: {
    horizontal = PaddingSize.MEDIUM,
    vertical = PaddingSize.MEDIUM
  } = {},
  className,
  children,
  ...props
}) => (
  <div className={classnames(
    styles[ `horizontal${horizontal}` ],
    styles[ `vertical${vertical}` ],
    className
  )} {...props}>
    {children}
  </div>
);

export { PaddingContainer, PaddingSize };
