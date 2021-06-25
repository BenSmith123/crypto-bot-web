import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import { slide as Menu } from 'react-burger-menu';
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineSmile,
  AiOutlineMenuUnfold,
  AiOutlineInfoCircle,
  AiOutlineRight,
} from 'react-icons/ai';

import Topics from './views/Home';
import Account from './views/Account';
import Commands from './views/Commands';
import Changelog from './views/Changelog';

import { getChangelog } from './api-interface';


const mobileScreenWidth = 918; // width in px that is mobile


export default function App() {

  const [isMobile, setIsMobile] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const [changelog, setChangelog] = useState(null);


  useEffect(async () => {

    setChangelog(await getChangelog());

    function handleResize() {
      if (window.innerWidth < mobileScreenWidth) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    handleResize(); // set isMobile on initial page load

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // close the nav bar (mobile only) and scroll to top of page
  function navItemSelected() {
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  }


  return (
    <div className="pageWrapper">

      {/* show burger menu icon if mobile */}
      {/* {!isMobile || (
      <div>
        <div onClick={() => setMenuOpen(!menuOpen)} className="menu-item--small"></div>
      </div>
      )} */}


      <Router>

        <div className="sideNav">

          <div className="mobileHeader" />
          <Menu
            isOpen={!isMobile || menuOpen}
            disableOverlayClick={!isMobile}
            disableCloseOnEsc
            noOverlay
            // noTransition // why doesn't this work
            styles={{ display: isMobile ? 'none' : 'hidden' }}
            onStateChange={({ isOpen }) => {
              setMenuOpen(isOpen); // ensure state is changed every time the menu is open/closed
            }}
          >

            <>
              <div className="navSpacer" />
            </>

            <li>
              <Link to="/" className="navLink" onClick={() => navItemSelected()}>
                <AiOutlineHome className="icon" />
                <p>Home</p>
                <AiOutlineRight className="iconArrow" />
              </Link>
            </li>

            <li>
              <Link to="/about" className="navLink" onClick={() => navItemSelected()}>
                <AiOutlineUser className="icon" />
                <p>Account</p>
                <AiOutlineRight className="iconArrow" />
              </Link>
            </li>

            <li>
              <Link to="/crypto-assistant" className="navLink" onClick={() => navItemSelected()}>
                <AiOutlineSmile className="icon" />
                <p>Crypto assistant</p>
                <AiOutlineRight className="iconArrow" />
              </Link>
            </li>

            <li>
              <Link to="/changelog" className="navLink" onClick={() => navItemSelected()}>
                <AiOutlineMenuUnfold className="icon" />
                <p>Changelog</p>
                <AiOutlineRight className="iconArrow" />
              </Link>
            </li>

            <li>
              <Link to="/topics" className="navLink" onClick={() => navItemSelected()}>
                <AiOutlineInfoCircle className="icon" />
                <p>About</p>
                <AiOutlineRight className="iconArrow" />
              </Link>
            </li>

          </Menu>

        </div>


        <div className="pageContent">

          <Switch>

            <Route path="/about">
              <Account />
            </Route>

            <Route path="/crypto-assistant">
              <Commands />
            </Route>

            <Route path="/changelog">
              <Changelog changelog={changelog} />
            </Route>

            <Route path="/">

              <Topics />
            </Route>

          </Switch>
        </div>

      </Router>


    </div>
  );
}

