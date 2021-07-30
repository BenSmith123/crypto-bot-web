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
  // AiOutlineLock,
  AiOutlineRight,
} from 'react-icons/ai';

import Topics from './views/Home';
import Account from './views/Account';
import Commands from './views/Commands';
import Changelog from './views/Changelog';

import { getChangelog, getCommands } from './api-interface';


const mobileScreenWidth = 918; // width in px that is mobile


export default function App() {

  const [isMobile, setIsMobile] = useState(window.innerWidth < mobileScreenWidth);
  const [menuOpen, setMenuOpen] = useState(false);

  const [apiChangelog, setApiChangelog] = useState(null);
  const [apiCommands, setApiCommands] = useState(null);

  useEffect(async () => {

    function handleResize() {
      if (window.innerWidth < mobileScreenWidth) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    handleResize(); // set isMobile on initial page load

    window.addEventListener('resize', handleResize);

    // stack promises and make all API calls asynchronously
    const apiPromiseArr = [
      getChangelog(),
      getCommands(),
    ];

    const [changelog, commands] = await Promise.all(apiPromiseArr);

    // load all API data upfront
    setApiChangelog(changelog);
    setApiCommands(commands);

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
            noTransition // why doesn't this work
            isOpen={!isMobile || menuOpen}
            disableOverlayClick={!isMobile}
            disableCloseOnEsc
            noOverlay
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
              <Link to="/account" className="navLink" onClick={() => navItemSelected()}>
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

            {/* <li>
              <Link to="/signin" className="navLink" onClick={() => navItemSelected()}>
                <AiOutlineLock className="icon" />
                <p>Sign in</p>
                <AiOutlineRight className="iconArrow" />
              </Link>
            </li> */}

          </Menu>

        </div>


        <div className="pageContent">

          <Switch>

            <Route path="/account">
              <Account />
            </Route>

            <Route path="/crypto-assistant">
              <Commands apiCommands={apiCommands} />
            </Route>

            <Route path="/changelog">
              <Changelog apiChangelog={apiChangelog} />
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

