
import React from 'react';
import { NavLink } from 'react-router-dom';

import { AiOutlineRight } from 'react-icons/ai';

export default function NavItem(props) {

  const {
    title, link, icon, onClick,
  } = props;

  return (
    <li>
      <NavLink
        to={link}
        exact
        className="navLink"
        activeClassName="navLink-active"
        onClick={() => onClick()}
      >
        {icon}
        <p>{title}</p>
        <AiOutlineRight className="iconArrow" />
      </NavLink>
    </li>
  );
}
