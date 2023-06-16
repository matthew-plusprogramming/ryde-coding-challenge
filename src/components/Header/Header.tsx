import classnames from 'classnames';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

// Style imports
import {
  header,
  logo,
  logoContainer,
  logoText,
  headerBlock
} from './Header.module.scss';
import Logo from '../../assets/ryde.png';

type HeaderProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>, HTMLDivElement
>

const Header: React.FC<HeaderProps> = ({
  className,
  ...props
}) => (
  <>
    <div className={classnames(headerBlock)} />
    <div className={classnames(header, className)} {...props}>
      <div className={logoContainer}>
        <img src={Logo} alt="Ryde Logo" className={classnames(logo)} />
        <span className={logoText}>Ryde</span>
      </div>
      {/* I thought to include dummy links, but I realized its far outside the
    scope of this project */}
    </div>
  </>
);

export { Header };
