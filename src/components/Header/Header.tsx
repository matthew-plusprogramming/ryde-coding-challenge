import classname from 'classnames';
import React, { HTMLProps } from 'react';
import { header, logo, logoContainer, logoText } from './Header.module.scss';
import Logo from '../../assets/ryde.png';

type HeaderProps = HTMLProps<HTMLDivElement>

const Header: React.FC<HeaderProps> = ({
  className
}) => (
  <div className={classname(header, className)}>
    <div className={logoContainer}>
      <img src={Logo} alt="Ryde Logo" className={classname(logo)} />
      <span className={logoText}>Ryde</span>
    </div>
    {/* I thought to include dummy links, but I realized its far outside the
    scope of this project */}
  </div>
);

export { Header };
