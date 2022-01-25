import React from 'react';
import { NavLink } from 'react-router-dom';
import './button.scss';

const Button = ({ color, type, to, children }) => {
  const colorClass = color ? 'btn--' + color : '';
  const buttonClass = `btn ${colorClass}`;

  const btn = (tag) => {
    switch (tag) {
      case 'navlink':
        return (
          <NavLink to={to} className={buttonClass}>
            {children}
          </NavLink>
        );
      default:
        return (
          <div className={buttonClass}>
            {children}
          </div>
        );
    }
  };
  return btn(type);
};

export default Button;
