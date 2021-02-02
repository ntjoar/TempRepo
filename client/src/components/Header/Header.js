import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
// import styled from 'styled-components';

import './styles.css'

// import { Pivot as Hamburger } from 'hamburger-react';

// const Ul = styled.ul`
//   list-style: none;
//   display: flex;
//   flex-flow: row nowrap;
//   @media (max-width: 980px) {
//     flex-flow: column nowrap;
//     background-color: rgba(255, 255, 255, 0.8);
//     position: fixed;
//     opacity: ${({ open }) => open ? '1' : '0'};
//     right: 0;
//     height: 100vh;
//     padding-top: 3.5rem;
//     width: 100%;
//     z-index: ${({ open }) => open ? '0' : '-1'};
//     transition: opacity 0.3s ease-in-out;
//   }
// `;

// const Li = styled.li`
//   text-align: center;
//   position: relative;
//   top: 0em;
//   left: 0%;
//   transform: ${({ open }) => open ? 'translateY(0)' : 'translateY(100%)'};
//   z-index: ${({ open }) => open ? '0' : '-1'};
//   transition: transform 0.5s ease-in-out;
// `;

const Header = (props) => {
  const [isOpen, setOpen] = useState(false)
  return(
    <header id="header" className="alt">
      <nav id="nav1">
        <ul>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/events">Events</Link></li>
        </ul> 
      </nav>
      <nav id="nav2">
        <ul>
          <li><Link to="/signin">Sign In</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header